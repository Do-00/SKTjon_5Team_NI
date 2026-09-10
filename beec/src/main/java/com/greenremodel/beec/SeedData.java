package com.greenremodel.beec;

import java.util.List;
import java.util.Map;

public class SeedData {
    private String generatedAt;
    private Map<String, GroupInfo> groups;
    private List<Map<String, Object>> buildings; // 지금은 안 쓰지만 나중에 필요하면 사용

    public String getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(String generatedAt) { this.generatedAt = generatedAt; }
    public Map<String, GroupInfo> getGroups() { return groups; }
    public void setGroups(Map<String, GroupInfo> groups) { this.groups = groups; }
    public List<Map<String, Object>> getBuildings() { return buildings; }
    public void setBuildings(List<Map<String, Object>> buildings) { this.buildings = buildings; }
}