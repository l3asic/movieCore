import React, {useEffect, useState} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CCardImage,
  CCardTitle,
  CCardText,
  CButton
} from '@coreui/react'
import axios from "axios";




const MovieRecommend = () => {

  // 회원 객체 관리
  const [memberBean, setMemberBean] = useState(JSON.parse(localStorage.getItem('memberBean')));

  // 영화 객체 관리
  const [movVo, setMovVo] = useState({
    personalRecommendMovList: [],
  });


  useEffect(() => {
    // 사용자 추천 영화 리스트 조회
    selectPersonalRecommendMov();
  }, []);



  return (
    <>
      <h4> 영화 추천 페이지 입니다. </h4>

    </>
  )


  /** 사용자 추천 영화 조회 */
  function selectPersonalRecommendMov(){

    axios({
      url: '/selectPersonalRecommendMov',
      method: 'post',
      data: {
        memberBean : memberBean
      }
    })
      .then(function (res) {
        debugger;
        movVo.personalRecommendMovList = res.data.movVo.movieBeanList;
        debugger;
      })
      .catch(function (err) {
        alert("실패 (오류)");
      });
  }



}

export default MovieRecommend
