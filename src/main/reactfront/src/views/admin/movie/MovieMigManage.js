import React, {useEffect, useState} from 'react'
import {
  CButton,
  CContainer,
  CRow,
  CCol
} from "@coreui/react";
import axios from "axios";

function MovieMigManage() {


  return (
    <>
      <h4 className="mb-4">영화 이관 및 API 관리</h4>
      <h5> 클릭 주의 !!! 클릭 주의 !!! 클릭 주의 !!! 클릭 주의 !!!  </h5>

      {/* 회색 가로줄 하나 */}
      <div className="header-divider"
           style={{borderTop: '1px solid #ccc', marginTop: '20px', marginBottom: '20px'}}>
      </div>

      <CContainer>
        <CRow className="mt-4">
          <CCol>
            < CButton color="secondary" size="lg" onClick={callMovieCompanyApiSyncDB}> 1. 영화 회사 API 호출 및 DB 이관 </ CButton>
          </CCol>
          <CCol>
            < CButton color="secondary" size="lg" onClick={callMovieNationsApiSyncDB}> 2. 영화 제작 국가 API 호출 및 DB 이관 </ CButton>
          </CCol>
        </CRow>

        <CRow className="mt-4">
          <CCol>
            < CButton color="secondary" size="lg" onClick={callMoviePeopleApiSyncDB}> 3. 영화 인 API 호출 및 DB 이관 </ CButton>
          </CCol>
          <CCol>
            < CButton color="secondary" size="lg" onClick={callMoviePeopleInfoApiSyncDB}> 4. 영화 인 상세정보 API 호출 및 DB 이관 </ CButton>
          </CCol>
        </CRow>

        <CRow className="mt-4">
          <CCol>
            < CButton color="secondary" size="lg" onClick={callMovieApiSyncDB}> 5. 영화 목록 API 호출 및 DB 이관 </ CButton>
          </CCol>

        </CRow>

        {/* 회색 가로줄 하나 */}
        <div className="header-divider"
             style={{borderTop: '1px solid #ccc', marginTop: '20px', marginBottom: '20px'}}></div>

        <CRow className="mt-4">
          <CCol>
            < CButton color="secondary" size="lg" onClick={callKMDBApi}> 6. KMDB API 호출 (영화 포스터, 줄거리, 예고편 이관) </ CButton>
          </CCol>
        </CRow>

        {/* 회색 가로줄 하나 */}
        <div className="header-divider"
             style={{borderTop: '1px solid #ccc', marginTop: '20px', marginBottom: '20px'}}></div>

        <CRow className="mt-4">
          <CCol>
            < CButton color="secondary" size="lg" onClick={callMovieBoxOfficeApiSyncDB}> 7. 박스 오피스 API 호출 </ CButton>
          </CCol>
        </CRow>

        {/* 회색 가로줄 하나 */}
        <div className="header-divider"
             style={{borderTop: '1px solid #ccc', marginTop: '20px', marginBottom: '20px'}}></div>

        <CRow className="mt-4">

          <CCol>
            < CButton color="secondary" size="lg" onClick={callDBTest}> 99. db 테스트 </ CButton>
          </CCol>
        </CRow>



      </CContainer>
    </>
  )
}


/** 영화 목록,영화 상세정보 api 호출 */
function callMovieApiSyncDB() {
  axios({
    url: '/callMovieApiSyncDB', // 통신할 웹문서
    method: 'post', // 통신할 방식
    params: {}

  }).then(function (res) {
    if (res.data.succesResult) {
      alert("이관 성공?");
    } else {
      alert("이관 실패?");
    }

  }).catch(function (err) {
    alert("실패 (오류)");
  });

}


/** 영화 회사 api 호출 */
function callMovieCompanyApiSyncDB() {
  axios({
    url: '/callMovieCompanyApiSyncDB',
    method: 'post',
    params: {}

  }).then(function (res) {
    if (res.data.succesResult) {
      alert("이관 성공?");
    } else {
      alert("이관 실패?");
    }
  }).catch(function (err) {
    alert("실패 (오류)");
  });

}

/** 영화 인 api 호출 */
function callMoviePeopleApiSyncDB() {
  axios({
    url: '/callMoviePeopleApiSyncDB',
    method: 'post',
    params: {}

  }).then(function (res) {
    if (res.data.succesResult) {
      alert("이관 성공?");
    } else {
      alert("이관 실패?");
    }
  }).catch(function (err) {
    alert("실패 (오류)");
  });

}

/** 영화 인 상세정보 api 호출 */
function callMoviePeopleInfoApiSyncDB() {
  axios({
    url: '/callMoviePeopleInfoApiSyncDB',
    method: 'post',
    params: {}

  }).then(function (res) {
  }).catch(function (err) {
    alert("실패 (오류)");
  });

}

/** 영화 제작 국가 api 호출 */
function callMovieNationsApiSyncDB() {
  axios({
    url: '/callMovieNationsApiSyncDB',
    method: 'post',
    params: {}

  }).then(function (res) {
  }).catch(function (err) {
    alert("실패 (오류)");
  });

}


/** 영화 박스오피스 api 호출 */
function callMovieBoxOfficeApiSyncDB() {
  axios({
    url: '/callMovieBoxOfficeApiSyncDB',
    method: 'post',
    params: {}

  }).then(function (res) {
  }).catch(function (err) {
    alert("실패 (오류)");
  });

}


/** 디비 접속 테스트 */
function callDBTest() {
  axios({
    url: '/callDBTest',
    method: 'post',
    params: {}

  }).then(function (res) {
    alert(res.data.rtnNum);

  }).catch(function (err) {
    alert("실패 (오류)");
  });

}


/** 영화 포스터 테스트 */
function callKMDBApi() {
  axios({
    url: '/callKMDBApi',
    method: 'post',
    params: {}

  }).then(function (res) {

  }).catch(function (err) {
    alert("실패 (오류)");
  });

}




export default MovieMigManage
