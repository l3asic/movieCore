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

  const [brdVo, setBrdVo] = useState({
    folderBeanList: [],
    boardBeanList: [],
    paging: {
      totalItems: 0, // 전체 갯수 초기값 설정
      currentPage: 0, // 현재 페이지 초기값 설정
    },
  });

  useEffect(() =>{
      selectFolderListAdmin();
    }, []
  );

  /** 폴더 리스트 조회 */
  function selectFolderListAdmin(newPage){
    if (newPage != null) { // 페이지 이동시
      brdVo.paging.currentPage = newPage;
    } else {
      brdVo.paging = { totalItems: 0, currentPage: 0 }; // 기본 paging 객체를 생성하여 할당
      newPage = 0;
    }

    axios({
      url: '/selectFolderListAdmin',
      method: 'post',
      params:{
        newPage : newPage
      }

    }).then(function (res){
      const paging = res.data.brdVo.paging;
      let folderBeanList = res.data.brdVo.folderBeanList.map(folder => {
        // 'YYYY-MM-DD' 형식의 문자열을 Date 객체로 변환
        const date = new Date(folder.createDt);

        // Date 객체를 '0000.00.00' 형식의 문자열로 변환
        const formattedDate = date.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\.$/, '');

        // article 객체에 새로운 속성으로 변환된 날짜를 할당
        return {
          ...folder,
          createDt: formattedDate
        };
      });


      // 데이터를 상태로 설정하여 화면에 렌더링될 수 있도록 함
      setBrdVo(prevState => ({
        ...prevState,
        folderBeanList: folderBeanList,
        paging
      }));

    }).catch(function (err){
      alert("조회 실패 (오류)");
    });
  }

  return(
    <>
      <CTable  color="dark" striped>

        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">고유번호</CTableHeaderCell>
            <CTableHeaderCell scope="col">폴더 명</CTableHeaderCell>
            <CTableHeaderCell scope="col">생성자 명</CTableHeaderCell>
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
          {/*<CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>Mark</CTableDataCell>
            <CTableDataCell>Otto</CTableDataCell>
            <CTableDataCell>@mdo</CTableDataCell>
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
            <CTableDataCell>임시 버튼</CTableDataCell>
          </CTableRow>*/}

          {brdVo.folderBeanList.map((folder, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="col" className="cursorDefault">{folder.folId}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{folder.folName}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{folder.memId}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">임시값</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">임시값</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">임시값</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{folder.state}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">임시값</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">{folder.createDt}</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="cursorDefault">수정/삭제</CTableHeaderCell>
            </CTableRow>
          ))}

        </CTableBody>

      </CTable>

    </>
  )
}

export default FolderListTab;
