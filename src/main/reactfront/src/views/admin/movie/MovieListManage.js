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
  CForm,
  CButton,
  CFormInput,
  CFormSelect,
  CBadge
} from "@coreui/react";
import axios from "axios";
import Paging from "../../uitils/Paging";
import {
  cilLoopCircular,
  cilTrash,
  cilSwapVertical,
  cilMagnifyingGlass,
  cilRecycle,
  cilMovie
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useNavigate } from "react-router-dom";
import GrayLine from "../../uitils/GrayLine";

function MovieListManage() {
  const navigate = useNavigate();

  // 영화 객체 관리
  const [movVo, setMovVo] = useState({
    movieBeanList: [],
    paging: {
      totalItems: 0, // 전체 갯수 초기값 설정
      currentPage: 0, // 현재 페이지 초기값 설정
    },
    searchBean: {
      schFilter: "",
      schText: "",
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
      <h4 className="mb-4 d-flex align-items-center">
        <CIcon icon={cilMovie} size="xl" className="me-2" style={{ fontSize: '2rem' }} />
        영화 목록 관리
      </h4>

      {/* 회색 가로줄 하나 */}
      <GrayLine marginTop="30px" marginBottom="30px" />

      {/* 상단 네비 */}
      <CNavbar colorScheme="light" className="bg-light mb-4">
        <CContainer fluid style={{ padding: 0 }}>
          <div className="d-flex align-items-center">
            {/* 복원 버튼 */}
            <CButton
              color="dark"
              variant="outline"
              className="me-2"
              style={{ whiteSpace: 'nowrap', border: '1px solid gray' }}
              title="영화 상태 정상으로 변경"
              onClick={() => updateMovieStateAdmin('restore')}
            >
              <CIcon icon={cilRecycle} />
            </CButton>

            {/* 삭제 버튼 */}
            <CButton
              color="dark"
              variant="outline"
              className="me-2"
              style={{ whiteSpace: 'nowrap', border: '1px solid gray' }}
              title="영화 상태 삭제로 변경"
              onClick={() => updateMovieStateAdmin('delete')}
            >
              <CIcon icon={cilTrash} />
            </CButton>

            {/* 토탈 갯수 */}
            <CNavbarBrand className="ms-3">Total: {movVo.paging.totalItems}</CNavbarBrand>
          </div>

          <CForm className="d-flex">
            {/* 검색조건 */}
            <CFormSelect
              className="me-2"
              options={[
                { label: '전체', value: 'all' },
                { label: '영화 고유번호', value: 'movieCd' },
                { label: '제목', value: 'movieNm' },
                { label: '대표 장르', value: 'repGenreNm' },
                { label: '상태', value: 'state' }
              ]}
              onChange={searchFilter} value={schFilter}
            />

            {/* 검색어 */}
            <CFormInput
              type="search"
              className="me-2"
              placeholder="Search"
              onChange={searchText}
              value={schText}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  searchMovieList();
                }
              }}
            />

            <CButton
              color="dark"
              variant="outline"
              className="me-2"
              style={{ whiteSpace: 'nowrap', border: '1px solid gray' }}
              onClick={searchMovieList}
            >
              <CIcon icon={cilMagnifyingGlass} />
            </CButton>

            {/* 초기화 */}
            <CButton
              color="dark"
              variant="outline"
              style={{ whiteSpace: 'nowrap', border: '1px solid gray' }}
              onClick={refreshFilterSearch}>
              <CIcon icon={cilLoopCircular} />
            </CButton>

          </CForm>

        </CContainer>
      </CNavbar>

      {/* 영화 목록 테이블 */}
      <CTable hover responsive className="shadow-sm">
        <CTableHead color="dark">
          <CTableRow>
            {/* 체크박스 */}
            <CTableHeaderCell scope="col" style={{ width: '50px' }}>
              <CFormCheck
                id="selectAllCheckBox"
                style={{cursor: "pointer"}}
                checked={selectAll}
                onChange={() => handleSelectAll()}
              />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              영화 고유번호
              <CIcon icon={cilSwapVertical} className="ms-2" style={{cursor: "pointer"}} onClick={() => sortColumn('movieCd')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              영화 제목
              <CIcon icon={cilSwapVertical} className="ms-2" style={{cursor: "pointer"}} onClick={() => sortColumn('movieNm')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              개봉년도
              <CIcon icon={cilSwapVertical} className="ms-2" style={{cursor: "pointer"}} onClick={() => sortColumn('prdtYear')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              대표 장르
              <CIcon icon={cilSwapVertical} className="ms-2" style={{cursor: "pointer"}} onClick={() => sortColumn('repGenreNm')} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              상태
              <CIcon icon={cilSwapVertical} className="ms-2" style={{cursor: "pointer"}} onClick={() => sortColumn('state')} />
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {movVo.movieBeanList.map((movie, index) => (
            <CTableRow key={index}  >
              <CTableDataCell style={{ width: '50px' }}>
                <CFormCheck
                  style={{cursor: "pointer"}}
                  checked={movie.selected || selectAll}
                  onChange={() => handleSelect(index)}
                />
              </CTableDataCell>
              <CTableDataCell>{movie.movieCd}</CTableDataCell>
              <CTableDataCell className="fw-bold text-dark" style={{cursor: "pointer"}} onClick={() => movieInfoManage(movie.movieCd)} >
                {movie.movieNm}
              </CTableDataCell>
              <CTableDataCell>{movie.prdtYear}</CTableDataCell>
              <CTableDataCell>{movie.repGenreNm}</CTableDataCell>
              <CTableDataCell>
                <CBadge color={movie.state === "B" ? "primary" : "danger"}>
                  {movie.stateText}
                </CBadge>
              </CTableDataCell>
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
        newPage: newPage,
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

  /** 체크박스 전체 선택 */
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
  function searchMovieList() {
    selectMovieListAdmin();
  }

  /** 검색, 필터 초기화 */
  function refreshFilterSearch() {
    // 검색조건 및 검색어 초기화 (강제로 즉시 초기화)
    schFilter = '';
    schText = '';

    // 남겨진 검색조건 값도 초기화
    setSchFilter('');
    setSchText('');

    // 정렬 초기화
    sortKey = '';
    sortOdr = '';

    // 초기화된 조건으로 리스트 조회
    selectMovieListAdmin();
  }

  /** 영화 상태 정상/삭제로 변경 */
  function updateMovieStateAdmin(mode) {
    // 체크된 영화 목록 필터링
    const selectedMovies = movVo.movieBeanList.filter(movie => movie.selected);

    axios({
      url: '/updateMovieStateAdmin',
      method: 'post',
      data: {
        movieBeanList: selectedMovies,
        mode: mode
      }
    })
      .then(function (res) {
        // 상태 변경 성공 시 처리
        alert(res.data.successMsg);
        // 상태 변경 후 영화 목록 다시 불러오기
        selectMovieListAdmin();
      })
      .catch(function (err) {
        // 상태 변경 실패 시 메세지
        alert(err.data.successMsg);
      });
  }

  /** 영화 상세 관리 페이지 이동 */
  function movieInfoManage(movieCd) {
    navigate('/admin/MovieInfoManage', { state: { movieCd: movieCd } });
  }
}

export default MovieListManage;
