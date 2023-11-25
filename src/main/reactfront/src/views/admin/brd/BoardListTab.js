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
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>Mark</CTableDataCell>
            <CTableDataCell>Otto</CTableDataCell>
            <CTableDataCell>@mdo</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시버튼</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>Jacob</CTableDataCell>
            <CTableDataCell>Thornton</CTableDataCell>
            <CTableDataCell>@fat</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시버튼</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
            <CTableDataCell>@twitter</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시버튼</CTableDataCell>
          </CTableRow>
        </CTableBody>

      </CTable>

    </>
  )
}

export default BoardListTab;
