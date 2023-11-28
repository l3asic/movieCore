import React, {useEffect, useState} from 'react'
import {
  CButton,
  CContainer,
  CRow,
  CCol
} from "@coreui/react";
import axios from "axios";

function MovieManage() {


  return (
    <>
      <h3 className="mb-4">영화 관리 페이지 입니다</h3>
      <h4 className="mb-4"> 클릭 주의 !!! 클릭 주의 !!! 클릭 주의 !!! 클릭 주의 !!! </h4>
      <CContainer>
        <CRow>
          <CCol>
            < CButton color="danger" size="lg" onClick={callMovieApiSyncDB}> 영화 목록 API 호출 및 DB 이관 </ CButton>
          </CCol>
          <CCol>
            < CButton color="dark" size="lg" onClick={callMovieCompanyApiSyncDB}> 영화 회사 API 호출 및 DB 이관 </ CButton>
          </CCol>
          <CCol>
            < CButton color="secondary" size="lg" onClick={callMoviePersonApiSyncDB}> 영화 인 API 호출 및 DB 이관 </ CButton>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}


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
function callMoviePersonApiSyncDB() {
  axios({
    url: '/callMoviePersonApiSyncDB',
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






export default MovieManage
