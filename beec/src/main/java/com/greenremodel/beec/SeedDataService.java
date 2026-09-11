package com.greenremodel.beec;

import tools.jackson.databind.json.JsonMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SeedDataService {

    private final JsonMapper jsonMapper;
    private SeedData seedData;

    // 건물 자신의 주소에서 뽑은 동+번지 키 -> 그 키를 가진 건물들 (동일 지번 여러 동/호 대응)
    // 시작 시 한 번만 만들어두면 매 요청마다 전체 건물을 훑을 필요가 없고,
    // "완전히 같은 키"끼리만 비교하니 문자열 부분포함으로 인한 오매칭도 사라진다.
    private Map<String, List<BuildingRecord>> buildingsByDongJibunKey;

    public SeedDataService(JsonMapper jsonMapper) {
        this.jsonMapper = jsonMapper;
    }

    @PostConstruct
    public void loadSeedData() throws Exception {
        try (InputStream is = new ClassPathResource("seed.json").getInputStream()) {
            seedData = jsonMapper.readValue(is, SeedData.class);
        }

        buildingsByDongJibunKey = new HashMap<>();
        for (BuildingRecord b : seedData.getBuildings()) {
            String key = AddressUtil.extractDongJibunKey(b.getAddress());
            if (key != null) {
                buildingsByDongJibunKey.computeIfAbsent(key, k -> new ArrayList<>()).add(b);
            }
        }

        long matchableCount = buildingsByDongJibunKey.values().stream().mapToLong(List::size).sum();
        System.out.println("seed.json 로드 완료. 지역그룹 수: " + seedData.getGroups().size()
                + " / 구단위그룹 수: " + seedData.getDistrictGroups().size()
                + " / 건물 수: " + seedData.getBuildings().size()
                + " / 주소매칭 인덱싱된 건물 수: " + matchableCount
                + " / 동일키 그룹 수: " + buildingsByDongJibunKey.size());
    }

    private String normalizePurpose(String purpose) {
        if ("비주거용".equals(purpose)) return "주거용 이외";
        return purpose;
    }

    /**
     * 비교군 조회.
     *
     * 정확히 맞는 조합이 없으면 조용히 넓힙니다.
     *   {용도}|{시도}|{규모}  →  같은 용도·지역에서 표본이 가장 많은 규모  →  같은 용도 전체
     *
     * 조합이 170개인데 실제 그룹은 150개라 빈 칸이 있습니다.
     * 데모 중에 "데이터 없음" 이 뜨는 것을 막는 것이 목적입니다.
     */
    public GroupInfo findGroup(String purpose, String region, String sizeBucket) {
        String p = normalizePurpose(purpose);
        Map<String, GroupInfo> gs = seedData.getGroups();

        GroupInfo exact = gs.get(p + "|" + region + "|" + sizeBucket);
        if (exact != null) return exact;

        GroupInfo best = null;
        for (Map.Entry<String, GroupInfo> e : gs.entrySet()) {
            if (!e.getKey().startsWith(p + "|" + region + "|")) continue;
            if (best == null || e.getValue().getCount() > best.getCount()) best = e.getValue();
        }
        if (best != null) return best;

        for (Map.Entry<String, GroupInfo> e : gs.entrySet()) {
            if (!e.getKey().startsWith(p + "|")) continue;
            if (best == null || e.getValue().getCount() > best.getCount()) best = e.getValue();
        }
        return best;
    }

    /** 실제로 매칭된 그룹의 키. 화면에 "무엇을 기준으로 계산했는지" 를 띄우는 데 씁니다. */
    public String findGroupKey(String purpose, String region, String sizeBucket) {
        GroupInfo hit = findGroup(purpose, region, sizeBucket);
        if (hit == null) return null;
        for (Map.Entry<String, GroupInfo> e : seedData.getGroups().entrySet()) {
            if (e.getValue() == hit) return e.getKey();
        }
        return null;
    }

    public DistrictInfo findDistrictGroup(String district) {
        return seedData.getDistrictGroups().get(district);
    }

    /**
     * 주소 기반 실측 매칭.
     * 1) 검색 주소에서 동+번지 키를 뽑아 "완전히 같은 키"를 가진 건물들만 후보로 삼는다
     *    (부분포함 검사가 아니라 정확히 같은 키 비교라서, "345-2"가 "345-24"에 잘못 걸리는 일이 없다).
     * 2) 후보가 여러 개(같은 지번에 동/호수가 여러 개인 단지 등)면 buildingName으로 먼저 좁힌다.
     * 3) 그래도 여러 개면 확정된 본인증을 우선한다. 그것도 없으면 첫 번째 후보.
     * 4) 동+번지 키 자체를 못 뽑았거나 매칭되는 후보가 없으면, 건물명 부분일치로 약하게 시도한다.
     */
    public BuildingRecord findBuildingByAddress(String jibunAddress, String roadAddress, String buildingName) {
        String key = AddressUtil.extractDongJibunKey(jibunAddress);
        if (key == null) {
            key = AddressUtil.extractDongJibunKey(roadAddress);
        }

        List<BuildingRecord> candidates = key != null
                ? buildingsByDongJibunKey.getOrDefault(key, List.of())
                : List.of();

        if (!candidates.isEmpty()) {
            if (buildingName != null && !buildingName.isBlank()) {
                String normName = AddressUtil.normalize(buildingName);
                List<BuildingRecord> nameFiltered = candidates.stream()
                        // 카카오 건물명이 seed 이름보다 길 수도 있어서("OO센터 본관" vs "OO센터") 양방향으로 본다.
                        .filter(b -> {
                            if (b.getName() == null) return false;
                            String n = AddressUtil.normalize(b.getName());
                            return !n.isEmpty() && (n.contains(normName) || normName.contains(n));
                        })
                        .collect(Collectors.toList());
                if (!nameFiltered.isEmpty()) {
                    candidates = nameFiltered;
                }
            }
            return candidates.stream()
                    .filter(b -> "본인증".equals(b.getCertKind()))
                    .findFirst()
                    .orElse(candidates.get(0));
        }

        // 동+번지로 전혀 못 찾았을 때만 건물명 부분일치로 약하게 시도
        if (buildingName != null && !buildingName.isBlank()) {
            String normName = AddressUtil.normalize(buildingName);
            for (BuildingRecord b : seedData.getBuildings()) {
                if (b.getName() != null && AddressUtil.normalize(b.getName()).contains(normName)) {
                    return b;
                }
            }
        }
        return null;
    }
}