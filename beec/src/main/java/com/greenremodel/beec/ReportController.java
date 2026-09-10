package com.greenremodel.beec;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ReportController {

    private final SeedDataService seedDataService;

    // 스프링이 SeedDataService 객체를 자동으로 넣어줌
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
}