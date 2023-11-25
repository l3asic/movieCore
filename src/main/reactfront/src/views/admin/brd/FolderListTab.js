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


function FolderListTab(){
  return(
    <>
      <CTable  color="dark" striped>

        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">고유번호</CTableHeaderCell>
            <CTableHeaderCell scope="col">폴더 명</CTableHeaderCell>
            <CTableHeaderCell scope="col">생성자 명</CTableHeaderCell>
            <CTableHeaderCell scope="col">상위폴더</CTableHeaderCell>
            <CTableHeaderCell scope="col">하위 폴더 갯수</CTableHeaderCell>
            <CTableHeaderCell scope="col">하위 게시판 갯수</CTableHeaderCell>
            <CTableHeaderCell scope="col">폴더 경로</CTableHeaderCell>
            <CTableHeaderCell scope="col">폴더 뎁스</CTableHeaderCell>
            <CTableHeaderCell scope="col">상태</CTableHeaderCell>
            <CTableHeaderCell scope="col">폴더 순서</CTableHeaderCell>
            <CTableHeaderCell scope="col">폴더 생성일</CTableHeaderCell>
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
  )
}

export default FolderListTab;
