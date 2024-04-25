import React, {useEffect, useState} from 'react';
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
import axios from "axios";

function BoxOfficeBatchManage() {
  const [batchDailyBoxOfficeRun, setBatchDailyBoxOfficeRun] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());


  useEffect(() => {
    dailyBoxOfficeBatchActiveCheck(setBatchDailyBoxOfficeRun);
  }, []);


  const toggleBatch = () => {
    setBatchDailyBoxOfficeRun(!batchDailyBoxOfficeRun);
    dailyBoxOfficeBatchActiveUpdate(!batchDailyBoxOfficeRun);
  };

  /** 특정 날짜 수동 배치 */
  const runBatchForDate = () => {
    // Date 객체에서 연, 월, 일을 추출
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 추가
    const day = selectedDate.getDate();

    // 월과 일이 한 자리 수일 경우 앞에 '0'을 붙여 두 자리로 만듦
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;

    // YYYYMMDD 형식으로 문자열 결합
    const targetDt = `${year}${formattedMonth}${formattedDay}`;

    specificDateBatch(targetDt);


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
              <h5>현재 상태 : {batchDailyBoxOfficeRun ? '활성화' : '비활성화'}</h5>
            </CCol>
            <CCol sm="4">
              <CButton block color={batchDailyBoxOfficeRun ? 'danger' : 'dark'} onClick={toggleBatch}>
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
      if(res.data.success == 'success'){
        alert('배치 상태 업데이트 완료')
      }else{
        alert('배치 상태 업데이트 실패')
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
        batchName : "batchDailyBoxOffice",
        targetDt : targetDt
      }
    }

  })

    .then(function (res) {
      if(res.data.success == 'success'){
        alert('수동 배치 성공');
      }else{
      }
    })
    .catch(function (err) {
      alert("실패 (오류)");
    });
}







export default BoxOfficeBatchManage;
