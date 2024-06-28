import React, { useEffect, useState } from 'react';
import {
  CFormInput, CForm, CFormLabel, CFormTextarea,
  CCol, CButton
} from '@coreui/react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

const ArticleDetail = () => {
  const location = useLocation();
  const { atclId } = location.state || {}; // 전달된 데이터
  const navigate = useNavigate();

  const [brdVo, setBrdVo] = useState(null);

  useEffect(() => {
    if (atclId) {
      // 데이터베이스에서 게시글 정보를 조회
      axios({
        url: '/selectArticleDetail',
        method: 'post',
        params: {
          atclId: atclId
        }
      }).then(function (res) {
        setBrdVo(res.data.brdVo);
      }).catch(function (err) {
        alert("조회 실패 (오류)");
      });
    }
  }, [atclId]);

  function updateArticle() {
    navigate('/brd/ArticleUpdate', { state: { articleData: brdVo.articleBean } });
  }

  function deleteArticle() {
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
            articleBean: { atclId: atclId }
          }
        }).then(function (res) {
          if (res.data.successResult) {
            alert("삭제 되었습니다.");
            navigate('/brd/ArticleListView');
          }
        }).catch(function (err) {
          alert("삭제 실패 (오류)");
        });
      }
    });
  }

  if (!brdVo || !brdVo.articleBean) {
    return <div>Loading...</div>;
  }

  const { articleBean } = brdVo;
  const formatDateTime = (datetime) => dayjs(datetime).format('YYYY.MM.DD HH:mm:ss');

  return (
    <>
      <h1 className="pb-lg-5"> 게시판 이름</h1>
      <CForm className="row g-3">
        <CCol md={3}>
          <CFormLabel htmlFor="folderName">폴더</CFormLabel>
          <CFormInput id="folderName" value={articleBean.folName} name="folId" disabled />
        </CCol>

        <CCol md={3}>
          <CFormLabel htmlFor="boardName">게시판</CFormLabel>
          <CFormInput id="boardName" value={articleBean.brdName} name="brdId" disabled />
        </CCol>

        <CCol md={2}>
          <CFormLabel htmlFor="createDate">등록일자</CFormLabel>
          <CFormInput id="createDate" value={formatDateTime(articleBean.createDt)} name="createDate" className="mb-3" disabled />
        </CCol>

        <CCol md={2}>
          <CFormLabel htmlFor="updateDate">수정일자</CFormLabel>
          <CFormInput id="updateDate" value={formatDateTime(articleBean.updateDt)} name="updateDate" className="mb-3" disabled />
        </CCol>

        <CCol md={2}>
          <CFormLabel htmlFor="viewCnt">조회수</CFormLabel>
          <CFormInput id="viewCnt" value={articleBean.viewCnt} name="viewCnt" disabled />
        </CCol>

        <CCol md={9}>
          <div className="mb-1">
            <CFormLabel htmlFor="subject">제목</CFormLabel>
            <CFormInput id="subject" value={articleBean.subject} name="subject" disabled />
          </div>
        </CCol>

        <CCol md={3}>
          <CFormLabel htmlFor="memName">작성자</CFormLabel>
          <CFormInput id="memName" value={articleBean.memName} name="memName" className="mb-1" disabled />
        </CCol>

        <CCol md={12}>
          <div className="mb-3">
            <CFormLabel htmlFor="content">내용</CFormLabel>
            <CFormTextarea id="content" rows={10} name="content" value={articleBean.content} disabled />
          </div>
        </CCol>

        <CCol md={12}>
          <div className="mb-3">
            <CFormLabel htmlFor="formFileMultiple">파일 첨부</CFormLabel>
            <CFormInput type="file" id="formFileMultiple" multiple disabled />
          </div>
        </CCol>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-3">
          <CButton className="me-md-2" onClick={updateArticle}>수정</CButton>
          <CButton className="me-md-2" onClick={deleteArticle}>삭제</CButton>
          <CButton color="dark" onClick={() => navigate(-1)}>목록으로</CButton>
        </div>
      </CForm>
    </>
  );
}

export default ArticleDetail;
