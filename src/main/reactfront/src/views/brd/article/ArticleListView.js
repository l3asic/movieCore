import React, { useEffect, useState } from 'react'
import {
  CTableBody, CTable, CTableHead, CTableHeaderCell, CTableRow, CFormSelect, CFormInput, CInputGroup, CButton, CFormText
} from '@coreui/react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Paging from "../../uitils/Paging";
import CIcon from "@coreui/icons-react";
import {cilJustifyCenter, cilSwapVertical} from "@coreui/icons";

const ArticleListView = () => {

  const navigate  = useNavigate();
  const [brdVo, setBrdVo] = useState({
    brdBoardBean: {
      brdId : 'BB4265418620',
      folId : 'BF2311713518'//임의의 값 하드코딩_ 추후 수정
    },
    articleBeanList: [],
    boardBeanList: [],
    paging: {
      totalItems: 0, // 전체 갯수 초기값 설정
      currentPage: 0, // 현재 페이지 초기값 설정
    },
  });



  useEffect(() =>{
    selectArticleList();
    }, []
  );

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
  function selectArticleList(newPage){ debugger;
    if (newPage != null) { // 페이지 이동시
        brdVo.paging.currentPage = newPage;
    } else {
      brdVo.paging = { totalItems: 0, currentPage: 0 }; // 기본 paging 객체를 생성하여 할당
      newPage = 0;
    }

    axios({
      url: '/selectArticleList',
      method: 'post',
      params:{
        brdId : brdVo.brdBoardBean.brdId,
        newPage : newPage,
        schSelect : schSelect,
        schText : schText,
        sortKey: sortKey, // 정렬 기준 컬럼
        sortOdr: sortOdr // 정렬 순서
      }

    }).then(function (res){
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

      setSchSelect('');
      setSchText('');
      setSortKey(res.data.brdVo.boardBean.sortKey);
      setSortOdr(res.data.brdVo.boardBean.sortOdr);

    }).catch(function (err){
      alert("조회 실패 (오류)");
    });
  }

  // 페이지 이동
  function handlePageChange(newPage) {
    selectArticleList(newPage);
  }

  function selectArticleDetail(atclId) {
    axios({
      url: '/selectArticleDetail',
      method: 'post',
      params: {
        atclId: atclId,
        folId : brdVo.brdBoardBean.folId
      }
    })
      .then(function (res) { debugger;
       // let articleBeanList = res.data.brdVo.articleBeanList;

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
        // ArticleDetail 페이지로 이동하면서 데이터 전달
        navigate('/brd/ArticleDetail', { state: { articleData: articleBeanList } });
      })
      .catch(function (err) {
        alert('조회 실패 (오류)');
      });
  }

  // function searchArticle(){
  //   axios({
  //     url: '/searchArticle',
  //     method: 'get',
  //     params:{
  //       brdId : brdVo.brdBoardBean.brdId,
  //       schSelect : schSelect,
  //       schText : schText
  //     }
  //
  //   }).then(function (res){
  //     let searchResult = res.data.brdVo.articleBeanList.map(article => {
  //       // 'YYYY-MM-DD' 형식의 문자열을 Date 객체로 변환
  //       const date = new Date(article.createDt);
  //
  //       // Date 객체를 '0000.00.00' 형식의 문자열로 변환
  //       const formattedDate = date.toLocaleDateString('ko-KR', {
  //         year: 'numeric',
  //         month: '2-digit',
  //         day: '2-digit'
  //       }).replace(/\.$/, '');
  //
  //       // article 객체에 새로운 속성으로 변환된 날짜를 할당
  //       return {
  //         ...article,
  //         createDt: formattedDate
  //       };
  //     });
  //
  //     // 검색된 결과를 상태로 설정하여 화면에 렌더링될 수 있도록 함
  //     setBrdVo(prevState => ({
  //       ...prevState,
  //       articleBeanList: searchResult
  //     }));
  //     setSchSelect('');
  //     setSchText('');
  //     // ㅇ
  //
  //
  //   }).catch(function (err){
  //     alert("조회 실패 (오류)");
  //   });
  //
  // }

  return (
    <div>
      <h2>게시판입니다</h2>
      <div>
      <CInputGroup className="mb-3" style={{width: "30%", display: "flex", float:"right"}}>
        <CFormSelect size="sm" className="mb-3" style={{ flex: "2" }} onChange={searchSelect} value={schSelect}>
          <option value="all">전체</option>
          <option value="subject">제목</option>
          <option value="content">내용</option>
          <option value="memName">작성자</option>
        </CFormSelect>
        <CFormInput size="sm" className="mb-3" style={{ flex: "9" }} onChange={searchText} value={schText} name={schText}/>
        <CButton size="sm" className="mb-3" color="secondary" onClick={selectArticleList} name="searchBtn">검색</CButton>
      </CInputGroup>
      </div>
      <CTable className="boardTableList">
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell scope="col" >번호</CTableHeaderCell>
            <CTableHeaderCell scope="col" name="subject">제목
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('subject')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" name="memName">작성자
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('memName')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" name="createDt">작성일</CTableHeaderCell>
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('createDt')} />
            <CTableHeaderCell scope="col" name="viewCnt">조회수
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('viewCnt')} />
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {brdVo.articleBeanList.map((article, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="col">{index + 1}</CTableHeaderCell>
              <CTableHeaderCell scope="col" value={article.atclId} onClick={() => selectArticleDetail(article.atclId)}>{article.subject}</CTableHeaderCell>
              <CTableHeaderCell scope="col">{article.memName}</CTableHeaderCell>
              <CTableHeaderCell scope="col">{article.createDt}</CTableHeaderCell>
              <CTableHeaderCell scope="col">{article.viewCnt}</CTableHeaderCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <Paging paging={brdVo.paging} onPageChange={handlePageChange} itemsPerPage={10} />

    </div>
  )
}

export default ArticleListView
