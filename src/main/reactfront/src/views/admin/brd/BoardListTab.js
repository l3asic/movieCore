import {useState, useEffect} from "react";
import React from 'react';
import axios from "axios";

import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell, CCol
} from '@coreui/react'

function BoardListTab(){

  const [brdVo, setBrdVo] = useState({
    folderBeanList: [],
    boardBeanList: [],
    paging: {
      totalItems: 0, // 전체 갯수 초기값 설정
      currentPage: 0, // 현재 페이지 초기값 설정
    },
  });

  useEffect(() =>{
      selectBoardListAdmin();
    }, []
  );

  /** 게시판 리스트 조회 */
  function selectBoardListAdmin(newPage){
    if (newPage != null) { // 페이지 이동시
      brdVo.paging.currentPage = newPage;
    } else {
      brdVo.paging = { totalItems: 0, currentPage: 0 }; // 기본 paging 객체를 생성하여 할당
      newPage = 0;
    }

    axios({
      url: '/selectBoardListAdmin',
      method: 'post',
      params:{
        newPage : newPage
      }

    }).then(function (res){
      const paging = res.data.brdVo.paging;
      let boardBeanList = res.data.brdVo.boardBeanList.map(board => {
        // 'YYYY-MM-DD' 형식의 문자열을 Date 객체로 변환
        const date = new Date(board.createDt);

        // Date 객체를 '0000.00.00' 형식의 문자열로 변환
        const formattedDate = date.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\.$/, '');

        // article 객체에 새로운 속성으로 변환된 날짜를 할당
        return {
          ...board,
          createDt: formattedDate
        };
      });


      // 데이터를 상태로 설정하여 화면에 렌더링될 수 있도록 함
      setBrdVo(prevState => ({
        ...prevState,
        boardBeanList: boardBeanList,
        paging
      }));

    }).catch(function (err){
      alert("조회 실패 (오류)");
    });
  }

  return(
    <>
      <CTable hover striped>

        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">고유번호</CTableHeaderCell>
            <CTableHeaderCell scope="col">게시판 명</CTableHeaderCell>
            <CTableHeaderCell scope="col">설명</CTableHeaderCell>
            <CTableHeaderCell scope="col">생성자 명</CTableHeaderCell>
            <CTableHeaderCell scope="col">상태</CTableHeaderCell>
            <CTableHeaderCell scope="col">순서</CTableHeaderCell>
            <CTableHeaderCell scope="col">생성일</CTableHeaderCell>
            <CTableHeaderCell scope="col">공지 여부</CTableHeaderCell>
            <CTableHeaderCell scope="col">이미지 첨부</CTableHeaderCell>
            <CTableHeaderCell scope="col">파일 용량</CTableHeaderCell>
            <CTableHeaderCell scope="col">파일 갯수</CTableHeaderCell>
            <CTableHeaderCell scope="col">게시글 갯수</CTableHeaderCell>
            <CTableHeaderCell scope="col">토탈 사용 용량</CTableHeaderCell>


            <CTableHeaderCell scope="col">수정/삭제</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/*<CTableRow>*/}
          {/*  <CTableHeaderCell scope="row">1</CTableHeaderCell>*/}
          {/*  <CTableDataCell>Mark</CTableDataCell>*/}
          {/*  <CTableDataCell>Otto</CTableDataCell>*/}
          {/*  <CTableDataCell>@mdo</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시버튼</CTableDataCell>*/}
          {/*</CTableRow>*/}
          {/*<CTableRow>*/}
          {/*  <CTableHeaderCell scope="row">2</CTableHeaderCell>*/}
          {/*  <CTableDataCell>Jacob</CTableDataCell>*/}
          {/*  <CTableDataCell>Thornton</CTableDataCell>*/}
          {/*  <CTableDataCell>@fat</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시버튼</CTableDataCell>*/}
          {/*</CTableRow>*/}
          {/*<CTableRow>*/}
          {/*  <CTableHeaderCell scope="row">3</CTableHeaderCell>*/}
          {/*  <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>*/}
          {/*  <CTableDataCell>@twitter</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시값</CTableDataCell>*/}
          {/*  <CTableDataCell>임시버튼</CTableDataCell>*/}
          {/*</CTableRow>*/}

          {brdVo.boardBeanList.map((board, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="col" className="cursorDefault">{board.brdId}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{board.brdName}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{board.brdComment}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{board.memId}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{board.state}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{board.odr}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{board.createDt}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{board.noticeYn}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{board.imgUploadYn}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">임시값</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">임시값</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">임시값</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">임시값</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">수정/삭제</CTableHeaderCell>
            </CTableRow>
          ))}

        </CTableBody>

      </CTable>

    </>
  )
}

export default BoardListTab;
