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

    // 스프링이 자동으로 만들어둔 JsonMapper를 그대로 받아서 씀
    public SeedDataService(JsonMapper jsonMapper) {
        this.jsonMapper = jsonMapper;
    }

    // 서버가 켜질 때 딱 한 번만 실행됨
    @PostConstruct
    public void loadSeedData() throws Exception {
        try (InputStream is = new ClassPathResource("seed.json").getInputStream()) {
            seedData = jsonMapper.readValue(is, SeedData.class);
        }
        System.out.println("seed.json 로드 완료. 그룹 수: " + seedData.getGroups().size());
    }

    // "비주거용"으로 들어와도 실제 데이터 키인 "주거용 이외"로 바꿔줌
    private String normalizePurpose(String purpose) {
        if ("비주거용".equals(purpose)) return "주거용 이외";
        return purpose;
    }

    public GroupInfo findGroup(String purpose, String region, String sizeBucket) {
        String key = normalizePurpose(purpose) + "|" + region + "|" + sizeBucket;
        return seedData.getGroups().get(key);
    }
}