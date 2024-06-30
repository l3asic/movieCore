import React, { useEffect, useState } from 'react';
import {
  CTableBody,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
  CFormInput,
  CInputGroup,
  CButton,
  CCardImage,
  CContainer,
  CForm,
  CNavbar,
  CNavbarBrand
} from '@coreui/react';
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import Paging from "../../uitils/Paging";
import { cilLoopCircular, cilSwapVertical, cilMagnifyingGlass } from "@coreui/icons";
import ReactImg from '../../../assets/images/react.jpg';
import GrayLine from "../../uitils/GrayLine";

const ArticleListView = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [brdVo, setBrdVo] = useState({
    brdBoardBean: {},
    articleBeanList: [],
    boardBeanList: [],
    paging: {
      totalItems: 0, // 전체 갯수 초기값 설정
      currentPage: 0, // 현재 페이지 초기값 설정
    },
  });

  useEffect(() => {
    // URL에서 brdid 값을 추출 (ex : http://localhost:3000/#/brd/ArticleListView?brdId=BB2115517422 )
    const searchParams = new URLSearchParams(location.search);
    const brdIdFromQuery = searchParams.get('brdId');

    setBrdVo(prevBrdVo => ({
      ...prevBrdVo,
      brdBoardBean: {
        ...prevBrdVo.brdBoardBean,
        brdId: brdIdFromQuery
      }
    }));
    // 최초 접근시 brdId 동기화 문제로 강제 할당
    brdVo.brdBoardBean.brdId = brdIdFromQuery;

    selectArticleList();

  }, [location]);



  let [schSelect, setSchSelect] = useState('');
  let [schText, setSchText] = useState('');
  let [sortKey, setSortKey] = useState(); // 정렬 기준 컬럼
  let [sortOdr, setSortOdr] = useState(); // 정렬

  const searchSelect = event => {
    setSchSelect(event.target.value);
  };

  const searchText = event => {
    setSchText(event.target.value);
  };

  //정렬 함수
  const sortColumn = (key) => {
    if (sortKey === key) {
      // 동일한 컬럼을 클릭한 경우 정렬 순서를 변경
      sortOdr = (sortOdr === 'asc' ? 'desc' : 'asc');
    } else {
      // 다른 컬럼을 클릭한 경우 정렬 기준을 변경하고 기본 순서는 오름차순으로 설정
      sortKey = key;
      sortOdr = 'asc';
    }
    selectArticleList();
  };

  /** 게시글 리스트 조회 */
  function selectArticleList(newPage) {
    if (newPage != null) { // 페이지 이동시
      brdVo.paging.currentPage = newPage;
    } else {
      brdVo.paging = { totalItems: 0, currentPage: 0 }; // 기본 paging 객체를 생성하여 할당
      newPage = 0;
    }

    axios({
      url: '/selectArticleList',
      method: 'post',
      params: {
        brdId: brdVo.brdBoardBean.brdId,
        newPage: newPage,
        schSelect: schSelect,
        schText: schText,
        sortKey: sortKey, // 정렬 기준 컬럼
        sortOdr: sortOdr // 정렬 순서
      }

    }).then(function (res) {
      const paging = res.data.brdVo.paging;
      let articleBeanList = res.data.brdVo.articleBeanList.map(article => {
        // 'YYYY-MM-DD' 형식의 문자열을 Date 객체로 변환
        const date = new Date(article.createDt);

        // Date 객체를 '0000.00.00' 형식의 문자열로 변환
        const formattedDate = date.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\.$/, '');

        // article 객체에 새로운 속성으로 변환된 날짜를 할당
        return {
          ...article,
          createDt: formattedDate
        };
      });

      // 게시판 이름, 설명을 한 번만 추출하여 설정
      let brdName = '';
      let brdComment = '';
      if (articleBeanList.length > 0) {
        brdName = articleBeanList[0].brdName;
        brdComment = articleBeanList[0].brdComment;
      }

      // 데이터를 상태로 설정하여 화면에 렌더링될 수 있도록 함
      setBrdVo(prevState => ({
        ...prevState,
        articleBeanList: articleBeanList,
        paging,
        brdBoardBean: {
          brdName: brdName,
          brdComment: brdComment
        }
      }));

      setSortKey(res.data.brdVo.boardBean.sortKey);
      setSortOdr(res.data.brdVo.boardBean.sortOdr);

    }).catch(function (err) {
      alert("조회 실패 (오류)");
    });
  }

  // 페이지 이동
  function handlePageChange(newPage) {
    selectArticleList(newPage);
  }

  function selectArticleDetail(atclId) {
    navigate('/brd/ArticleDetail', { state: { atclId } });
  }

  function searchArticle() {
    axios({
      url: '/searchArticle',
      method: 'get',
      params: {
        brdId: brdVo.brdBoardBean.brdId,
        schSelect: schSelect,
        schText: schText
      }

    }).then(function (res) {
      let searchResult = res.data.brdVo.articleBeanList.map(article => {
        // 'YYYY-MM-DD' 형식의 문자열을 Date 객체로 변환
        const date = new Date(article.createDt);

        // Date 객체를 '0000.00.00' 형식의 문자열로 변환
        const formattedDate = date.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\.$/, '');

        // article 객체에 새로운 속성으로 변환된 날짜를 할당
        return {
          ...article,
          createDt: formattedDate
        };
      });

      // 검색된 결과를 상태로 설정하여 화면에 렌더링될 수 있도록 함
      setBrdVo(prevState => ({
        ...prevState,
        articleBeanList: searchResult
      }));
      setSchSelect('');
      setSchText('');

    }).catch(function (err) {
      alert("조회 실패 (오류)");
    });

  }

  /** 검색, 필터 초기화  */
  function refreshFilterSearch() {

    // 검색조건 및 검색어 초기화 (강제로 즉시 초기화)
    schSelect = '';
    schText = '';

    // 남겨진 검색조건 값도 초기화
    setSchSelect('');
    setSchText('');

    // 정렬 초기화
    sortKey = '';
    sortOdr = '';

    // 초기화된 조건으로 리스트 조회
    selectArticleList();

  }

  return (
    <div>
      <h4>{brdVo.brdBoardBean.brdName}</h4>
      <p>{brdVo.brdBoardBean.brdComment}</p>

      {/** 배너 영역 */}
      <div>
        <CCardImage orientation="top" src={ReactImg} style={{ height: "200px", marginBottom: "30px" }} />
      </div>
      <GrayLine marginBottom="10px" marginTop="10px"/>

      <CNavbar colorScheme="light" className="bg-light">
        <CContainer fluid style={{ padding: 0 }}>
          <CNavbarBrand className="ms-3">
          </CNavbarBrand>

          <CForm className="d-flex">
            <CFormSelect
              style={{ marginRight: "5px" }}
              onChange={searchSelect}
              value={schSelect}
            >
              <option value="all">전체</option>
              <option value="subject">제목</option>
              <option value="content">내용</option>
              <option value="memName">작성자</option>
            </CFormSelect>

            <CFormInput
              type="search"
              className="me-2 ms-1"
              style={{
                width : "200px"
              }}
              placeholder="검색어를 입력하세요"
              onChange={searchText}
              value={schText}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  searchArticle();
                }
              }}
            />

            <CButton
              color="black"
              variant="outline"
              className="me-2"
              style={{ whiteSpace: "nowrap", border: "1px solid gray" }}
              onClick={searchArticle}
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

      <CTable className="boardTableList">
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell scope="col">번호</CTableHeaderCell>
            <CTableHeaderCell scope="col">제목
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('subject')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">작성자
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('memName')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">작성일
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('createDt')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">조회수
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('viewCnt')} />
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {brdVo.articleBeanList.map((article, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="col" className="cursorDefault">{index + 1}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorPoint" value={article.atclId} onClick={() => selectArticleDetail(article.atclId)}>{article.subject}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{article.memName}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{article.createDt}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{article.viewCnt}</CTableHeaderCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <Paging paging={brdVo.paging} onPageChange={handlePageChange} itemsPerPage={10} />
    </div>
  )
}

export default ArticleListView;
