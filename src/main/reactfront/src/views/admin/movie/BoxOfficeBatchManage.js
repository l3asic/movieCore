import React, { useEffect, useState } from 'react';
import {
  CButton,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

function BoxOfficeBatchManage() {
  const [batchDailyBoxOfficeRun, setBatchDailyBoxOfficeRun] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [batchLogs, setBatchLogs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentErrorText, setCurrentErrorText] = useState('');

  useEffect(() => {
    dailyBoxOfficeBatchActiveCheck(setBatchDailyBoxOfficeRun);
    selectBatchLog();
  }, []);

  const toggleBatch = () => {
    setBatchDailyBoxOfficeRun(!batchDailyBoxOfficeRun);
    dailyBoxOfficeBatchActiveUpdate(!batchDailyBoxOfficeRun);
  };

  /** 특정 날짜 수동 배치 */
  const runBatchForDate = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;

    const targetDt = `${year}${formattedMonth}${formattedDay}`;
    specificDateBatch(targetDt);
    selectBatchLog();
  };

  /** 배치 로그 리스트 조회 */
  const selectBatchLog = () => {
    axios({
      url: '/selectBatchLog',
      method: 'post',
      data: {}
    })
      .then(function (res) {
        setBatchLogs(res.data.movVo.batchLogList); // 서버에서 받아온 배치 로그 데이터를 상태에 저장
      })
      .catch(function (err) {
        alert("실패 (오류)");
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    const hours = (`0${date.getHours()}`).slice(-2);
    const minutes = (`0${date.getMinutes()}`).slice(-2);
    const seconds = (`0${date.getSeconds()}`).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const showErrorMessage = (errorText) => {
    setCurrentErrorText(errorText);
    setModalVisible(true);
  };

  return (
    <CContainer>
      <h4 className="mb-lg-5">일일 박스 오피스 배치 관리</h4>

      <CCard className="mb-4">
        <CCardHeader style={{ backgroundColor: '#343a40', color: 'white' }}>
          <strong>배치 컨트롤</strong>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3 align-items-center">
            <CCol sm="8">
              <h5>현재 상태 : {batchDailyBoxOfficeRun ? '활성화' : '비활성화'}</h5>
            </CCol>
            <CCol sm="4">
              <CButton
                color={batchDailyBoxOfficeRun ? 'danger' : 'dark'}
                onClick={toggleBatch}
              >
                {batchDailyBoxOfficeRun ? '배치 중지' : '배치 시작'}
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
                style={{ width: '50%' }}
              />
            </CCol>
            <CCol sm="4">
              <CButton color="dark" onClick={runBatchForDate}>
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
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>배치 명</CTableHeaderCell>
                <CTableHeaderCell>배치 시작 시간</CTableHeaderCell>
                <CTableHeaderCell>배치 타입</CTableHeaderCell>
                <CTableHeaderCell>배치 오류 내용</CTableHeaderCell>
                <CTableHeaderCell>배치 종료 시간</CTableHeaderCell>
                <CTableHeaderCell>배치 소요 시간</CTableHeaderCell>
                <CTableHeaderCell>배치 실패 갯수</CTableHeaderCell>
                <CTableHeaderCell>배치 성공 여부</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {batchLogs.map((log, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{log.batchName}</CTableDataCell>
                  <CTableDataCell>{formatDate(log.batchRunTime)}</CTableDataCell>
                  <CTableDataCell>{log.batchType}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="dark" onClick={() => showErrorMessage(log.batchErrorText)}>
                      오류 내용 보기
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>{formatDate(log.batchEndTime)}</CTableDataCell>
                  <CTableDataCell>{log.batchDuration}</CTableDataCell>
                  <CTableDataCell>{log.batchFailCount}</CTableDataCell>
                  <CTableDataCell>{log.batchStatus}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal
        size="xl"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <CModalHeader onClose={() => setModalVisible(false)}>
          <CModalTitle>배치 오류 내용</CModalTitle>
        </CModalHeader>
        <CModalBody >
          {currentErrorText}
        </CModalBody>
      </CModal>
    </CContainer>
  );
}

/** 일일 박스 오피스 배치 상태 확인 */
function dailyBoxOfficeBatchActiveCheck(setBatchRun) {
  axios({
    url: '/dailyBoxOfficeBatchActiveCheck',
    method: 'post',
    data: {}
  })
    .then(function (res) {
      setBatchRun(res.data.batchDailyBoxOfficeRun);
    })
    .catch(function (err) {
      alert("실패 (오류)");
    });
}

/** 일일 박스 오피스 배치 동작/정지 업데이트 */
function dailyBoxOfficeBatchActiveUpdate(batchDailyBoxOfficeRun) {
  axios({
    url: '/dailyBoxOfficeBatchActiveUpdate',
    method: 'post',
    data: {
      batchConfig: {
        batchName: "batchDailyBoxOffice",
        batchRun: batchDailyBoxOfficeRun
      }
    }
  })
    .then(function (res) {
      if (res.data.success === 'success') {
        alert('배치 상태 업데이트 완료');
      } else {
        alert('배치 상태 업데이트 실패');
      }
    })
    .catch(function (err) {
      alert("실패 (오류)");
    });
}

/** 특정 일자 일일 박스 오피스 수동 배치 */
function specificDateBatch(targetDt) {
  axios({
    url: '/specificDateBatch',
    method: 'post',
    data: {
      batchConfig: {
        batchName: "batchDailyBoxOffice",
        targetDt: targetDt,
        batchType: "수동"
      }
    }
  })
    .then(function (res) {
      if (res.data.success === 'success') {
        alert('수동 배치 성공');
      } else if (res.data.success === 'fail') {
        alert('수동 배치 실패');
      }
    })
    .catch(function (err) {
      alert("실패 (오류)");
    });


}



export default BoxOfficeBatchManage;
