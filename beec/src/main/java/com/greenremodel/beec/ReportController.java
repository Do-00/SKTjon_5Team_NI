package com.greenremodel.beec;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

        return Map.of(
                "found", true,
                "sampleCount", group.getCount(),
                "estimatedGrade", group.getEstimatedGrade(),
                "gradeDistribution", group.getGradeDistribution(),
                "lowSample", group.isLowSample()
        );
    }

    // 동네 비교 지도 기능용 - name은 seed.json districtGroups 키(예: "은평구", "마곡지구")와 동일해야 함
    @GetMapping("/api/district")
    public Map<String, Object> getDistrict(@RequestParam String name) {

        DistrictInfo info = seedDataService.findDistrictGroup(name);

        if (info == null) {
            return Map.of("found", false, "message", "해당 동네 데이터가 없습니다");
        }

        return Map.of(
                "found", true,
                "sampleCount", info.getCount(),
                "representativeGrade", info.getRepresentativeGrade(),
                "gradeDistribution", info.getGradeDistribution(),
                "lowSample", info.isLowSample()
        );
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

        return Map.of(
                "found", true,
                "name", matched.getName() == null ? "" : matched.getName(),
                "grade", matched.getGrade(),
                "energyValue", matched.getEnergyValue(),
                "purpose", matched.getPurpose(),
                "region", matched.getRegion(),
                "certKind", matched.getCertKind() == null ? "" : matched.getCertKind()
        );
    }
}