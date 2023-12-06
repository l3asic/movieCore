package com.example.movieCore.utils;

import lombok.Getter;
import lombok.Setter;

public class Paging {

    public static PaginationResult calculatePagination(int totalItems, int itemsPerPage) {
        PaginationResult result = new PaginationResult();

        // 전체 아이템 갯수
        result.setTotalItems(totalItems);

        // 전체 페이지 수
        int totalPages = (int) Math.ceil((double) totalItems / itemsPerPage);
        result.setTotalPages(totalPages);

        // 현재 페이지 번호
        result.setCurrentPage(1); // 기본적으로 1페이지를 보여줌

        // 시작 인덱스 및 끝 인덱스 계산
        int startIndex = (result.getCurrentPage() - 1) * itemsPerPage;
        int endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

        // 시작 인덱스 및 끝 인덱스 설정
        result.setStartIndex(startIndex);
        result.setEndIndex(endIndex);

        // 이전 페이지 여부
        result.setHasPreviousPage(result.getCurrentPage() > 1);

        // 다음 페이지 여부
        result.setHasNextPage(result.getCurrentPage() < result.getTotalPages());

        return result;
    }

    @Getter
    @Setter
    public static class PaginationResult {
        private int totalItems;     // 토탈 갯수
        private int totalPages;     // 토탈 페이지
        private int currentPage;    // 현재 페이지
        private int startIndex;     // 시작 페이지
        private int endIndex;       // 끝 페이지
        private boolean hasPreviousPage;    // 이전 페이지 보유 여부
        private boolean hasNextPage;        // 다음 페이지 보유 여부

    }

}
