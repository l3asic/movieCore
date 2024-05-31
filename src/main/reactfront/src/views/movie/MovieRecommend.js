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
    PersonalRecommendMovList: [],
  });


  const movies = [
    {
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      image: "https://example.com/inception.jpg"
    },
    {
      title: "The Matrix",
      description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      image: "https://example.com/matrix.jpg"
    },
    {
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      image: "https://example.com/interstellar.jpg"
    }
  ]



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
        movVo.PersonalRecommendMovList = res.data.movVo.movieBeanList;
        debugger;
      })
      .catch(function (err) {
        alert("실패 (오류)");
      });
  }



}

export default MovieRecommend
