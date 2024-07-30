import React, { useEffect, useState } from 'react';
import {
  CTableBody,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
  CFormInput,
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
import GrayLine from "../../uitils/GrayLine";

const ArticleListView = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [brdVo, setBrdVo] = useState({
    boardBean: {},
    articleBeanList: [],
    boardBeanList: [],
    paging: {
      totalItems: 0, // 전체 갯수 초기값 설정
      currentPage: 0, // 현재 페이지 초기값 설정
    },
  });

  const [schSelect, setSchSelect] = useState('');
  const [schText, setSchText] = useState('');
  const [sortKey, setSortKey] = useState('createDt'); // 정렬 기준 컬럼의 초기값을 'createDt'로 설정
  const [sortOdr, setSortOdr] = useState('desc'); // 정렬 순서의 초기값을 'desc'로 설정

  useEffect(() => {
    // URL에서 brdid 값을 추출 (ex : http://localhost:3000/#/brd/ArticleListView?brdId=BB2115517422 )
    const searchParams = new URLSearchParams(location.search);
    const brdIdFromQuery = searchParams.get('brdId');

    setBrdVo(prevBrdVo => ({
      ...prevBrdVo,
      boardBean: {
        ...prevBrdVo.boardBean,
        brdId: brdIdFromQuery
      }
    }));
    // 최초 접근시 brdId 동기화 문제로 강제 할당
    brdVo.boardBean.brdId = brdIdFromQuery;

    // 게시판 조회
    selectBoardByBrdId();

    // 게시글 리스트 조회
    selectArticleList();

  }, [location]);

  useEffect(() => {
    selectArticleList();
  }, [sortKey, sortOdr]);

  const searchSelect = event => {
    setSchSelect(event.target.value);
  };

  const searchText = event => {
    setSchText(event.target.value);
  };

  // 정렬 함수
  const sortColumn = (key) => {
    if (sortKey === key) {
      // 동일한 컬럼을 클릭한 경우 정렬 순서를 변경
      setSortOdr(sortOdr === 'asc' ? 'desc' : 'asc');
    } else {
      // 다른 컬럼을 클릭한 경우 정렬 기준을 변경하고 기본 순서는 오름차순으로 설정
      setSortKey(key);
      setSortOdr('asc');
    }
  };

  /** 게시판 조회 */
  function selectBoardByBrdId() {
    axios({
      url: '/selectBoardByBrdId',
      method: 'post',
      data: {
        boardBean: brdVo.boardBean
      }

    }).then(function (res) {
      // 게시판 이름, 설명 세팅
      setBrdVo(prevState => ({
        ...prevState,
        boardBean: res.data.brdVo.boardBean
      }));

    }).catch(function (err) {
      alert("조회 실패 (오류)");
    });
  }

  /** 게시글 리스트 조회 */
  function selectArticleList(newPage = 0) {
    const currentPage = newPage !== null ? newPage : brdVo.paging.currentPage;

    axios({
      url: '/selectArticleList',
      method: 'post',
      data: {
        newPage: currentPage,
        boardBean: {
          brdId: brdVo.boardBean.brdId,
          schSelect: schSelect,
          schText: schText,
          sortKey: sortKey, // 정렬 기준 컬럼
          sortOdr: sortOdr // 정렬 순서
        },
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

      // 데이터를 상태로 설정하여 화면에 렌더링될 수 있도록 함
      setBrdVo(prevState => ({
        ...prevState,
        articleBeanList: articleBeanList,
        paging
      }));

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

  /** 검색, 필터 초기화  */
  function refreshFilterSearch() {
    // 검색조건 및 검색어 초기화 (강제로 즉시 초기화)
    setSchSelect('');
    setSchText('');

    // 정렬 초기화
    setSortKey('createDt'); // 기본값으로 재설정
    setSortOdr('desc'); // 기본값으로 재설정

    // 초기화된 조건으로 리스트 조회
    selectArticleList();
  }

  return (
    <div>
      <h4>{brdVo.boardBean.brdName}</h4>
      <p>{brdVo.boardBean.brdComment}</p>

      {/** 배너 영역 */}
      {brdVo.boardBean && brdVo.boardBean.fileBean && brdVo.boardBean.fileBean.src && (
        <div>
          <CCardImage
            orientation="top"
            src={brdVo.boardBean.fileBean.src}
            style={{ height: "200px", marginBottom: "30px" }}
          />
        </div>
      )}

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
                  selectArticleList(0);
                }
              }}
            />

            <CButton
              color="black"
              variant="outline"
              className="me-2"
              style={{ whiteSpace: "nowrap", border: "1px solid gray" }}
              onClick={() => selectArticleList(0)}
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

      <GrayLine marginBottom="10px" marginTop="10px"/>

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
            <CTableHeaderCell scope="col" style={{ paddingRight: '20px' }}>작성일
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('createDt')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ paddingRight: '20px' }}>댓글수
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('atclReplCnt')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ paddingRight: '0px' }}>조회수
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
              <CTableHeaderCell scope="col" className="cursorDefault" style={{ paddingRight: '20px' }}>{article.createDt}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault" style={{ paddingRight: '20px' }}>{article.atclReplCnt}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault" style={{ paddingRight: '0px' }}>{article.viewCnt}</CTableHeaderCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <Paging paging={brdVo.paging} onPageChange={handlePageChange} itemsPerPage={10} />
    </div>
  );
}

export default ArticleListView;
