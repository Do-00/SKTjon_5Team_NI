package com.greenremodel.beec;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AddressUtil {

    // "화정동 23-191" 처럼 동/리/가 이름 + 번지 패턴을 뽑아내기 위한 정규식
    private static final Pattern DONG_JIBUN =
            Pattern.compile("([가-힣0-9]+(동|리|가))\\s*([0-9]+(-[0-9]+)?)");

    public static String normalize(String address) {
        if (address == null) return "";
        return address.replaceAll("\\s+", "");
    }

    /**
     * "OO시 OO구 화정동 23-191" 같은 지번/도로명 주소에서
     * "화정동23-191" 형태의 매칭 키를 뽑는다. 못 뽑으면 null.
     * seed.json의 address 필드가 지번/도로명/장소명이 섞여 있어서
     * 완전 일치보다는 "동+번지 포함 여부"로 느슨하게 매칭한다.
     */
    public static String extractDongJibunKey(String address) {
        if (address == null) return null;
        Matcher m = DONG_JIBUN.matcher(address);
        if (m.find()) {
            return normalize(m.group(1) + m.group(3));
        }
        return null;
    }
}