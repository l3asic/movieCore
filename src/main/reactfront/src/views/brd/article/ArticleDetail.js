import React, { useEffect, useState } from 'react'
import {
  CFormInput, CForm, CFormLabel, CFormTextarea,
  CFormSelect,
  CCol, CButton
} from '@coreui/react'
import axios from "axios";
import {useLocation, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const ArticleDetail = () => {

  const location = useLocation();
  const { articleData } = location.state || {}; // 전달된 데이터
  const navigate = useNavigate();

  function updateArticle(atclId){
    navigate('/brd/ArticleUpdate', { state: { articleData: articleData } });
  }

  function deleteArticle(atclId){
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        // 삭제 로직 실행
        axios({
              url: '/deleteArticle',
              method: 'post',
              data: {
                articleBean : { atclId: atclId }
              }
            }).then(function (res) {
              if(res.data.successResult){
                alert("삭제 되었습니다.");
                navigate('/brd/ArticleListView');}
              });
      }
    });
  }

  return (
    <>
      <h1 className="pb-lg-5"> 게시판 이름</h1>

      <CForm className="row g-3">

        <CCol md={3}>
          <CFormLabel htmlFor="exampleFormControlInput1">폴더</CFormLabel>
          <CFormInput type="" id="exampleFormControlInput1" value={articleData[0].folderBeanList[0].folName} name="folId" disabled/>

        </CCol>

        <CCol md={3}>
          <CFormInput
            label="게시판"
            name="brdId"
            value={articleData[0].folderBeanList[0].boardBeanList[0].brdName}
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
            value={articleData[0].memName}
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
          < CButton className = " me-md-2 " size="sm" value={articleData[0].atclId} onClick={() => updateArticle(articleData[0].atclId)} > 수정 </ CButton >
          < CButton className = " me-md-2 " size="sm" value={articleData[0].atclId} onClick={() => deleteArticle(articleData[0].atclId)} > 삭제 </ CButton >
          < CButton  color = "dark" size="sm" onClick={() => navigate(-1)}> 목록으로 </ CButton >
        </ div >
      </CForm>

    </>
  ) //return

}

export default ArticleDetail
