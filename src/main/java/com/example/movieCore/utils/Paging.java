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

    public Paging() {
        this.itemsPerPage = DEFAULT_ITEMS_PER_PAGE;  // 기본값으로 세팅
        this.currentPage = DEFAULT_CURRENT_PAGE;     // 기본값으로 세팅
    }

    /** 리스트 토탈 갯수 세팅 */
    public void setTotalItems(int totalItems) {
        setTotalItemsWithDefaultItemsPerPage(totalItems);
    }

    /** 1페이지당 리스트 갯수 세팅 */
    public void setItemsPerPage(int itemsPerPage) {
        this.itemsPerPage = (itemsPerPage > 0) ? itemsPerPage : DEFAULT_ITEMS_PER_PAGE;
        calculatePagination();
    }

    /** 현재 페이지 세팅 및 페이징 계산 */
    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
        calculatePagination();
    }

    // 기본값인 itemsPerPage와 currentPage를 사용하여 totalItems를 설정
    private void setTotalItemsWithDefaultItemsPerPage(int totalItems) {
        this.totalItems = totalItems;
        this.itemsPerPage = DEFAULT_ITEMS_PER_PAGE;
        this.currentPage = DEFAULT_CURRENT_PAGE;
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
