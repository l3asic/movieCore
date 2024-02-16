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
import {
  cilLoopCircular,
  cilTrash,
  cilSwapVertical,
  cilMagnifyingGlass
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

function MovieListManage() {

  // 영화 객체 관리
  const [movVo, setMovVo] = useState({
    movieBeanList: [],
    paging: {
      totalItems: 0, // 전체 갯수 초기값 설정
      currentPage: 0, // 현재 페이지 초기값 설정
    },
    searchBean: {
      schFilter : "",
      schText : "",
    },
  });


  // 체크박스 관리
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    selectMovieListAdmin();
  }, []);

  // 검색조건 및 검색어 관리
  let [schFilter, setSchFilter] = useState('');
  let [schText, setSchText] = useState('');
  let [sortKey, setSortKey] = useState(); // 정렬 기준 컬럼
  let [sortOdr, setSortOdr] = useState(); // 정렬


  const searchFilter = event => {
    setSchFilter(event.target.value);
  };

  const searchText = event => {
    setSchText(event.target.value);
  };


  // 정렬 함수
  const sortColumn = (key) => {
    if (sortKey === key) {
      // 동일한 컬럼을 클릭한 경우 정렬 순서를 변경
      sortOdr = (sortOdr === 'asc' ? 'desc' : 'asc');
    } else {
      // 다른 컬럼을 클릭한 경우 정렬 기준을 변경하고 기본 순서는 오름차순으로 설정
      sortKey = key;
      sortOdr = 'asc';
    }
    selectMovieListAdmin();
  };

  return (
    <>
      <h3>영화 리스트 관리 페이지입니다</h3>

      {/** 상단 네비 */}
      <CNavbar colorScheme="light" className="bg-light">
        <CContainer fluid>
          <div className="d-flex align-items-center">

            {/** 삭제 버튼 */}
            <CButton
              color="black" variant="outline"
              style={{ whiteSpace: 'nowrap', border: '1px solid gray' }}
              onClick={deleteTheMovieListAdmin}
            >
              <CIcon icon={cilTrash} />
            </CButton>

            {/** 토탈 갯수 */}
            <CNavbarBrand className="ms-3">Total : {movVo.paging.totalItems}</CNavbarBrand>
          </div>


          <CForm className="d-flex">
            <CFormSelect
              options={[
                { label: '전체', value: 'all' },
                { label: '영화 고유번호', value: 'movieCd' },
                { label: '제목', value: 'movieNm' },
                { label: '대표 장르', value: 'repGenreNm' },
                { label: '상태', value: 'state' }
              ]}
              onChange={searchFilter} value={schFilter}
            />
            <CFormInput
              type="search"
              className="me-2"
              placeholder="Search"
              onChange={searchText}
              value={schText}
              name={schText}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  searchMovieList();
                }
              }}
            />

            <CButton
              color="black"
              variant="outline"
              className="me-2"
              style={{ whiteSpace: 'nowrap', border: '1px solid gray' }}
              onClick={searchMovieList}
              id="searchBtn"
            >
              <CIcon icon={cilMagnifyingGlass} />
            </CButton>


            {/* 초기화 */}
            <CButton color="black" variant="outline" style={{ whiteSpace: 'nowrap', border: '1px solid gray' }} onClick={refreshFilterSearch}>
              <CIcon icon={cilLoopCircular} />
            </CButton>

          </CForm>

        </CContainer>
      </CNavbar>



      {/** 영화 목록 테이블 */}
      <CTable color="dark" striped className="mt-3 mb-lg-5">
        <CTableHead>
          <CTableRow>
            {/* 체크박스 */}
            <CTableHeaderCell scope="col" style={{ width: '50px' }}>
              <CFormCheck
                id="selectAllCheckBox"
                checked={selectAll}
                onChange={() => handleSelectAll()}
              />
            </CTableHeaderCell>


            <CTableHeaderCell scope="col" name="movieCd">
              영화 고유번호
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('movieCd')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" name="movieNm">
              영화 제목
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('movieNm')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" name="prdtYear">
              개봉년도
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('prdtYear')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" name="repGenreNm">
              대표 장르
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('repGenreNm')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" name="state">
              상태
              {/* 정렬을 위한 화살표 아이콘 */}
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn('state')} />
            </CTableHeaderCell>



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

      <Paging
        paging={movVo.paging}
        onPageChange={handlePageChange}
        itemsPerPage={10}
      />

    </>
  );


  /** 영화 리스트 조회 */
  function selectMovieListAdmin(newPage) {
    if (newPage != null) {  // 페이지 이동시
      movVo.paging.currentPage = newPage;

    } else {  // 최초 조회, 검색 시
      movVo.paging = { totalItems: 0, currentPage: 0 }; // 기본 paging 객체를 생성하여 할당
      newPage = 0;
    }

    axios({
      url: '/selectMovieListAdmin',
      method: 'post',
      params: {
        newPage : newPage,
        searchFilter: schFilter,
        searchText: schText,
        sortKey: sortKey, // 정렬 기준 컬럼
        sortOdr: sortOdr // 정렬 순서
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
        setSortKey(res.data.movVo.sortKey);
        setSortOdr(res.data.movVo.sortOdr);

      })
      .catch(function (err) {
        alert('(오류)');
      });
  }


  /** 페이지 이동 */
  function handlePageChange(newPage) {
    selectMovieListAdmin(newPage);
  }


  /** 체크박스 전체 선택*/
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


  /** 검색 버튼 클릭 시 */
  function searchMovieList(){
    selectMovieListAdmin();
  }


  /** 검색, 필터 초기화  */
  function refreshFilterSearch(){

    // 검색조건 및 검색어 초기화 (useState 미사용으로 강제로 즉시 초기화)
    schFilter = '';
    schText = '';

    // 정렬 초기화
    sortKey = '';
    sortOdr = '';

    // 초기화된 조건으로 리스트 조회
    selectMovieListAdmin();

  }


  /** 영화 삭제 상태로 변경 */
  function deleteTheMovieListAdmin(){

    // 체크된 영화 목록 필터링
    const selectedMovies = movVo.movieBeanList.filter(movie => movie.selected);

    axios({
      url: '/deleteMovieListAdmin',
      method: 'post',
      data: {
        movieBeanList: selectedMovies
      }
    })
      .then(function (res) {
        // 삭제 성공 시 처리
        alert(res.data.successMsg);
        // 삭제 후 영화 목록 다시 불러오기
        selectMovieListAdmin();
      })
      .catch(function (err) {
        // 삭제 실패 시 메세지
        alert(err.data.successMsg);
      });

  }


}

export default MovieListManage;
