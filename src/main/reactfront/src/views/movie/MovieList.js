import React, { useEffect, useState } from 'react'
import axios from "axios";

import {
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle
} from '@coreui/react';

import ReactImg from "../../assets/images/react.jpg"

function MovieList(){




  return(
    <>
      <h3>영화 리스트 페이지 입니다</h3>

      {/** 첫번째 줄 (3개 아이템)  */}

      <CRow className="mt-5">
        <CCol sm="4">
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>텍스트</CCardText>
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="4">
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>텍스트</CCardText>
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="4">
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>텍스트</CCardText>
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      {/** 두번쨰 줄 */}
      <CRow className="mt-5">
        <CCol sm="4">
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>텍스트</CCardText>
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="4">
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>텍스트</CCardText>
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="4">
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>텍스트</CCardText>
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


    </>

  ) // return
}

export default MovieList
