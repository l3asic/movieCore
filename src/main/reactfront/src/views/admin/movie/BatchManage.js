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
  CModalTitle,
  CFormSelect,
  CBadge
} from "@coreui/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import CIcon from "@coreui/icons-react";
import {cilAlignLeft, cilAvTimer} from "@coreui/icons";

function BatchManage() {
  const [batches, setBatches] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [batchLogs, setBatchLogs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentErrorText, setCurrentErrorText] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');

  useEffect(() => {
    fetchBatchStatus();
    selectBatchLog();
  }, []);

  const fetchBatchStatus = () => {
    axios({
      url: '/fetchBatchStatus',
      method: 'post',
      data: {}
    })
      .then(function (res) {
        setBatches(res.data.batchVo.batches); // 서버에서 받아온 배치 상태 데이터를 상태에 저장
      })
      .catch(function (err) {
        alert("배치 상태 조회 실패 (오류)");
      });
  };

  const toggleBatch = (batchName) => {
    const updatedBatches = batches.map(batch => {
      if (batch.batchName === batchName) {
        batch.batchRun = !batch.batchRun;
        updateBatchStatus(batch.batchName, batch.batchRun);
      }
      return batch;
    });
    setBatches(updatedBatches);
  };

  const updateBatchStatus = (batchName, batchRun) => {
    axios({
      url: '/updateBatchStatus',
      method: 'post',
      data: {
        batchConfig: {
          batchName: batchName,
          batchRun: batchRun
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
        alert("배치 상태 업데이트 실패 (오류)");
      });
  };

  const runBatchForDate = () => {
    if (!selectedBatch) {
      alert('배치를 선택하세요');
      return;
    }

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;

    const targetDt = `${year}${formattedMonth}${formattedDay}`;
    manualBatch(selectedBatch, targetDt);
    selectBatchLog();
  };

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
        alert("배치 로그 조회 실패 (오류)");
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
      <CRow className="mb-4">
        <CCol>
          <h4 className="d-flex align-items-center" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
            <CIcon icon={cilAvTimer} size="xl" className="me-3" style={{ fontSize: '2rem' }} />
            배치 관리
          </h4>
        </CCol>
      </CRow>

      <CCard className="mb-4">
        <CCardHeader style={{ backgroundColor: '#343a40', color: 'white' }}>
          <strong>배치 컨트롤</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>배치명</CTableHeaderCell>
                <CTableHeaderCell>현재 상태</CTableHeaderCell>
                <CTableHeaderCell>제어</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {batches.map((batch, index) => (
                <CTableRow key={index}>
                  <CTableDataCell><strong>{batch.batchName}</strong></CTableDataCell>
                  <CTableDataCell>{batch.batchRun ? '활성화' : '비활성화'}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color={batch.batchRun ? 'danger' : 'dark'}
                      onClick={() => toggleBatch(batch.batchName)}
                    >
                      {batch.batchRun ? '배치 중지' : '배치 시작'}
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader style={{ backgroundColor: '#343a40', color: 'white' }}>
          <strong>수동 배치</strong>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3 align-items-center">
            <CCol sm="2" className="d-flex align-items-center">
              <strong>배치 선택</strong>
            </CCol>
            <CCol sm="3" className="me-lg-5">
              <CFormSelect value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
                <option value="">배치를 선택하세요</option>
                {batches.map((batch, index) => (
                  <option key={index} value={batch.batchName}>{batch.batchName}</option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol sm="1" className="d-flex align-items-center" style={{ marginLeft: '20px' }}>
              <strong>날짜 선택</strong>
            </CCol>
            <CCol sm="3">
              <DatePicker
                selected={selectedDate}
                onChange={setSelectedDate}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                style={{ marginLeft: '20px' }}
                disabled={batches.find(batch => batch.batchName === selectedBatch)?.dateBatchYn !== 'Y'}
              />
            </CCol>
            <CCol sm="2">
              <CButton color="dark" onClick={runBatchForDate} style={{ marginLeft: '20px' }}>
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
                <CTableHeaderCell><strong>배치 명</strong></CTableHeaderCell>
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
                  <CTableDataCell><strong>{log.batchName}</strong></CTableDataCell>
                  <CTableDataCell>{formatDate(log.batchRunTime)}</CTableDataCell>
                  <CTableDataCell>{log.batchType}</CTableDataCell>
                  <CTableDataCell>
                    {log.batchStatus !== "정상 작동" && (
                      <CButton color="dark" onClick={() => showErrorMessage(log.batchErrorText)}>
                        오류 내용 보기
                      </CButton>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>{formatDate(log.batchEndTime)}</CTableDataCell>
                  <CTableDataCell>{log.batchDuration}</CTableDataCell>
                  <CTableDataCell>{log.batchFailCount}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={log.batchStatus === '실패' ? 'danger' : 'primary'}>
                      {log.batchStatus}
                    </CBadge>
                  </CTableDataCell>
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
        <CModalBody>
          {currentErrorText}
        </CModalBody>
      </CModal>
    </CContainer>
  );
}

function manualBatch(batchName, targetDt) {
  axios({
    url: '/manualBatch',
    method: 'post',
    data: {
      batchConfig: {
        batchName: batchName,
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

export default BatchManage;
