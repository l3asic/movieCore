package com.example.movieCore.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Paging {
    private static final int DEFAULT_ITEMS_PER_PAGE = 10;
    private static final int DEFAULT_CURRENT_PAGE = 1;

    private int totalItems;         // 토탈 갯수
    private int itemsPerPage;       // 페이지당 아이템 수
    private int totalPages;         // 토탈 페이지
    private int currentPage;        // 현재 페이지
    private int startIndex;         // 시작 페이지
    private int endIndex;           // 끝 페이지
    private boolean hasPreviousPage;    // 이전 페이지 보유 여부
    private boolean hasNextPage;        // 다음 페이지 보유 여부

    /** 파라미터 : 리스트 토탈 갯수, 1페이지당 리스트 갯수, 현재 페이지 수*/
    public Paging(int totalItems, Integer itemsPerPage, Integer currentPage) {
        this.totalItems = totalItems;
        this.itemsPerPage = (itemsPerPage != null && itemsPerPage > 0) ? itemsPerPage : DEFAULT_ITEMS_PER_PAGE;
        this.currentPage = (currentPage != null && currentPage > 0) ? currentPage : DEFAULT_CURRENT_PAGE;
        calculatePagination();
    }

    private void calculatePagination() {
        // 전체 페이지 수
        totalPages = (int) Math.ceil((double) totalItems / itemsPerPage);

        // 시작 인덱스 및 끝 인덱스 계산
        startIndex = (currentPage - 1) * itemsPerPage;
        endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

        // 이전 페이지 여부
        hasPreviousPage = currentPage > 1;

        // 다음 페이지 여부
        hasNextPage = currentPage < totalPages;
    }
}
