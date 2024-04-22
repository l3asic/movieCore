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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BoxOfficeBatchManage() {
  const [batchActive, setBatchActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleBatch = () => {
    setBatchActive(!batchActive);
  };

  const runBatchForDate = () => {
    alert(`배치가 ${selectedDate.toISOString().slice(0, 10)}에 실행됩니다.`);
  };

  const navigateToBatchLogs = () => {
    console.log("배치 로그 페이지로 이동");
  };

  return (
    <CContainer>
      <h4 className="mb-lg-5">일일 박스 오피스</h4>

      <CCard className="mb-4">
        <CCardHeader style={{ backgroundColor: '#343a40', color: 'white' }}>
          <strong >배치 컨트롤</strong>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3 align-items-center">
            <CCol sm="8">
              <h5>현재 상태 : {batchActive ? '활성화' : '비활성화'}</h5>
            </CCol>
            <CCol sm="4">
              <CButton block color={batchActive ? 'danger' : 'dark'} onClick={toggleBatch}>
                {batchActive ? '배치 중지' : '배치 시작'}
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader style={{ backgroundColor: '#343a40', color: 'white' }}>
          <strong>특정 날짜 수동 배치</strong>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3 align-items-center">
            <CCol sm="1">
              <strong>날짜 선택</strong>
            </CCol>
            <CCol sm="7">
              <DatePicker
                selected={selectedDate}
                onChange={setSelectedDate}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </CCol>
            <CCol sm="4">
              <CButton block color="dark" onClick={runBatchForDate}>
                배치 실행
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader style={{ backgroundColor: '#343a40', color: 'white' }}>
          <strong>배치 로그</strong>
        </CCardHeader>
        <CCardBody>
          <CButton block color="secondary" onClick={navigateToBatchLogs}>
            배치 로그 보기
          </CButton>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default BoxOfficeBatchManage;
