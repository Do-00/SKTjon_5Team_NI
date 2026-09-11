package com.greenremodel.beec;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ReportController {

    private final SeedDataService seedDataService;

    public ReportController(SeedDataService seedDataService) {
        this.seedDataService = seedDataService;
    }

    @GetMapping("/api/report")
    public Map<String, Object> getReport(
            @RequestParam String region,
            @RequestParam String purpose,
            @RequestParam String sizeBucket) {

        GroupInfo group = seedDataService.findGroup(purpose, region, sizeBucket);

        if (group == null) {
            return Map.of("found", false, "message", "해당 조건의 데이터가 없습니다");
        }

        String key = seedDataService.findGroupKey(purpose, region, sizeBucket);
        String label = (key == null) ? "" : key.replace("|", " ");

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("found", true);
        out.put("sampleCount", group.getCount());
        out.put("estimatedGrade", group.getEstimatedGrade());
        out.put("gradeDistribution", group.getGradeDistribution());
        out.put("lowSample", group.isLowSample());
        // 아래는 추가 필드. 기존 필드는 그대로 둡니다.
        out.put("gradeCode", toCode(group.getEstimatedGrade()));   // "1+등급" -> "1+"
        out.put("primaryEnergyKwh", group.getMedianValue());
        out.put("groupKey", key);
        out.put("scopeLabel", label);
        return out;
    }

    // 동네 비교 지도 기능용 - name은 seed.json districtGroups 키(예: "은평구", "마곡지구")와 동일해야 함
    @GetMapping("/api/district")
    public Map<String, Object> getDistrict(@RequestParam String name) {

        DistrictInfo info = seedDataService.findDistrictGroup(name);

        if (info == null) {
            return Map.of("found", false, "message", "해당 동네 데이터가 없습니다");
        }

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("found", true);
        out.put("name", name);
        out.put("sampleCount", info.getCount());
        out.put("representativeGrade", info.getRepresentativeGrade());
        out.put("gradeDistribution", info.getGradeDistribution());
        out.put("lowSample", info.isLowSample());
        out.put("gradeCode", toCode(info.getRepresentativeGrade()));
        return out;
    }

    // 주소 실측 매칭용 - 카카오(다음) 우편번호 서비스 oncomplete 결과를 그대로 넘기면 됨
    @GetMapping("/api/match")
    public Map<String, Object> matchAddress(
            @RequestParam(required = false) String jibunAddress,
            @RequestParam(required = false) String roadAddress,
            @RequestParam(required = false) String buildingName) {

        BuildingRecord matched = seedDataService.findBuildingByAddress(jibunAddress, roadAddress, buildingName);

        if (matched == null) {
            return Map.of("found", false);
        }

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("found", true);
        out.put("name", matched.getName() == null ? "" : matched.getName());
        out.put("grade", matched.getGrade());
        out.put("gradeCode", toCode(matched.getGrade()));
        out.put("energyValue", matched.getEnergyValue());
        out.put("purpose", matched.getPurpose());
        out.put("region", matched.getRegion());
        out.put("district", matched.getDistrict());
        out.put("certKind", matched.getCertKind() == null ? "" : matched.getCertKind());
        return out;
    }

    /** 화면 타입에 맞춘 등급 코드. "1+등급" -> "1+". 프론트가 변환 로직을 갖지 않도록 서버가 내보냅니다. */
    private static String toCode(String label) {
        if (label == null || label.isBlank()) return null;
        if ("등급외".equals(label)) return "등급외"; // "외"만 남으면 의미가 사라지므로 원문 유지
        return label.replace("등급", "").trim();
    }
}