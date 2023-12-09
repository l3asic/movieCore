import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormCheck,
  CNavbar,
  CContainer,
  CNavbarBrand,
  CForm, CButton,  CFormInput, CFormSelect
} from "@coreui/react";
import axios from "axios";
import Paging from "../../uitils/Paging";

function MovieListManage() {

  // 영화 객체 관리
  const [movVo, setMovVo] = useState({
    movieBeanList: [],
    paging: {},
    searchBean: {},
  });


  // 체크박스 관리
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    selectMovieList();
  }, []);

  return (
    <>
      <h3>영화 리스트 관리 페이지입니다</h3>

      {/** 상단 네비 */}
      <CNavbar colorScheme="light" className="bg-light">
        <CContainer fluid>
          <CNavbarBrand href="#">Total : {movVo.paging.totalItems}</CNavbarBrand>
          <CForm className="d-flex">
            <CFormSelect
              options={[
                { label: '전체', value: 'all' },
                { label: '영화 고유번호', value: 'movieCd' },
                { label: '제목', value: 'movieNm' },
                { label: '대표 장르', value: 'repGenreNm' },
                { label: '상태', value: 'state' }
              ]}
            />
            <CFormInput type="search" className="me-2" placeholder="Search" />
            <CButton type="submit" color="success" variant="outline" className="me-2" style={{ whiteSpace: 'nowrap' }}>
              검색
            </CButton>
            <CButton color="danger" variant="outline" style={{ whiteSpace: 'nowrap' }}>
              삭제
            </CButton>
          </CForm>
        </CContainer>
      </CNavbar>



      {/** 영화 목록 테이블 */}
      <CTable color="dark" striped className="mt-3 mb-lg-5">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col" style={{ width: '50px' }}>
              <CFormCheck
                id="selectAllCheckBox"
                checked={selectAll}
                onChange={() => handleSelectAll()}
              />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">영화 고유번호</CTableHeaderCell>
            <CTableHeaderCell scope="col">영화 제목</CTableHeaderCell>
            <CTableHeaderCell scope="col">개봉년도</CTableHeaderCell>
            <CTableHeaderCell scope="col">대표 장르</CTableHeaderCell>
            <CTableHeaderCell scope="col">상태</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {movVo.movieBeanList.map((movie, index) => (
            <CTableRow key={index}>
              <CTableDataCell style={{ width: '50px' }}>
                <CFormCheck
                  checked={movie.selected || selectAll}
                  onChange={() => handleSelect(index)}
                />
              </CTableDataCell>
              <CTableDataCell>{movie.movieCd}</CTableDataCell>
              <CTableDataCell>{movie.movieNm}</CTableDataCell>
              <CTableDataCell>{movie.prdtYear}</CTableDataCell>
              <CTableDataCell>{movie.repGenreNm}</CTableDataCell>
              <CTableDataCell state={movie.state}>{movie.stateText}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <Paging paging={movVo.paging} onPageChange={handlePageChange} />
    </>
  );

  function selectMovieList(newPage) {
    if (newPage != null) {
      movVo.paging.currentPage = newPage;
    } else {
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

        for (var i = 0; i < movieBeanList.length; i++) {
          if (movieBeanList[i].state === "B") {
            movieBeanList[i].stateText = "정상";
          } else if (movieBeanList[i].state === "D") {
            movieBeanList[i].stateText = "삭제";
          }

          movieBeanList[i].selected = false; // 선택 속성 초기화
        }

        setMovVo((prevMovVo) => ({ ...prevMovVo, movieBeanList, paging }));
      })
      .catch(function (err) {
        alert('(오류)');
      });
  }

  // 페이지 이동
  function handlePageChange(newPage) {
    selectMovieList(newPage);
  }

  // 체크박스 전체 선택
  function handleSelectAll() {
    setSelectAll((prev) => !prev);
    const updatedList = [...movVo.movieBeanList];
    updatedList.forEach((movie) => (movie.selected = !selectAll));
    setMovVo((prevMovVo) => ({ ...prevMovVo, movieBeanList: updatedList }));
  }

  function handleSelect(index) {
    const updatedList = [...movVo.movieBeanList];
    updatedList[index].selected = !updatedList[index].selected;
    setMovVo((prevMovVo) => ({ ...prevMovVo, movieBeanList: updatedList }));
    setSelectAll(updatedList.every((movie) => movie.selected));
  }
}

export default MovieListManage;
