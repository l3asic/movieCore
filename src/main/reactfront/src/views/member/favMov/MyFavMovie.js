import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput, CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilAddressBook,
  cilArrowCircleLeft,
  cilGroup,
  cilLockLocked,
  cilRoom,
  cilUser
} from '@coreui/icons'
import axios from "axios";
import ReactImg from "../../../assets/images/react.jpg";

const MyFavMovie = () => {

  const navigate  = useNavigate();

  const [memberInfo, setMemberInfo] = useState(JSON.parse(localStorage.getItem('memberBean')));

  useEffect(() => {
    /** 프로필 사진 조회 */
    selectMyFavMovList();

  }, []);


  return (

    <>
      <h1> 내가 찜한 영화 페이지</h1>


    </>
  )



  /** 내가 찜한 영화 리스트 조회 */
  function selectMyFavMovList(){
    axios({
      url: '/selectMyFavMovList',
      method: 'post',
      data: {
        memberBean : {
          memId : memberInfo.memId
        }

      }
    })
      .then(function (res) {
        debugger;

      })
      .catch(function (err) {

      });
  }










}




export default MyFavMovie
