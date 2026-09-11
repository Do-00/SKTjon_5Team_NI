package com.greenremodel.beec;

import tools.jackson.databind.json.JsonMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
public class SeedDataService {

    private final JsonMapper jsonMapper;
    private SeedData seedData;

    public SeedDataService(JsonMapper jsonMapper) {
        this.jsonMapper = jsonMapper;
    }

    @PostConstruct
    public void loadSeedData() throws Exception {
        try (InputStream is = new ClassPathResource("seed.json").getInputStream()) {
            seedData = jsonMapper.readValue(is, SeedData.class);
        }
        System.out.println("seed.json 로드 완료. 지역그룹 수: " + seedData.getGroups().size()
                + " / 구단위그룹 수: " + seedData.getDistrictGroups().size()
                + " / 건물 수: " + seedData.getBuildings().size());
    }

    private String normalizePurpose(String purpose) {
        if ("비주거용".equals(purpose)) return "주거용 이외";
        return purpose;
    }

    public GroupInfo findGroup(String purpose, String region, String sizeBucket) {
        String key = normalizePurpose(purpose) + "|" + region + "|" + sizeBucket;
        return seedData.getGroups().get(key);
    }

    public DistrictInfo findDistrictGroup(String district) {
        return seedData.getDistrictGroups().get(district);
    }

    /**
     * 주소 기반 실측 매칭. 동+번지가 정확히 겹치면 그걸 우선 반환.
     * 같은 동+번지에 예비인증/본인증이 둘 다 있으면 확정된 본인증을 우선한다.
     * 동+번지 매칭이 전혀 없으면 건물명 부분일치로 약하게라도 시도한다.
     */
    public BuildingRecord findBuildingByAddress(String jibunAddress, String roadAddress, String buildingName) {
        String key = AddressUtil.extractDongJibunKey(jibunAddress);
        if (key == null) {
            key = AddressUtil.extractDongJibunKey(roadAddress);
        }

        BuildingRecord bestMatch = null;
        BuildingRecord weakCandidate = null;

        for (BuildingRecord b : seedData.getBuildings()) {
            boolean addressMatch = key != null && AddressUtil.normalize(b.getAddress()).contains(key);
            if (addressMatch) {
                if (bestMatch == null || "본인증".equals(b.getCertKind())) {
                    bestMatch = b;
                }
            } else if (buildingName != null && !buildingName.isBlank()
                    && b.getName() != null
                    && AddressUtil.normalize(b.getName()).contains(AddressUtil.normalize(buildingName))
                    && weakCandidate == null) {
                weakCandidate = b;
            }
        }
        return bestMatch != null ? bestMatch : weakCandidate;
    }
}