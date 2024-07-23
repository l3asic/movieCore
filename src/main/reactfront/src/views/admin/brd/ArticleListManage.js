import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormCheck,
  CNavbar,
  CContainer,
  CNavbarBrand,
  CForm,
  CButton,
  CFormInput,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCollapse,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardFooter
} from "@coreui/react";
import {
  cilLoopCircular,
  cilTrash,
  cilSwapVertical,
  cilMagnifyingGlass,
  cilRecycle, cilAlignLeft,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../../cstmCss/ArticleListManage.css';
import Paging from "../../uitils/Paging"; // 페이징 컴포넌트 가져오기
import GrayLine from "../../uitils/GrayLine";

function ArticleListManage() {
  const [brdVo, setBrdVo] = useState({
    articleBeanList: [],
    paging: {
      totalItems: 0,
      currentPage: 0,
    },
    searchBean: {
      searchFilter: "subject",
      searchText: "",
      sortKey: "",
      sortOdr: "",
    },
  });

  const [folders, setFolders] = useState([]);
  const [boards, setBoards] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({
    fileBeanList: [], // Add files array to hold the attached files
  });
  const [showDatePicker, setShowDatePicker] = useState(false); // DatePicker 표시 상태
  const [commentsCollapsed, setCommentsCollapsed] = useState(true); // 댓글 접기/펼치기 상태
  const [comments, setComments] = useState([]); // 댓글 목록 상태
  const [selectedComments, setSelectedComments] = useState([]); // 선택된 댓글 목록


  const stripHtmlTags = (str) => {
    return str.replace(/<[^>]*>?/gm, '');
  };


  useEffect(() => {
    selectArticleListAdmin();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const searchFilter = (event) => {
    setBrdVo((prevState) => ({
      ...prevState,
      searchBean: { ...prevState.searchBean, searchFilter: event.target.value },
    }));
  };

  const searchText = (event) => {
    setBrdVo((prevState) => ({
      ...prevState,
      searchBean: { ...prevState.searchBean, searchText: event.target.value },
    }));
  };

  const sortColumn = (key) => {
    setBrdVo((prevState) => {
      const sortOdr =
        prevState.searchBean.sortKey === key && prevState.searchBean.sortOdr === "asc"
          ? "desc"
          : "asc";
      return {
        ...prevState,
        searchBean: { ...prevState.searchBean, sortKey: key, sortOdr: sortOdr },
      };
    });
    selectArticleListAdmin();
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedList = brdVo.articleBeanList.map((article) => ({
      ...article,
      selected: !selectAll,
    }));
    setBrdVo((prevState) => ({
      ...prevState,
      articleBeanList: updatedList,
    }));
  };

  const handleSelect = (index) => {
    const updatedList = [...brdVo.articleBeanList];
    updatedList[index].selected = !updatedList[index].selected;
    setBrdVo((prevState) => ({
      ...prevState,
      articleBeanList: updatedList,
    }));
    setSelectAll(updatedList.every((article) => article.selected));
  };

  const searchArticleList = () => {
    selectArticleListAdmin();
  };

  const refreshFilterSearch = () => {
    setBrdVo((prevState) => ({
      ...prevState,
      searchBean: { searchFilter: "", searchText: "", sortKey: "", sortOdr: "" },
    }));
    selectArticleListAdmin();
  };

  /** 게시글 상태 변경 (삭제/ 원복) */
  const updateArticleStateAdmin = (mode) => {
    const selectedArticles = brdVo.articleBeanList.filter((article) => article.selected).map((article) => {
      const formattedCreateDt = article.createDt && !isNaN(Date.parse(article.createDt.replace(/\./g, "-")))
        ? new Date(article.createDt.replace(/\./g, "-")).toISOString()
        : null;
      const formattedExpireDt = article.expireDt && !isNaN(Date.parse(article.expireDt.replace(/\./g, "-")))
        ? new Date(article.expireDt.replace(/\./g, "-")).toISOString()
        : null;

      return {
        ...article,
        createDt: formattedCreateDt,
        expireDt: formattedExpireDt,
      };
    });

    axios({
      url: "/updateArticleStateAdmin",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        articleBeanList: selectedArticles,
        mode: mode,
      }),
    })
      .then((res) => {
        alert(res.data.successMsg);
        selectArticleListAdmin();
      })
      .catch((err) => {
        alert(err.response.data.errorMsg);
      });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).replace(/\./g, ".");
  };

  /** 게시글 리스트 조회  */
  const selectArticleListAdmin = (newPage = 0) => {
    axios({
      url: "/selectArticleListAdmin",
      method: "post",
      data: {
        newPage: newPage,
        searchBean: brdVo.searchBean,
      },
    })
      .then((res) => {
        const articleBeanList = res.data.brdVo.articleBeanList.map((article) => {
          const formattedCreateDt = formatDateTime(article.createDt);
          const formattedExpireDt = formatDateTime(article.expireDt);

          return {
            ...article,
            createDt: formattedCreateDt,
            expireDt: isNaN(Date.parse(article.expireDt)) ? null : formattedExpireDt,
            selected: false,
            stateText: article.state === "B" ? "정상" : article.state === "D" ? "삭제" : "기타",
            fileBeanList: article.fileBeanList || [], // 파일 정보 추가
          };
        });

        setBrdVo((prevState) => ({
          ...prevState,
          articleBeanList: articleBeanList,
          paging: res.data.brdVo.paging, // 페이징 정보 업데이트
        }));
      })
      .catch((err) => {
        alert("조회 실패 (오류)");
      });
  };

  const handlePageChange = (newPage) => {
    selectArticleListAdmin(newPage);
  };

  const handleRowClick = (index, article) => {
    if (!brdVo.articleBeanList[index].selected) {
      const formattedArticle = {
        ...article,
        createDt: article.createDt ? formatDateTime(article.createDt) : null,
        updateDt: article.updateDt ? formatDateTime(article.updateDt) : null,
        expireDt: article.expireDt ? formatDateTime(article.expireDt) : null,
        fileBeanList: article.fileBeanList || [], // 파일 정보 추가
      };
      setSelectedArticle(formattedArticle);
      setModal(true); // 팝업을 여는 부분

      // 모든 폴더 게시판 리스트 조회
      selectBoardListAdmin(article.brdId);

      // 게시글의 댓글 리스트 조회
      selectReplyListAdmin(article.atclId);
    }
  };

  const handleArticleChange = (event) => {
    const { name, value } = event.target;
    setSelectedArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleExpireDtChange = (date) => {
    setSelectedArticle((prevArticle) => ({
      ...prevArticle,
      expireDt: formatDateToKoreanString(date),
    }));
    setShowDatePicker(false);
  };

  const formatDateToKoreanString = (date) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}. ${month}. ${day}. ${hours}:${minutes}:${seconds}`;
  };

  // 댓글 목록 조회
  const selectReplyListAdmin = (atclId) => {
    axios({
      url: "/selectReplyListAdmin",
      method: "post",
      data: {
        articleBean: {
          atclId: atclId,
        },
      },
    })
      .then((res) => {
        const formattedComments = res.data.brdVo.replyBeanList.map((comment) => ({
          ...comment,
          createDt: formatDateTime(comment.createDt),
          stateText: comment.state === "B" ? "정상" : comment.state === "D" ? "삭제" : "기타",
        }));
        setComments(formattedComments || []); // 댓글 목록 설정, 없으면 빈 배열
      })
      .catch((err) => {
        alert("댓글 조회 실패 (오류)");
      });
  };

  /** 모든 폴더 게시판 리스트 조회 */
  const selectBoardListAdmin = (brdId) => {
    axios({
      url: "/selectBoardListAdmin",
      method: "post",
      data: {
        searchBean: {},
      },
    })
      .then((res) => {
        setFolders(res.data.brdVo.folderBeanList);
        const selectedFolder = res.data.brdVo.folderBeanList.find(folder =>
          folder.boardBeanList.some(board => board.brdId === brdId)
        );
        setBoards(selectedFolder ? selectedFolder.boardBeanList : []);
        setSelectedArticle(prevArticle => ({
          ...prevArticle,
          folderId: selectedFolder ? selectedFolder.folId : '',
        }));
      })
      .catch((err) => {
        alert("조회 실패 (오류)");
      });
  };

  // 날짜 형식을 'yyyy-MM-dd HH:mm:ss' 형식으로 변환하는 함수 추가
  const formatDateToSQLTimestamp = (date) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  /** 팝업 게시글 수정 저장 */
  const handleSaveArticle = () => {
    const currentDate = new Date(); // 현재 날짜와 시간을 가져옴
    const updatedArticle = {
      ...selectedArticle,
      createDt: selectedArticle.createDt && !isNaN(Date.parse(selectedArticle.createDt.replace(/\./g, "-"))) ? new Date(selectedArticle.createDt.replace(/\./g, "-")).toISOString() : null,
      updateDt: currentDate.toISOString(), // 항상 현재 날짜와 시간으로 설정
      expireDt: selectedArticle.expireDt && !isNaN(Date.parse(selectedArticle.expireDt.replace(/\./g, "-"))) ? new Date(selectedArticle.expireDt.replace(/\./g, "-")).toISOString() : null,
    };

    axios({
      url: "/updateArticleAdmin",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        articleBean: updatedArticle,
      }),
    })
      .then((res) => {
        if (res.data.successResult) {
          alert(res.data.successMsg);
        } else {
          alert("등록 실패");
        }
        setModal(false); // 팝업창을 닫음
        selectArticleListAdmin();
      })
      .catch((err) => {
        alert(err.response.data.errorMsg);
      });
  };

  const handleFolderChange = (event) => {
    const folderId = event.target.value;
    setSelectedArticle(prevArticle => ({
      ...prevArticle,
      folderId: folderId,
      brdName: '',
    }));
    const selectedFolder = folders.find(folder => folder.folId === folderId);
    setBoards(selectedFolder ? selectedFolder.boardBeanList : []);
  };

  const toggleComments = () => {
    setCommentsCollapsed(!commentsCollapsed);
  };

  const handleCommentSelect = (replId) => {
    setSelectedComments((prevSelected) =>
      prevSelected.includes(replId)
        ? prevSelected.filter((id) => id !== replId)
        : [...prevSelected, replId]
    );
  };

  const updateCommentStateAdmin = (mode) => {
    let replyBeanList = selectedComments.map(replId => ({
      replId: replId
    }));

    axios({
      url: "/updateReplyState",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        replyBeanList: replyBeanList,
        mode: mode,
      }),
    })
      .then((res) => {
        alert(res.data.successMsg);
        selectReplyListAdmin(selectedArticle.atclId); // 댓글 리스트 갱신
        setSelectedComments([]); // 선택된 댓글 체크박스 초기화
      })
      .catch((err) => {
        alert(err.response.data.errorMsg);
      });
  };

  return (
    <>
      <h4 className="mb-4 d-flex align-items-center">
        <CIcon icon={cilAlignLeft} size="xl" className="me-3" style={{ fontSize: '2rem' }} />
        게시글 관리
      </h4>

      <GrayLine marginTop="30px" marginBottom="30px" />

      <CNavbar colorScheme="light" className="bg-light">
        <CContainer fluid style={{ padding: 0 }}>
          <div className="d-flex align-items-center">
            <CButton
              color="black"
              variant="outline"
              style={{ whiteSpace: "nowrap", border: "1px solid gray", marginRight: "10px" }}
              title="게시글 상태 정상으로 변경"
              onClick={() => updateArticleStateAdmin("restore")}
            >
              <CIcon icon={cilRecycle} />
            </CButton>

            <CButton
              color="black"
              variant="outline"
              style={{ whiteSpace: "nowrap", border: "1px solid gray", marginRight: "10px" }}
              title="게시글 상태 삭제로 변경"
              onClick={() => updateArticleStateAdmin("delete")}
            >
              <CIcon icon={cilTrash} />
            </CButton>

            <CNavbarBrand className="ms-3">
              Total : {brdVo.paging.totalItems}
            </CNavbarBrand>
          </div>

          <CForm className="d-flex">
            <CFormSelect
              style={{ marginRight: "5px" }}
              options={[
                { label: "제목", value: "subject" },
                { label: "고유번호", value: "atcl_id" },
                { label: "게시판 명", value: "brd_name" },
                { label: "작성자", value: "mem_name" },
              ]}
              onChange={searchFilter}
              value={brdVo.searchBean.searchFilter}
            />

            <CFormInput
              type="search"
              className="me-2"
              placeholder="Search"
              onChange={searchText}
              value={brdVo.searchBean.searchText}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  searchArticleList();
                }
              }}
            />

            <CButton
              color="black"
              variant="outline"
              className="me-2"
              style={{ whiteSpace: "nowrap", border: "1px solid gray" }}
              onClick={searchArticleList}
            >
              <CIcon icon={cilMagnifyingGlass} />
            </CButton>

            <CButton
              color="black"
              variant="outline"
              style={{ whiteSpace: "nowrap", border: "1px solid gray" }}
              onClick={refreshFilterSearch}
            >
              <CIcon icon={cilLoopCircular} />
            </CButton>
          </CForm>
        </CContainer>
      </CNavbar>

      <CTable color="dark" striped className="mt-3 mb-lg-5">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col" style={{ width: "50px" }}>
              <CFormCheck id="selectAllCheckBox" checked={selectAll} onChange={handleSelectAll} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "100px" }}>
              고유번호
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("atcl_id")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "120px" }}>
              게시판 명
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("brd_name")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "150px" }}>
              제목
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("subject")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "200px" }}>
              내용
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("content")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "100px" }}>
              작성자
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("mem_name")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "120px" }}>
              작성일
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("create_dt")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "100px" }}>
              게시 종료 여부
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("expire_yn")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "80px" }}>
              상태
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("state")} />
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {brdVo.articleBeanList.length > 0 ? (
            brdVo.articleBeanList.map((article, index) => (
              <CTableRow key={article.atclId} >
                <CTableDataCell style={{ width: "50px" }} onClick={(e) => e.stopPropagation()}>
                  <CFormCheck checked={article.selected || selectAll} onChange={() => handleSelect(index)} />
                </CTableDataCell>
                <CTableDataCell style={{ width: "100px" }}>{article.atclId}</CTableDataCell>
                <CTableDataCell style={{ width: "120px" }}>{article.brdName}</CTableDataCell>
                <CTableDataCell style={{ width: "150px" , cursor: "pointer"}} onClick={() => handleRowClick(index, article)}>
                  {article.subject.length > 10 ? `${article.subject.substring(0, 10)}...` : article.subject}
                </CTableDataCell>
                <CTableDataCell style={{ width: "200px" }}>
                  {stripHtmlTags(article.content).length > 10 ? `${stripHtmlTags(article.content).substring(0, 10)}...` : stripHtmlTags(article.content)}
                </CTableDataCell>
                <CTableDataCell style={{ width: "100px" }}>{article.memName}</CTableDataCell>
                <CTableDataCell style={{ width: "120px" }}>{article.createDt}</CTableDataCell>
                <CTableDataCell style={{ width: "100px" }}>
                  {article.expireYn === "N" ? "게시 중" : "게시 종료"}
                </CTableDataCell>
                <CTableDataCell style={{ width: "80px" }}>{article.stateText}</CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan={10} className="text-center">
                게시글이 없습니다.
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>

      <Paging paging={brdVo.paging} onPageChange={handlePageChange} itemsPerPage={10} />

      {/** 게시글 상세 정보 팝업  */}

      <CModal size="lg" visible={modal} onClose={handleModalClose} alignment="center">
        <CModalHeader onClose={handleModalClose}>
          <CModalTitle>게시글 상세 정보</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ maxWidth: '800px', paddingTop: '40px', paddingBottom: '40px' }}>
          {selectedArticle && (
            <div className="form-container">
              <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <label><strong>폴더</strong></label>
                <CFormSelect
                  name="folderId"
                  value={selectedArticle.folderId || ''}
                  onChange={handleFolderChange}
                  style={{ flex: 1 }}
                >
                  {folders.map(folder => (
                    <option key={folder.folId} value={folder.folId}>{folder.folName}</option>
                  ))}
                </CFormSelect>
                <label><strong>게시판 명</strong></label>
                <CFormSelect
                  name="brdId"
                  value={selectedArticle.brdId || ''}
                  onChange={handleArticleChange}
                  style={{ flex: 1 }}
                >
                  {boards.map(board => (
                    <option key={board.brdId} value={board.brdId}>{board.brdName}</option>
                  ))}
                </CFormSelect>
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <label><strong>고유번호</strong></label>
                <CFormInput
                  type="text"
                  name="atclId"
                  value={selectedArticle.atclId || ''}
                  onChange={handleArticleChange}
                  readOnly
                  style={{ flex: 1 }}
                />
                <label><strong>작성자</strong></label>
                <CFormInput
                  type="text"
                  name="memName"
                  value={selectedArticle.memName || ''}
                  onChange={handleArticleChange}
                  style={{ flex: 1 }}
                />
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <label><strong>제목</strong></label>
                <CFormInput
                  type="text"
                  name="subject"
                  value={selectedArticle.subject || ''}
                  onChange={handleArticleChange}
                  style={{ flex: 1 }}
                />
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <label><strong>내용</strong></label>
                <div
                  style={{ flex: 1, height: '150px', backgroundColor: '#f5f5f5', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <label><strong>작성일</strong></label>
                <CFormInput
                  type="text"
                  name="createDt"
                  value={selectedArticle.createDt || ''}
                  onChange={handleArticleChange}
                  readOnly
                  style={{ flex: 1 }}
                />
                <label><strong>수정일</strong></label>
                <CFormInput
                  type="text"
                  name="updateDt"
                  value={selectedArticle.updateDt || ''}
                  onChange={handleArticleChange}
                  readOnly
                  style={{ flex: 1 }}
                />
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <label><strong>게시 종료 여부</strong></label>
                <CFormSelect
                  name="expireYn"
                  value={selectedArticle.expireYn}
                  onChange={handleArticleChange}
                  style={{ flex: 0.4 }}
                >
                  <option value="N">게시 중</option>
                  <option value="Y">게시 종료</option>
                </CFormSelect>

                <div style={{ display: 'flex', flex: 1, gap: '10px', alignItems: 'center' }}>
                  <label><strong>게시 종료일</strong></label>
                  {!showDatePicker ? (
                    <>
                      <CFormInput
                        type="text"
                        name="expireDt"
                        value={selectedArticle.expireDt || ''}
                        onChange={handleArticleChange}
                        readOnly
                        style={{ flex: 1 }}
                      />
                      <CButton color="dark" onClick={() => setShowDatePicker(true)}>변경</CButton>
                    </>
                  ) : (
                    <DatePicker
                      selected={selectedArticle && selectedArticle.expireDt && !isNaN(Date.parse(selectedArticle.expireDt.replace(' ', 'T'))) ? new Date(selectedArticle.expireDt.replace(' ', 'T')) : null}
                      onChange={handleExpireDtChange}
                      dateFormat="yyyy.MM.dd HH:mm"
                      className="form-control"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      style={{ flex: 1 }}
                    />
                  )}
                </div>
              </div>
              <div className="form-row" style={{ marginTop: '20px' }}>
                <h5 style={{ flex: 1 }}><strong>첨부 파일:</strong></h5>
                <div style={{ flex: 1 }}>
                  {selectedArticle.fileBeanList && selectedArticle.fileBeanList.length > 0 ? (
                    <div className="d-flex flex-wrap">
                      {selectedArticle.fileBeanList.map((file, index) => (
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
                      ))}
                    </div>
                  ) : (
                    <p>첨부 파일이 없습니다.</p>
                  )}
                </div>
              </div>
              <div className="form-row" style={{ marginTop: '20px' }}>
                <h5 style={{ flex: 1 }}><strong>댓글 ({comments.length})</strong></h5>
                <div>
                  <CButton
                    color="black"
                    variant="outline"
                    style={{ whiteSpace: "nowrap", border: "1px solid gray", marginRight: "10px" }}
                    title="댓글 상태 정상으로 변경"
                    onClick={() => updateCommentStateAdmin("restore")}
                  >
                    <CIcon icon={cilRecycle} />
                  </CButton>

                  <CButton
                    color="black"
                    variant="outline"
                    style={{ whiteSpace: "nowrap", border: "1px solid gray", marginRight: "10px" }}
                    title="댓글 상태 삭제로 변경"
                    onClick={() => updateCommentStateAdmin("delete")}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>

                  <CButton color="dark" onClick={toggleComments}>
                    {commentsCollapsed ? '펼치기' : '접어두기'}
                  </CButton>
                </div>
              </div>
              <CCollapse visible={!commentsCollapsed} className="mt-3">
                <CTable striped hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col" style={{ width: "50px" }}>
                        <CFormCheck
                          checked={selectedComments.length === comments.length}
                          onChange={() => {
                            setSelectedComments(
                              selectedComments.length === comments.length
                                ? []
                                : comments.map((comment) => comment.replId)
                            );
                          }}
                        />
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">고유번호</CTableHeaderCell>
                      <CTableHeaderCell scope="col">작성자</CTableHeaderCell>
                      <CTableHeaderCell scope="col">내용</CTableHeaderCell>
                      <CTableHeaderCell scope="col">작성일</CTableHeaderCell>
                      <CTableHeaderCell scope="col">상태</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <CTableRow key={comment.replId}>
                          <CTableDataCell style={{ width: "50px" }}>
                            <CFormCheck
                              checked={selectedComments.includes(comment.replId)}
                              onChange={() => handleCommentSelect(comment.replId)}
                            />
                          </CTableDataCell>
                          <CTableDataCell>{comment.replId}</CTableDataCell>
                          <CTableDataCell>{comment.memName}</CTableDataCell>
                          <CTableDataCell>{comment.content}</CTableDataCell>
                          <CTableDataCell>{comment.createDt}</CTableDataCell>
                          <CTableDataCell>{comment.stateText}</CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan={6} className="text-center">
                          댓글이 없습니다.
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CCollapse>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleModalClose}>
            닫기
          </CButton>
          <CButton color="primary" onClick={handleSaveArticle}>
            저장
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default ArticleListManage;
