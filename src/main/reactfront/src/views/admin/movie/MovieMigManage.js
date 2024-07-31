import React from 'react';
import {
  CButton,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CForm
} from "@coreui/react";
import CIcon from '@coreui/icons-react';
import {cilSync, cilLink, cilCheckCircle, cilMovie, cilCloudDownload} from '@coreui/icons';
import axios from 'axios';
import GrayLine from "../../uitils/GrayLine";

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
      <h4 className="mb-2 d-flex align-items-center">
        <CIcon icon={cilCloudDownload} size="xl" className="me-2" style={{ fontSize: '2rem' }} />
        영화 이관 및 API 관리
      </h4>

      <p className="text-muted mb-4 ms-3">※ 동작에 주의 요함</p>

      <GrayLine marginBottom="50px" marginTop="10px"/>

      <CCard className="mb-5 shadow-sm">
        <CCardHeader className="bg-dark text-white">
          <strong>테스트 작업</strong>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CRow className="mb-3">
              <CCol md={12}>
                <CButton
                  block
                  color="secondary"
                  size="lg"
                  onClick={() => handleApiCall('/callDBTest', "DB 연결 정상", "DB 연결 실패")}
                >
                  <CIcon icon={cilCheckCircle} style={{ marginRight: '10px' }} />
                  0. DB 연결 테스트
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>

      <CCard className="mb-5 shadow-sm">
        <CCardHeader className="bg-dark text-white">
          <strong>API 이관 작업</strong>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CRow className="mb-4">
              <CCol md={6}>
                <CButton
                  color="secondary"
                  size="lg"
                  block
                  onClick={() => handleApiCall('/callMovieApiSyncDB', "영화 목록 이관 성공", "이관 실패")}
                >
                  <CIcon icon={cilSync} style={{ marginRight: '10px' }} />
                  1. 영화 목록 API 호출 및 DB 이관
                </CButton>
              </CCol>
              <CCol md={6}>
                <CButton
                  color="secondary"
                  size="lg"
                  block
                  onClick={() => handleApiCall('/callMovieCompanyApiSyncDB', "영화 회사 이관 성공", "이관 실패")}
                >
                  <CIcon icon={cilSync} style={{ marginRight: '10px' }} />
                  2. 영화 회사 API 호출 및 DB 이관
                </CButton>
              </CCol>
            </CRow>
            <CRow className="mb-4">
              <CCol md={6}>
                <CButton
                  color="secondary"
                  size="lg"
                  block
                  onClick={() => handleApiCall('/callMoviePeopleApiSyncDB', "영화 인물 이관 성공", "이관 실패")}
                >
                  <CIcon icon={cilSync} style={{ marginRight: '10px' }} />
                  3. 영화 인물 API 호출 및 DB 이관
                </CButton>
              </CCol>
              <CCol md={6}>
                <CButton
                  color="secondary"
                  size="lg"
                  block
                  onClick={() => handleApiCall('/callMoviePeopleInfoApiSyncDB', "영화 인 상세정보 이관 성공", "이관 실패")}
                >
                  <CIcon icon={cilSync} style={{ marginRight: '10px' }} />
                  4. 영화 인 상세정보 API 호출 및 DB 이관
                </CButton>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CButton
                  color="secondary"
                  size="lg"
                  block
                  onClick={() => handleApiCall('/callKMDBApi', "KMDB 데이터 이관 성공", "이관 실패")}
                >
                  <CIcon icon={cilLink} style={{ marginRight: '10px' }} />
                  5. KMDB API 호출 (영화 포스터, 줄거리, 예고편 이관)
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default MovieMigManage;
