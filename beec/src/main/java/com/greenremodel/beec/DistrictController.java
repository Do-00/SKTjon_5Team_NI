package com.greenremodel.beec;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * ④ 동네 비교 지도용 목록 엔드포인트.
 *
 * 기존 /api/district 는 한 번에 한 동네만 돌려줍니다.
 * 지도는 250여 개를 한 화면에 칠해야 하므로 250번 호출하면 안 됩니다. 한 번에 다 주는 것이 이 파일의 목적입니다.
 *
 * 표본이 적은 동네를 목록에서 빼지 않습니다. grade 를 null 로 두고 insufficient=true 를 붙여 보냅니다.
 * 전국 지도에서 수도권은 촘촘하고 지방은 비어 있는 그림 자체가 이 서비스의 논점이기 때문입니다.
 * 화면에서는 회색으로 칠하고 "인증 사례 부족" 이라고 적으면 됩니다.
 *
 * district 필드는 시도 접두사를 뗀 순수 시군구명입니다. 좌표 파일과 이 값으로 조인하면 됩니다.
 */
@RestController
@CrossOrigin(origins = "*")
public class DistrictController {

    private final SeedDataService seedDataService;

    public DistrictController(SeedDataService seedDataService) {
        this.seedDataService = seedDataService;
    }

    /**
     * /api/districts?region=서울&purpose=주거용
     *
     * region 생략 → 전국.
     * purpose 생략 → 주거용. 서비스가 "우리집 성적표" 이므로 주거용이 기본입니다.
     *                "전체" 를 넘기면 용도를 섞은 값을 돌려줍니다.
     * minSample 미만이면 목록에는 남되 등급이 null 로 나갑니다.
     */
    @GetMapping("/api/districts")
    public Map<String, Object> districts(
            @RequestParam(required = false) String region,
            @RequestParam(required = false, defaultValue = "주거용") String purpose,
            @RequestParam(required = false, defaultValue = "5") int minSample) {

        // 지도에 찍을 동네의 전체 목록은 용도를 섞은 쪽에서 가져옵니다.
        // 주거용 인증이 한 건도 없는 동네도 회색 점으로는 찍혀야 하기 때문입니다.
        Map<String, DistrictInfo> universe = seedDataService.districtGroupsOf("전체");
        Map<String, DistrictInfo> stats = seedDataService.districtGroupsOf(purpose);

        List<Map<String, Object>> items = new ArrayList<>();

        for (Map.Entry<String, DistrictInfo> e : universe.entrySet()) {
            String key = e.getKey();
            DistrictInfo any = e.getValue();

            String rgn = any.getRegion();
            String name = key;
            int sp = key.indexOf(' ');   // "경기 성남시 분당구" 처럼 뒤에 공백이 더 있어도 첫 칸만 자릅니다
            if (sp > 0) {
                if (rgn == null || rgn.isBlank()) rgn = key.substring(0, sp);
                name = key.substring(sp + 1);
            }
            if (region != null && !region.isBlank() && !region.equals(rgn)) continue;

            DistrictInfo info = stats.get(key);
            int count = (info == null) ? 0 : info.getCount();
            boolean insufficient = count < minSample;

            Map<String, Object> one = new LinkedHashMap<>();
            one.put("key", key);
            one.put("region", rgn);
            one.put("district", name);
            one.put("purpose", purpose);
            one.put("sampleCount", count);
            one.put("totalCount", any.getCount());        // 용도 무관 전체 인증 건수
            one.put("insufficient", insufficient);
            one.put("grade", insufficient ? null : info.getRepresentativeGrade());
            one.put("gradeCode", insufficient ? null : GradeTable.toCode(info.getRepresentativeGrade()));
            one.put("gradeRank", insufficient ? null
                    : GradeTable.rankOf(GradeTable.toCode(info.getRepresentativeGrade())));
            one.put("lowSample", info != null && info.isLowSample());
            items.add(one);
        }

        // 등급 좋은 순. 표본이 부족한 동네는 뒤로 보냅니다.
        items.sort((a, b) -> {
            Integer ra = (Integer) a.get("gradeRank");
            Integer rb = (Integer) b.get("gradeRank");
            if (ra == null && rb == null) return Integer.compare((Integer) b.get("totalCount"), (Integer) a.get("totalCount"));
            if (ra == null) return 1;
            if (rb == null) return -1;
            int c = Integer.compare(ra, rb);
            if (c != 0) return c;
            return Integer.compare((Integer) b.get("sampleCount"), (Integer) a.get("sampleCount"));
        });

        int rank = 1;
        int ranked = 0;
        for (Map<String, Object> one : items) {
            if (one.get("gradeRank") == null) {
                one.put("rank", null);          // 등급이 없으면 순위도 없습니다
            } else {
                one.put("rank", rank++);
                ranked++;
            }
        }

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("found", !items.isEmpty());
        out.put("region", region);
        out.put("purpose", purpose);
        out.put("total", items.size());
        out.put("ranked", ranked);                       // 등급이 매겨진 동네 수
        out.put("insufficient", items.size() - ranked);  // 인증 사례 부족
        out.put("districts", items);
        return out;
    }

    /** 셀렉트 박스용 — 데이터가 있는 시도 목록. */
    @GetMapping("/api/regions")
    public List<String> regions() {
        List<String> out = new ArrayList<>();
        for (Map.Entry<String, DistrictInfo> e : seedDataService.districtGroupsOf("전체").entrySet()) {
            String rgn = e.getValue() == null ? null : e.getValue().getRegion();
            if (rgn == null || rgn.isBlank()) {
                int sp = e.getKey().indexOf(' ');
                if (sp > 0) rgn = e.getKey().substring(0, sp);
            }
            if (rgn != null && !rgn.isBlank() && !out.contains(rgn)) out.add(rgn);
        }
        out.sort(null);
        return out;
    }
}
