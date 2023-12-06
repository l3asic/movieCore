import React, { useEffect, useState } from 'react'
import {
  CFormInput, CForm, CFormLabel, CFormTextarea,
  CFormSelect,
  CCol, CButton
} from '@coreui/react'
import axios from "axios";
import { useLocation } from 'react-router-dom';

const ArticleDetail = () => {

  const location = useLocation();
  const { articleData } = location.state || {}; // 전달된 데이터

  return (
    <>
      <h1 className="pb-lg-5"> 게시판 이름</h1>

      <CForm className="row g-3">

        <CCol md={3}>
          <CFormLabel htmlFor="exampleFormControlInput1">폴더</CFormLabel>
          <CFormInput type="" id="exampleFormControlInput1" value={articleData[0].folName} name="folId" disabled/>

        </CCol>

        <CCol md={3}>
          <CFormInput
            label="게시판"
            name="brdId"
            value={articleData[0].brdName}
            disabled
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            label="등록일자"
            name="createDate"
            value={articleData[0].createDt}
            className="mb-3"
            disabled
          />
        </CCol>

        <CCol md={3}>
          <CFormInput
            label="조회수"
            name="viewCnt"
            value={articleData[0].viewCnt}
            disabled
          />
        </CCol>


        <CCol md={9}>
          <div className="mb-1">
            <CFormLabel htmlFor="exampleFormControlInput1">제목</CFormLabel>
            <CFormInput type="" id="exampleFormControlInput1" value={articleData[0].subject} name="subject" disabled/>

          </div>

        </CCol>

        <CCol md={3}>
          <CFormInput
            label="작성자"
            name="memName"
            className="mb-1"
            disabled
          />
        </CCol>


        <CCol md={12}>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlTextarea1">내용</CFormLabel>
            <CFormTextarea id="exampleFormControlTextarea1" rows={10} name="content" value={articleData[0].content} disabled></CFormTextarea>
          </div>
        </CCol>


        <CCol md={12}>
          <div className="mb-3">
            {/*<CFormLabel htmlFor="formFileMultiple">파일 첨부</CFormLabel>*/}
            <CFormInput type="file" id="formFileMultiple" multiple/>
          </div>
        </CCol>

        < div className = " d-grid gap-2 d-md-flex justify-content-md-end pb-3" >
          < CButton className = " me-md-2 " size="sm" > 수정 </ CButton >
          < CButton  color = "dark" size="sm" > 목록으로 </ CButton >
        </ div >
      </CForm>

    </>
  ) //return

}

export default ArticleDetail
