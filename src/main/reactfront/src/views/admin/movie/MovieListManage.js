import React, {useEffect, useState} from 'react'
import {
  CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";
import axios from "axios";
import Paging from "../../uitils/Paging";


function MovieListManage() {

  const [movVo, setMovVo] = useState({
    movieBeanList: [],
    paging:{
    },
    searchBean : {
    }
  });


  /** 전체 영화 리스트 조회 */
  useEffect(() => {
    selectMovieList();
  }, []);


  return (
    <>
      <h3>
        영화 리스트 관리 페이지입니다
      </h3>


      <CTable  color="dark" striped className="mt-5 mb-lg-5">

        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">영화 고유번호</CTableHeaderCell>
            <CTableHeaderCell scope="col">영화 제목</CTableHeaderCell>
            <CTableHeaderCell scope="col">개봉년도</CTableHeaderCell>
            <CTableHeaderCell scope="col">대표 장르</CTableHeaderCell>
            <CTableHeaderCell scope="col">상태</CTableHeaderCell>
            <CTableHeaderCell scope="col">수정/삭제</CTableHeaderCell>
          </CTableRow>
        </CTableHead>


        <CTableBody>
          {movVo.movieBeanList.map((movie, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row">{movie.movieCd}</CTableHeaderCell>
              <CTableDataCell>{movie.movieNm}</CTableDataCell>
              <CTableDataCell>{movie.prdtYear}</CTableDataCell>
              <CTableDataCell>{movie.repGenreNm}</CTableDataCell>
              <CTableDataCell>{movie.state}</CTableDataCell>
              <CTableDataCell>임시 버튼</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>

      </CTable>

      <Paging paging={movVo.paging} onPageChange={handlePageChange} />

    </>
  ) // return


  /** 전체 영화 리스트 조회 */
  function selectMovieList(newPage) {

    // 페이지 이동일시
    if(newPage != null){
      movVo.paging.currentPage = newPage;
    }else{
      movVo.paging = null;
    }



    axios({
      url: '/selectMovieList',
      method: 'post',
      data: {
        paging: movVo.paging
      }
    })
      .then(function (res) {
        const movieBeanList = res.data.movVo.movieBeanList;
        const paging = res.data.movVo.paging;
        setMovVo((prevMovVo) => ({ ...prevMovVo, movieBeanList, paging }));
      })
      .catch(function (err) {
        alert('(오류)');
      });
  }

  // 페이지 변경 시 호출되는 함수
  function handlePageChange(newPage) {
    selectMovieList(newPage);
  }


}

export default MovieListManage



