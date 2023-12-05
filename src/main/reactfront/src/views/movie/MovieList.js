import React, { useEffect, useState } from 'react'
import axios from "axios";

import {
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle
} from '@coreui/react';

import ReactImg from "../../assets/images/react.jpg"

function MovieList(){

  const [movVo, setMovVo] = useState({
    movieBeanList:[]
  });


  /** 전체 영화 리스트 조회 */
  useEffect(() => {
    selectAllMovieList();
  }, [])



  return(
    <>
      <h3>영화 리스트 페이지 입니다</h3>

      {/** 첫번째 줄 (3개 아이템)  */}

      <CRow className="mt-5">
        <CCol sm="4">
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>텍스트</CCardText>
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="4">
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>텍스트</CCardText>
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="4">
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>텍스트</CCardText>
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      {/** 두번쨰 줄 */}
      <CRow className="mt-5">
        <CCol sm="4">
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>텍스트</CCardText>
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="4">
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>텍스트</CCardText>
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="4">
          <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={ReactImg} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>텍스트</CCardText>
              <CButton href="#">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


    </>

  ) // return




  /** 모든 영화 리스트 조회 */
  function selectAllMovieList(){
    axios({
      url: '/selectAllMovieList',
      method: 'post',
      params:{
      }

    }).then(function (res){
      // const fetchedFolderBeanList = res.data.brdVo.folderBeanList;
      //
      // /* 폴더/게시판 기본값 세팅 */
      // // 상태에 folderBeanList 설정
      // setBrdVo((prevBrdVo) => ({
      //   ...prevBrdVo,
      //   folderBeanList: fetchedFolderBeanList,
      // }));
      //
      // // 검색된 데이터에 폴더가 있는지 확인
      // if (fetchedFolderBeanList.length > 0) {
      //   const defaultFolder = fetchedFolderBeanList[0];
      //   setSelectedFolder(defaultFolder.folId);
      //
      //   // 기본 폴더를 기반으로 게시판 옵션 설정
      //   const newBoardOptions = defaultFolder.boardBeanList.map((board) => ({
      //     label: board.brdName,
      //     value: board.brdId,
      //   }));
      //   setBoardOptions(newBoardOptions);
      //
      //   // 기본 폴더를 기반으로 선택된 게시판 설정
      //   setSelectedBoard(newBoardOptions.length > 0 ? newBoardOptions[0].value : null);
      // }

    }).catch(function (err){
      alert("등록 실패 (오류)");
    });

  }






}

export default MovieList
