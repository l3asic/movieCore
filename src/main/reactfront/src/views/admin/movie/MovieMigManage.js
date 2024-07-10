import React, { useState } from 'react';
import {
  CButton,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader
} from "@coreui/react";
import axios from 'axios';

function MovieMigManage() {
  const handleApiCall = async (apiUrl, successMessage, failureMessage) => {
    try {
      const response = await axios.post(apiUrl);
      if (response.data.succesResult) {
        alert(successMessage);
      } else {
        alert(failureMessage);
      }
    } catch (err) {
      alert("실패 (오류)");
    }
  };

  return (
    <CContainer>
      <h4 className="mb-4">영화 이관 및 API 관리</h4>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>API 이관 작업</strong>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol>
              <CButton color="secondary" size="lg" onClick={() => handleApiCall('/callMovieApiSyncDB', "영화 목록 이관 성공", "이관 실패")}>
                1. 영화 목록 API 호출 및 DB 이관
              </CButton>
            </CCol>
            <CCol>
              <CButton color="secondary" size="lg" onClick={() => handleApiCall('/callMovieCompanyApiSyncDB', "영화 회사 이관 성공", "이관 실패")}>
                2. 영화 회사 API 호출 및 DB 이관
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CButton color="secondary" size="lg" onClick={() => handleApiCall('/callMoviePeopleApiSyncDB', "영화 인물 이관 성공", "이관 실패")}>
                3. 영화 인물 API 호출 및 DB 이관
              </CButton>
            </CCol>
            <CCol>
              <CButton color="secondary" size="lg" onClick={() => handleApiCall('/callMoviePeopleInfoApiSyncDB', "영화 인 상세정보 이관 성공", "이관 실패")}>
                4. 영화 인 상세정보 API 호출 및 DB 이관
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>기타 작업</strong>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol>
              <CButton color="secondary" size="lg" onClick={() => handleApiCall('/callKMDBApi', "KMDB 데이터 이관 성공", "이관 실패")}>
                5. KMDB API 호출 (영화 포스터, 줄거리, 예고편 이관)
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CButton block color="secondary" size="lg" onClick={() => handleApiCall('/callDBTest', "DB 연결 성공", "DB 연결 실패")}>
                0. DB 연결 테스트
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default MovieMigManage;
