package com.example.movieCore.utils;

import java.nio.ByteBuffer;
import java.util.UUID;


/**
 *  유니크 키 만들어주는 클래스
 *  makeShortUUID를 호출하여 모듈 네임 넘겨주면 키생성
 *  모듈네임 ex) BRD, MEM, MOV
 *
 * */

public class MakeUUID {

    private final int LENGTH_20_LONG_RADIX = 9;
    private final int LENGTH_10_INT_RADIX = 9;

    // 10자리의 UUID 생성
    public String makeShortUUID(String moduleName) {
        UUID uuid = UUID.randomUUID();
        return moduleName + parseToShortUUID(uuid.toString());
    }

    // 20자리의 UUID 생성
    public String makeLongUUID(String moduleName) {
        UUID uuid = UUID.randomUUID();
        return moduleName + parseToLongUUID(uuid.toString());
    }

    public String parseToIntRadixUUID(String uuid, int radix) {
        int l = ByteBuffer.wrap(uuid.getBytes()).getInt();
        return Integer.toString(l, radix);
    }

    public String parseToLongRadixUUID(String uuid, int radix) {
        long l = ByteBuffer.wrap(uuid.getBytes()).getLong();
        return Long.toString(l, radix);
    }

    // 파라미터로 받은 값을 10자리의 UUID로 변환
    public String parseToShortUUID(String uuid) {
        int l = ByteBuffer.wrap(uuid.getBytes()).getInt();
        return Integer.toString(l, LENGTH_10_INT_RADIX);
    }

    // 파라미터로 받은 값을 20자리의 UUID로 변환
    public String parseToLongUUID(String uuid) {
        long l = ByteBuffer.wrap(uuid.getBytes()).getLong();
        return Long.toString(l, LENGTH_20_LONG_RADIX);
    }

}
