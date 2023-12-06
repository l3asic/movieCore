import React, {useEffect, useState} from 'react'
import {
  CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";
import axios from "axios";


function MovieListManage() {


  return (
    <>
      <h3>
        영화 리스트 관리 페이지입니다
      </h3>


      <CTable  color="dark" striped className="mt-5">

        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">영화 고유번호</CTableHeaderCell>
            <CTableHeaderCell scope="col">영화 제목</CTableHeaderCell>
            <CTableHeaderCell scope="col">개봉년도</CTableHeaderCell>
            <CTableHeaderCell scope="col">대표 장르</CTableHeaderCell>
            <CTableHeaderCell scope="col">수정/삭제</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>Mark</CTableDataCell>
            <CTableDataCell>Otto</CTableDataCell>
            <CTableDataCell>@mdo</CTableDataCell>
            <CTableDataCell>임시 버튼</CTableDataCell>

          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>Jacob</CTableDataCell>
            <CTableDataCell>Thornton</CTableDataCell>
            <CTableDataCell>@fat</CTableDataCell>
            <CTableDataCell>임시 버튼</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell >Larry the Bird</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시값</CTableDataCell>
            <CTableDataCell>임시 버튼</CTableDataCell>
          </CTableRow>
        </CTableBody>

      </CTable>
    </>
  )
}

export default MovieListManage



