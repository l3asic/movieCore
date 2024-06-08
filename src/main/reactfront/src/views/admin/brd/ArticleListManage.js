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
} from "@coreui/react";
import {
  cilLoopCircular,
  cilTrash,
  cilSwapVertical,
  cilMagnifyingGlass,
  cilRecycle,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
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

  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    selectArticleListAdmin();
  }, []);

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
    const selectedArticles = brdVo.articleBeanList.filter((article) => article.selected).map((article) => ({
      ...article,
      createDt: article.createDt ? new Date(article.createDt.replace(/\./g, "-")).toISOString() : null, // ISO 형식으로 변환
    }));

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
          const formattedCreateDt = new Date(article.createDt).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).replace(/\.$/, "");
          const formattedExpireDt = new Date(article.expireDt).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).replace(/\.$/, "");

          return {
            ...article,
            createDt: formattedCreateDt,
            expireDt: formattedExpireDt,
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
                { label: "작성자", value: "mem_name" },
                { label: "상태", value: "state" },
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
            <CTableHeaderCell scope="col" style={{ width: "150px" }}>
              제목
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("subject")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "200px" }}>
              내용
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("content")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "120px" }}>
              게시판 명
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("brd_name")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "100px" }}>
              작성자
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("mem_name")} />
            </CTableHeaderCell>

            <CTableHeaderCell scope="col" style={{ width: "120px" }}>
              작성일
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("create_dt")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "120px" }}>
              게시 종료일
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("expire_dt")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "100px" }}>
              게시 종료 여부
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("expire_yn")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "100px" }}>
              조회수
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("view_cnt")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "100px" }}>
              댓글 수
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("atcl_repl_cnt")} />
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
              <CTableRow key={article.atclId}>
                <CTableDataCell style={{ width: "50px" }}>
                  <CFormCheck checked={article.selected || selectAll} onChange={() => handleSelect(index)} />
                </CTableDataCell>
                <CTableDataCell style={{ width: "100px" }}>{article.atclId}</CTableDataCell>
                <CTableDataCell style={{ width: "150px" }}>
                  {article.subject.length > 10 ? `${article.subject.substring(0, 10)}...` : article.subject}
                </CTableDataCell>
                <CTableDataCell style={{ width: "200px" }}>
                  {article.content.length > 10 ? `${article.content.substring(0, 10)}...` : article.content}
                </CTableDataCell>
                <CTableDataCell style={{ width: "120px" }}>{article.brdName}</CTableDataCell>
                <CTableDataCell style={{ width: "100px" }}>{article.memName}</CTableDataCell>
                <CTableDataCell style={{ width: "120px" }}>{article.createDt}</CTableDataCell>
                <CTableDataCell style={{ width: "120px" }}>
                  {article.expireDt.startsWith("2099") ? "무기한" : article.expireDt}
                </CTableDataCell>
                <CTableDataCell style={{ width: "100px" }}>
                  {article.expireYn === "N" ? "게시 중" : "게시 종료"}
                </CTableDataCell>
                <CTableDataCell style={{ width: "100px" }}>{article.viewCnt}</CTableDataCell>
                <CTableDataCell style={{ width: "100px" }}>{article.atclReplCnt}</CTableDataCell>
                <CTableDataCell style={{ width: "80px" }}>{article.stateText}</CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan={12} className="text-center">
                게시글이 없습니다.
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>

      <Paging paging={brdVo.paging} onPageChange={handlePageChange} itemsPerPage={10} />
    </>
  );
}

export default ArticleListManage;
