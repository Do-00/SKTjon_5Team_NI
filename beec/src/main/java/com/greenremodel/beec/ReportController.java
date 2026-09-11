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
        out.put("gradeCode", GradeTable.toCode(group.getEstimatedGrade()));  // "1+등급" -> "1+"
        out.put("primaryEnergyKwh", group.getMedianValue());                 // 시뮬레이터의 baseEnergy
        out.put("groupKey", key);
        out.put("scopeLabel", label);
        return out;
    }

    // 동네 비교 지도 기능용 - name은 seed.json districtGroups 키(예: "은평구", "마곡지구")와 동일해야 함
    // purpose 는 선택값입니다. 안 보내면 예전과 100% 같게 동작합니다.
    //   /api/district?name=서울 강서구                    → 용도 구분 없음 (기존과 동일)
    //   /api/district?name=서울 강서구&purpose=주거용       → 주거용만
    //   /api/district?name=서울 강서구&purpose=주거용 이외   → 비주거용만
    @GetMapping("/api/district")
    public Map<String, Object> getDistrict(
            @RequestParam String name,
            @RequestParam(required = false) String purpose) {

        DistrictInfo info = seedDataService.findDistrictGroup(name, purpose);

        if (info == null) {
            return Map.of("found", false, "message", "해당 동네 데이터가 없습니다");
        }

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("found", true);
        out.put("name", name);
        out.put("region", info.getRegion());
        out.put("purpose", (purpose == null || purpose.isBlank()) ? "전체" : purpose);
        out.put("sampleCount", info.getCount());
        out.put("representativeGrade", info.getRepresentativeGrade());
        out.put("gradeDistribution", info.getGradeDistribution());
        out.put("lowSample", info.isLowSample());
        out.put("gradeCode", GradeTable.toCode(info.getRepresentativeGrade()));
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

        // 인증 레코드 중 191건은 energyValue 가 0(값 미기재)이라, 0 을 그대로 내보내면 성적표에 "0 kWh" 로 찍힌다.
        Double energy = matched.getEnergyValue() > 0 ? matched.getEnergyValue() : null;

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("found", true);
        out.put("rqid", matched.getRqid());
        out.put("name", matched.getName() == null ? "" : matched.getName());
        out.put("grade", matched.getGrade());
        out.put("gradeCode", GradeTable.toCode(matched.getGrade()));
        out.put("energyValue", energy);
        out.put("primaryEnergyKwh", energy);   // 시뮬레이터의 baseEnergy
        out.put("purpose", matched.getPurpose());
        out.put("region", matched.getRegion());
        out.put("district", matched.getDistrict());
        out.put("certKind", matched.getCertKind() == null ? "" : matched.getCertKind());
        // grade/energyValue 와 같은 레코드의 값. 프론트는 이걸로 인증 등급/추정 등급을 가른다.
        out.put("isEstimated", matched.getIsEstimated());
        return out;
    }
}