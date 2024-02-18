import React, {useEffect, useState} from 'react';
import {
  CCardGroup,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CForm,
  CButton, CNavbar, CContainer, CNavbarBrand
} from '@coreui/react';
import ReactImg from '../../assets/images/react.jpg';
import axios from 'axios';
import Paging from '../uitils/Paging';
import {cilLoopCircular, cilMagnifyingGlass} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const MovieList = () => {
  const cardStyle = {
    marginRight: '20px'
  };

  const [movVo, setMovVo] = useState({
    movieBeanList: [],
    paging: {
      totalItems: 0, // 전체 갯수 초기값 설정
      currentPage: 0, // 현재 페이지 초기값 설정
    },
    searchBean : {
      searchFilter : "",
      searchText : ""
    }
  });


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

  /** 전체 영화 리스트 조회 */
  useEffect(() => {
    selectMovieList();
  }, []);

  return (
    <>
      <h4 className="mb-3">영화 리스트 페이지 입니다</h4>

      {/** 상단 네비 */}
      <CNavbar colorScheme="light" className="bg-light">
        <CContainer fluid>
          <div className="d-flex align-items-center">

            {/** 토탈 갯수 */}
            <CNavbarBrand className="ms-3">Total : {movVo.paging.totalItems}</CNavbarBrand>
          </div>

          <CForm className="d-flex m-2">

            <CFormSelect
              options={[
                { label: '전체', value: 'all' },
                { label: '제목', value: 'movieNm' },
                { label: '대표 장르', value: 'repGenreNm' },
                { label: '개봉년도', value: 'openDt' },
                { label: '배우명', value: 'cast' },
                { label: '관람등급', value: 'watchGradeNm' },
                { label: '제작국가', value: 'nationNm' }
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
            <CButton color="black" variant="outline"
                     style={{ whiteSpace: 'nowrap', border: '1px solid gray' }}
              onClick={refreshFilterSearch}
            >
              <CIcon icon={cilLoopCircular} />
            </CButton>

          </CForm>


        </CContainer>
      </CNavbar>




      {movVo.movieBeanList.length > 0 && (
        <div className="mb-4">
          {movVo.movieBeanList.reduce((rows, movie, index) => {
            if (index % 3 === 0) {
              rows.push([]);
            }

            // 개봉년도 가공
            movie.openDt = changeToFullYear(movie.openDt);

            rows[rows.length - 1].push(
              <CCard key={index} movieCd={movie.movieCd} style={cardStyle}>
                <CCardImage orientation="top" src={ReactImg} style={{ height: '400px' }} />
                <CCardBody>
                  <CCardTitle>{movie.movieNm} ({movie.openDt})</CCardTitle>
                  <CCardText className="d-inline-flex">
                    <small>{movie.repGenreNm}</small>
                    <small> 제작국가 </small>
                  </CCardText>
                  <CCardText>
                    <small className="text-medium-emphasis">별점</small>
                  </CCardText>
                </CCardBody>
              </CCard>
            );
            return rows;
          }, []).map((row, rowIndex) => (
            <CCardGroup key={rowIndex} className="mb-4">
              {row}
            </CCardGroup>
          ))}
        </div>
      )}

      {/** 페이징 처리 */}
      <Paging
        paging={movVo.paging}
        onPageChange={handlePageChange}
        itemsPerPage={9}
      />


    </>
  );

  /** 전체 영화 리스트 조회 */
  function selectMovieList(newPage) {

    if (newPage != null) {  // 페이지 이동시
      movVo.paging.currentPage = newPage;

    } else {  // 최초 조회, 검색 시
      movVo.paging = { totalItems: 0, currentPage: 0 }; // 기본 paging 객체를 생성하여 할당
      newPage = 0;
    }


    axios({
      url: '/selectMovieList',
      method: 'post',
      params: {
        newPage : newPage,
        searchFilter : schFilter,
        searchText : schText
      }
    })
      .then(function (res) {
        const movieBeanList = res.data.movVo.movieBeanList;
        const paging = res.data.movVo.paging;
        setMovVo(prevState => ({
          ...prevState,
          movieBeanList: movieBeanList,
          paging: paging
        }));
      })
      .catch(function (err) {
        alert('실패 (오류)');
      });
  }


  /** 페이지 이동 */
  function handlePageChange(newPage) {
    selectMovieList(newPage);
  }


  /** openDt 를 년도로 변환 */
  function changeToFullYear(openDt){
    const dateObject = new Date(openDt);
    const year = dateObject.getFullYear();
    return year;
  }



  /** 검색 필터 세팅 */
  function changeSearch(e){
    const { value, name } = e.target;

    setMovVo((prevMovVo) => ({
      ...prevMovVo,
      searchBean: {
        ...prevMovVo.searchBean,
        [name]: value
      }
    }));

  }


  /** 검색 버튼 클릭 시 */
  function searchMovieList(){
    selectMovieList();
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
    selectMovieList();

  }








}


export default MovieList;
