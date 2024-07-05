import React, { useEffect, useState } from 'react';
import {
  CFormInput, CForm, CFormLabel, CCol, CButton, CCard, CCardBody, CCardTitle, CCardText, CCardFooter, CFormTextarea, CRow
} from '@coreui/react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import GrayLine from "../../uitils/GrayLine";

const ArticleDetail = () => {
  const location = useLocation();
  const { atclId } = location.state || {}; // 전달된 데이터
  const navigate = useNavigate();

  const [brdVo, setBrdVo] = useState(null);
  const [replyBeanList, setReplyBeanList] = useState([]);
  const [newComment, setNewComment] = useState('');
  const loggedInUserId = JSON.parse(localStorage.getItem('memberBean')).memId;

  useEffect(() => {
    if (atclId) {
      // 데이터베이스에서 게시글 정보를 조회
      fetchArticleDetail(atclId);
    }
  }, [atclId]);

  const fetchArticleDetail = async (articleId) => {
    try {
      const response = await axios({
        url: '/selectArticleDetail',
        method: 'post',
        params: {
          atclId: articleId,
          memId: loggedInUserId
        }
      });
      setBrdVo(response.data.brdVo);
      setReplyBeanList(response.data.brdVo.replyBeanList);
    } catch (error) {
      alert("조회 실패 (오류)");
    }
  };

  const updateArticle = () => {
    navigate('/brd/ArticleUpdate', { state: { articleData: brdVo.articleBean } });
  };

  const deleteArticle = () => {
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
  };

  const handleCommentSubmit = async () => {
    if (!newComment) {
      alert('댓글을 입력하세요.');
      return;
    }

    try {
      const response = await axios({
        url: '/addReply',
        method: 'post',
        data: {
          replyBean: {
            atclId: atclId,
            content: newComment,
            memId: loggedInUserId,
            memName: JSON.parse(localStorage.getItem('memberBean')).memName
          }
        }
      });

      if (response.data.successResult) {
        fetchArticleDetail(atclId); // 댓글 추가 후 전체 댓글 목록을 다시 가져옴
        setNewComment('');
      } else {
        alert('댓글 등록 실패');
      }
    } catch (error) {
      alert('댓글 등록 실패 (오류)');
    }
  };

  const handleCommentDelete = async (replId) => {
    try {

      let replyBeanList = [];
      let replyBean = {
        replId : replId
      }
      replyBeanList.push(replyBean);


      const res = await axios({
        url: '/updateReplyState',
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          replyBeanList: replyBeanList,
          mode: "delete",
        }),
      });

      if (res.data.successResult) {
        alert(res.data.successMsg);
        fetchArticleDetail(atclId); // 댓글 삭제 후 전체 댓글 목록을 다시 가져옴
      } else {
        alert('댓글 삭제 실패');
      }
    } catch (error) {
      alert('댓글 삭제 실패 (오류)');
    }
  };





  if (!brdVo || !brdVo.articleBean) {
    return <div>Loading...</div>;
  }

  const { articleBean } = brdVo;
  const { fileBeanList } = articleBean;
  const formatDateTime = (datetime) => dayjs(datetime).format('YYYY.MM.DD HH:mm:ss');

  return (
    <>
      <h4 className="pb-lg-3"> {articleBean.brdName}</h4>
      <GrayLine marginBottom="20px" marginTop="0px"/>
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
            <div
              id="content"
              name="content"
              className="form-control"
              style={{ minHeight: '200px', backgroundColor: '#f5f5f5', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
              dangerouslySetInnerHTML={{ __html: articleBean.content }}
            />
          </div>
        </CCol>

        <CCol md={12}>
          <div className="mb-3">
            <CFormLabel htmlFor="fileList">파일 첨부</CFormLabel>
            <div className="d-flex flex-wrap">
              {fileBeanList && fileBeanList.length > 0 ? (
                fileBeanList.map((file, index) => (
                  <CCard key={index} className="m-2" style={{ minWidth: '200px', maxWidth: '200px' }}>
                    <CCardBody>
                      <CCardTitle>{file.fileName}</CCardTitle>
                      <CCardText>
                        {file.fileExt.toUpperCase()} 파일
                      </CCardText>
                    </CCardBody>
                    <CCardFooter>
                      <CButton href={file.src} download={file.localName} color="primary">
                        다운로드
                      </CButton>
                    </CCardFooter>
                  </CCard>
                ))
              ) : (
                <CCard className="m-2" style={{ minWidth: '200px' }}>
                  <CCardBody>
                    <CCardText>첨부된 파일이 없습니다.</CCardText>
                  </CCardBody>
                </CCard>
              )}
            </div>
          </div>
        </CCol>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-3">
          {
            articleBean.memId === loggedInUserId && (
            <>
              <CButton className="me-md-2" onClick={updateArticle}>게시글 수정</CButton>
              <CButton className="me-md-2" onClick={deleteArticle}>삭제</CButton>
            </>
          )}
          <CButton color="dark" onClick={() => navigate(-1)}>목록으로</CButton>
        </div>

        <GrayLine marginBottom="0px" marginTop="0px"/>

        {/* 댓글 작성 영역 */}
        <CCol md={12} className="mt-4">
          <h5>댓글</h5>
          <CForm className="mb-2 d-flex align-items-center">
            <CFormTextarea
              id="newComment"
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow-1 me-2"
            />
            <CButton
              color="secondary"
              style={{ width : "80px"}}
              onClick={handleCommentSubmit}>
              작성
            </CButton>
          </CForm>
        </CCol>

        {/* 댓글 리스트 영역 */}
        <CCol md={12}>
          <div className="mt-4">
            {replyBeanList.map(reply => (
              <CCard key={reply.replId} className="mb-2">
                <CCardBody className="d-flex justify-content-between align-items-center">
                  <div>
                    <CCardTitle>{reply.memName}</CCardTitle>
                    <CCardText>{reply.content}</CCardText>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                      {formatDateTime(reply.createDt)}
                    </div>
                  </div>
                  {reply.memId === loggedInUserId && (
                    <CButton
                      color="secondary"
                      size="sm"
                      onClick={() => {
                        if (window.confirm("정말로 댓글을 삭제하시겠습니까?")) {
                          handleCommentDelete(reply.replId);
                        }
                      }}
                    >
                      삭제
                    </CButton>
                  )}
                </CCardBody>
              </CCard>
            ))}
          </div>
        </CCol>
      </CForm>
    </>
  );
}

export default ArticleDetail;
