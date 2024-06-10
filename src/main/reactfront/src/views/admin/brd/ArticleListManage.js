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
} from "@coreui/react";
import {
  cilLoopCircular,
  cilTrash,
  cilSwapVertical,
  cilMagnifyingGlass,
  cilRecycle,
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
    files: [], // Add files array to hold the attached files
  });
  const [showDatePicker, setShowDatePicker] = useState(false); // DatePicker 표시 상태

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
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
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

    // 기존동작
    if (!brdVo.articleBeanList[index].selected) {
      const formattedArticle = {
        ...article,
        createDt: article.createDt ? formatDateTime(article.createDt) : null,
        updateDt: article.updateDt ? formatDateTime(article.updateDt) : null,
        expireDt: article.expireDt ? formatDateTime(article.expireDt) : null,
      };
      setSelectedArticle(formattedArticle);
      setModal(true); // 팝업을 여는 부분

      // 모든 폴더 게시판 리스트 조회
      selectBoardListAdmin(article.brdId);
    }

    /** 추후 게시글에 속한 파일 조회 예정 */
    /*if (!brdVo.articleBeanList[index].selected) {
      axios({
        url: "/getArticleFiles", // Assuming you have an endpoint to get article files
        method: "post",
        data: { atclId: article.atclId },
      })
        .then((res) => {
          setSelectedArticle({ ...article, files: res.data.files });
          setModal(true); // 팝업을 여는 부분
          selectBoardListAdmin(article.brdId);
        })
        .catch((err) => {
          alert("파일 조회 실패 (오류)");
        });
    }*/
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
      expireDt: formatDateTime(date.toISOString()),
    }));
    setShowDatePicker(false);
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


  /** 날짜 형식을 'yyyy-MM-dd HH:mm:ss' 형식으로 변환 */
  const formatDateToSQLTimestamp = (dateString) => {
    if (!dateString) return null;

    const [datePart, timePart] = dateString.trim().split(' ');
    if (!datePart || !timePart) return null;

    const dateParts = datePart.split('.').map(part => part.trim());
    const timeParts = timePart.split(':').map(part => part.trim());

    if (dateParts.length !== 3 || timeParts.length !== 2) return null;

    const [year, month, day] = dateParts;
    const [hours, minutes] = timeParts;

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`; // 'yyyy-MM-dd HH:mm:ss' 형식
  };

  /** 팝업 게시글 수정 저장 */
  const handleSaveArticle = () => {
    const updatedArticle = {
      ...selectedArticle,
      createDt: selectedArticle.createDt ? formatDateToSQLTimestamp(selectedArticle.createDt) : null,
      updateDt: selectedArticle.updateDt ? formatDateToSQLTimestamp(selectedArticle.updateDt) : null,
      expireDt: selectedArticle.expireDt ? formatDateToSQLTimestamp(selectedArticle.expireDt) : null,
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
        alert(res.data.successMsg);
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

  return (
    <>
      <h4> 게시글 관리 </h4>

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
              <CTableRow key={article.atclId} onClick={() => handleRowClick(index, article)}>
                <CTableDataCell style={{ width: "50px" }} onClick={(e) => e.stopPropagation()}>
                  <CFormCheck checked={article.selected || selectAll} onChange={() => handleSelect(index)} />
                </CTableDataCell>
                <CTableDataCell style={{ width: "100px" }}>{article.atclId}</CTableDataCell>
                <CTableDataCell style={{ width: "120px" }}>{article.brdName}</CTableDataCell>
                <CTableDataCell style={{ width: "150px" }}>
                  {article.subject.length > 10 ? `${article.subject.substring(0, 10)}...` : article.subject}
                </CTableDataCell>
                <CTableDataCell style={{ width: "200px" }}>
                  {article.content.length > 10 ? `${article.content.substring(0, 10)}...` : article.content}
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
                <CFormSelect
                  name="folderId"
                  label="폴더"
                  value={selectedArticle.folderId || ''}
                  onChange={handleFolderChange}
                  style={{ flex: 1 }}
                >
                  {folders.map(folder => (
                    <option key={folder.folId} value={folder.folId}>{folder.folName}</option>
                  ))}
                </CFormSelect>
                <CFormSelect
                  name="brdId"
                  label="게시판 명"
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
                <CFormInput
                  type="text"
                  name="atclId"
                  label="고유번호"
                  value={selectedArticle.atclId || ''}
                  onChange={handleArticleChange}
                  readOnly
                  style={{ flex: 1 }}
                />
                <CFormInput
                  type="text"
                  name="memName"
                  label="작성자"
                  value={selectedArticle.memName || ''}
                  onChange={handleArticleChange}
                  style={{ flex: 1 }}
                />
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <CFormInput
                  type="text"
                  name="subject"
                  label="제목"
                  value={selectedArticle.subject || ''}
                  onChange={handleArticleChange}
                  style={{ flex: 1 }}
                />
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <CFormInput
                  type="textarea"
                  name="content"
                  label="내용"
                  value={selectedArticle.content || ''}
                  onChange={handleArticleChange}
                  style={{ flex: 1, height: '150px' }}
                />
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <CFormInput
                  type="text"
                  name="createDt"
                  label="작성일"
                  value={selectedArticle.createDt || ''}
                  onChange={handleArticleChange}
                  readOnly
                  style={{ flex: 1 }}
                />
                <CFormInput
                  type="text"
                  name="updateDt"
                  label="수정일"
                  value={selectedArticle.updateDt || ''}
                  onChange={handleArticleChange}
                  readOnly
                  style={{ flex: 1 }}
                />
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <CFormSelect
                  name="expireYn"
                  label="게시 종료 여부"
                  value={selectedArticle.expireYn}
                  onChange={handleArticleChange}
                  style={{ flex: 0.4 }}
                >
                  <option value="N">게시 중</option>
                  <option value="Y">게시 종료</option>
                </CFormSelect>


                <div style={{ display: 'flex', flex: 1, gap: '10px', alignItems: 'center' }}>
                  {!showDatePicker ? (
                    <>
                      <CFormInput
                        type="text"
                        name="expireDt"
                        label="게시 종료일"
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
              <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                <CFormSelect
                  name="state"
                  label="상태"
                  value={selectedArticle.state || 'other'}
                  onChange={handleArticleChange}
                  style={{ flex: 1 }}
                >
                  <option value="B">정상</option>
                  <option value="D">삭제</option>
                  <option value="other">기타</option>
                </CFormSelect>
                <CFormInput
                  type="text"
                  name="viewCnt"
                  label="조회수"
                  value={selectedArticle.viewCnt !== undefined ? selectedArticle.viewCnt : '0'}
                  onChange={handleArticleChange}
                  readOnly
                  style={{ flex: 1 }}
                />
                <CFormInput
                  type="text"
                  name="atclReplCnt"
                  label="댓글 수"
                  value={selectedArticle.atclReplCnt !== undefined ? selectedArticle.atclReplCnt : '0'}
                  onChange={handleArticleChange}
                  readOnly
                  style={{ flex: 1 }}
                />
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <label>첨부 파일:</label>
                {/** 추후 첨부파일 처리 */}
                {/*<ul>
                  {selectedArticle.files.length > 0 ? (
                    selectedArticle.files.map((file, index) => (
                      <li key={index}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          {file.fileName}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li>첨부 파일이 없습니다.</li>
                  )}
                </ul>*/}
              </div>

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
