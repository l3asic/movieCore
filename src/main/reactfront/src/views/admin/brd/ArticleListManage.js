
import React, {useEffect, useState} from 'react';
import axios from "axios";
import FolderTab from "./FolderTab";
import {CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";


function ArticleListManage(){
  return(
    <>
      <h1>
        게시글 관리 페이지 입니다
      </h1>


      <CTable  color="dark" striped>

        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">고유번호</CTableHeaderCell>
            <CTableHeaderCell scope="col">제목</CTableHeaderCell>
            <CTableHeaderCell scope="col">내용</CTableHeaderCell>
            <CTableHeaderCell scope="col">게시판 명</CTableHeaderCell>
            <CTableHeaderCell scope="col">작성자</CTableHeaderCell>
            <CTableHeaderCell scope="col">조회수</CTableHeaderCell>
            <CTableHeaderCell scope="col">작성일</CTableHeaderCell>
            <CTableHeaderCell scope="col">게시 종료일</CTableHeaderCell>
            <CTableHeaderCell scope="col">게시 종료 여부</CTableHeaderCell>
            <CTableHeaderCell scope="col">상태</CTableHeaderCell>
            <CTableHeaderCell scope="col">댓글 수</CTableHeaderCell>
            <CTableHeaderCell scope="col">수정/삭제</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>Mark</CTableDataCell>
            <CTableDataCell>Otto</CTableDataCell>
            <CTableDataCell>@mdo</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 버튼</CTableDataCell>

          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>Jacob</CTableDataCell>
            <CTableDataCell>Thornton</CTableDataCell>
            <CTableDataCell>@fat</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 버튼</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
            <CTableDataCell>@twitter</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 값</CTableDataCell>
            <CTableDataCell>임시 버튼</CTableDataCell>
          </CTableRow>
        </CTableBody>

      </CTable>
    </>

  ) // return

}


export default ArticleListManage;
