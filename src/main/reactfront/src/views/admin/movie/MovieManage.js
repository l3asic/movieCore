

import React, { useEffect, useState } from 'react'
import {CButton} from "@coreui/react";
import axios from "axios";

function MovieManage(){


  return (
    <>
      <h3 className="mb-4">영화 관리 페이지 입니다</h3>
      <h4 className="mb-4"> 클릭 주의 !!! 클릭 주의 !!! 클릭 주의 !!! 클릭 주의 !!! </h4>
      < CButton color = "danger" size="lg" onClick={callMovieApiSyncDB}> 영화 목록 API 호출 및 DB 동기화 </ CButton >
      < CButton color = "dark" size="lg" onClick={callMovieCompanyApiSyncDB}> 영화 회사 API 호출 및 DB 동기화 </ CButton >
    </>
  )
}



function callMovieApiSyncDB(){
  axios({
    url: '/callMovieApiSyncDB', // 통신할 웹문서
    method: 'post', // 통신할 방식
    params:{
    }

  }).then(function (res){
    if(res.data.succesResult){
      alert("동기화 성공 성공?");
    }else{
      alert("동기화 성공 실패?");
    }

  }).catch(function (err){
    alert("실패 (오류)");
  });

}


function callMovieCompanyApiSyncDB(){
  axios({
    url: '/callMovieCompanyApiSyncDB', // 통신할 웹문서
    method: 'post', // 통신할 방식
    params:{
    }

  }).then(function (res){
    /*if(res.data.succesResult){
      alert("동기화 성공 성공?");
    }else{
      alert("동기화 성공 실패?");
    }*/

  }).catch(function (err){
    alert("실패 (오류)");
  });

}







export default MovieManage
