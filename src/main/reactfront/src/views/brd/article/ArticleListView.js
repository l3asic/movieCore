import React, { useEffect, useState } from 'react'
import {
  CTableBody, CTable, CTableHead, CTableHeaderCell, CTableRow, CFormSelect, CFormInput, CInputGroup, CButton
} from '@coreui/react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Paging from "../../uitils/Paging";

const ArticleListView = () => {

  const navigate  = useNavigate();
  const [brdVo, setBrdVo] = useState({
    brdBoardBean: {
      brdId : 'BB4265418620',
      folId : 'BF2311713518'//임의의 값 하드코딩_ 추후 수정
    },
    articleBeanList: [],
    boardBeanList: [],
    paging: {},
  });



  useEffect(() =>{
    selectArticleList();
    }, []
  );

  const [schSelect, setSchSelect] = useState('');
  const [schText, setSchText] = useState('');

  const searchSelect = event => {
    setSchSelect(event.target.value);
  };

  const searchText = event => {
    setSchText(event.target.value);
  };

  /** 게시글 리스트 조회 */
  function selectArticleList(newPage){ debugger;
    if (newPage != null) {
      if ("searchBtn") { // "searchBtn" 버튼 클릭 여부 확인
        brdVo.paging = null; // "searchBtn" 클릭 시 brdVo.paging을 null로 설정
      } else {
        brdVo.paging.currentPage = newPage;
      }
    } else {
      brdVo.paging = null;
    }

    axios({
      url: '/selectArticleList',
      method: 'post',
      params:{
        brdId : brdVo.brdBoardBean.brdId,
        schSelect : schSelect,
        schText : schText,
        paging: brdVo.paging
      }

    }).then(function (res){
      const paging = res.data.brdVo.boardBean.paging;
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
            <CTableHeaderCell scope="col">번호</CTableHeaderCell>
            <CTableHeaderCell scope="col">제목</CTableHeaderCell>
            <CTableHeaderCell scope="col">작성자</CTableHeaderCell>
            <CTableHeaderCell scope="col">작성일</CTableHeaderCell>
            <CTableHeaderCell scope="col">조회수</CTableHeaderCell>
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
      <Paging paging={brdVo.paging} onPageChange={handlePageChange} />

    </div>
  )
}

export default ArticleListView
