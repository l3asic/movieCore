import React, { useEffect, useState } from 'react'
import {
  CTableBody, CTable, CTableHead, CTableHeaderCell, CTableRow
} from '@coreui/react'
import axios from "axios";

const ArticleListView = () => {
  const [brdVo, setBrdVo] = useState({
    brdBoardBean: {},
    articleBeanList: [],
  });

  brdVo.BrdBoardBean = 'BB2115517422'; //임의의 값 하드코딩_ 추후 수정


  useEffect(() =>{
    selectArticleList();
    }, []
  );

  /** 게시글 리스트 조회 */
  function selectArticleList(){

    axios({
      url: '/selectArticleList',
      method: 'post',
      params:{
        brdId : brdVo.BrdBoardBean
      }

    }).then(function (res){

      let articleBeanList = res.data.brdVo.articleBeanList;

      // 데이터를 상태로 설정하여 화면에 렌더링될 수 있도록 함
      setBrdVo(prevState => ({
        ...prevState,
        articleBeanList: articleBeanList
      }));

    }).catch(function (err){
      alert("조회 실패 (오류)");
    });
  }

  return (
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
              <CTableHeaderCell scope="col">{index+1}</CTableHeaderCell>
              <CTableHeaderCell scope="col">{article.subject}</CTableHeaderCell>
              <CTableHeaderCell scope="col">{article.memName}</CTableHeaderCell>
              <CTableHeaderCell scope="col">33</CTableHeaderCell>
              <CTableHeaderCell scope="col">44</CTableHeaderCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
  )
}

export default ArticleListView
