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
      <h3 className="mb-4">영화 이관 관리 페이지 입니다</h3>
      <h4> 클릭 주의 !!! 클릭 주의 !!! 클릭 주의 !!! 클릭 주의 !!!  </h4>
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




export default MovieMigManage
