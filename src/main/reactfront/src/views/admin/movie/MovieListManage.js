import React, {useEffect, useState} from 'react'
import {
  CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";
import axios from "axios";


function MovieListManage() {

  const [movVo, setMovVo] = useState({
    movieBeanList: [],
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


      <CTable  color="dark" striped className="mt-5">

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
    </>
  ) // return


  /** 전체 영화 리스트 조회 */
  function selectMovieList() {
    axios({
      url: '/selectMovieList',
      method: 'post',
      params: {
      }
    })
      .then(function (res) {
        debugger;
        const movieBeanList = res.data.movVo.movieBeanList;
        setMovVo({
          movieBeanList
        }); // setMovVo로 상태를 업데이트
      })
      .catch(function (err) {
        alert('(오류)');
      });
  }


}

export default MovieListManage



