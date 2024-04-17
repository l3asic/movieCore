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
  CButton,
  CNavbar,
  CContainer,
  CNavbarBrand,
  CForm
} from '@coreui/react';
import ReactImg from '../../assets/images/react.jpg';
import axios from 'axios';
import { cilLoopCircular, cilMagnifyingGlass } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useNavigate } from 'react-router-dom';

const BoxOffice = () => {

  const cardStyle = {
    marginRight: '20px'
  };

  const [movVo, setMovVo] = useState({
    movieBeanList: [],
    searchBean: {
      searchFilter: "",
      searchText: ""
    }
  });

  const navigate = useNavigate();

  // 검색조건 및 검색어 관리
  let [schFilter, setSchFilter] = useState('');
  let [schText, setSchText] = useState('');

  const searchFilter = event => {
    setSchFilter(event.target.value);
  };

  const searchText = event => {
    setSchText(event.target.value);
  };

  /** 전체 영화 리스트 조회 */
  useEffect(() => {
    selectDailyBoxOfficeList();
  }, []);

  return (
    <>
      <h4>박스 오피스 페이지</h4>
      {/** 상단 네비 */}
      <CNavbar colorScheme="light" className="bg-light">
        <CContainer fluid>
          <div className="d-flex align-items-center">

            {/** 토탈 갯수 */}
            <CNavbarBrand className="ms-3">Total : {movVo.movieBeanList.length}</CNavbarBrand>
          </div>

          <CForm className="d-flex m-2">

            <CFormSelect
              style={{marginRight: '5px'}}
              options={[
                {label: '전체', value: 'all'},
                {label: '제목', value: 'movieNm'},
                {label: '대표 장르', value: 'repGenreNm'},
                {label: '개봉년도', value: 'openDt'},
                {label: '배우명', value: 'cast'},
                {label: '관람등급', value: 'watchGradeNm'},
                {label: '제작국가', value: 'nationNm'}
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
              style={{whiteSpace: 'nowrap', border: '1px solid gray'}}
              onClick={searchMovieList}
              id="searchBtn"
            >
              <CIcon icon={cilMagnifyingGlass}/>
            </CButton>


            {/* 초기화 */}
            <CButton color="black" variant="outline"
                     style={{whiteSpace: 'nowrap', border: '1px solid gray'}}
                     onClick={refreshFilterSearch}
            >
              <CIcon icon={cilLoopCircular}/>
            </CButton>

          </CForm>


        </CContainer>
      </CNavbar>

      {movVo.movieBeanList.length > 0 && (
        <div className="mb-4">
          {movVo.movieBeanList.map((movie, index) => (
            <CCard key={index}
                   moviecd={movie.movieCd}
                   style={cardStyle}
                   onClick={() => moveToMovieInfo(movie.movieCd)}
            >

              <CCardImage orientation="top"
                          src={movie.fileBean && movie.fileBean.src ? movie.fileBean.src : ReactImg}
                          style={{height: '400px'}}/>

              <CCardBody>
                {/* 개봉일 */}
                <CCardTitle>{movie.movieNm} {movie.openDtYearStr && `(${movie.openDtYearStr})`}</CCardTitle>
                <CCardText className="d-inline-flex">
                  <small>{movie.repGenreNm}</small>
                </CCardText>
                <CCardText className="text-medium-emphasis">

                  <small>{movie.nationAlt} </small>
                </CCardText>
                <CCardText>
                  <small className="text-medium-emphasis">★ {movie.pointAvg} ({movie.pointTotalCnt}) </small>
                </CCardText>
              </CCardBody>
            </CCard>
          ))}
        </div>
      )}
    </>
  );

  /** 전체 영화 리스트 조회 */
  function selectDailyBoxOfficeList() {
    axios({
      url: '/selectDailyBoxOfficeList',
      method: 'post',
      params: {
        searchFilter: schFilter,
        searchText: schText
      }
    })
      .then(function (res) {

        debugger

        for (var i = 0; i < res.data.movVo.movieBeanList.length; i++) {

          /* 개봉일 포맷 (1990.07.07 형식) */
          if (res.data.movVo.movieBeanList[i].openDt != null) {
            const openDt = new Date(res.data.movVo.movieBeanList[i].openDt);
            const openDtFullStr = openDt.getFullYear() + '.' + String(openDt.getMonth() + 1).padStart(2, '0') + '.' + String(openDt.getDate()).padStart(2, '0');
            res.data.movVo.movieBeanList[i].openDtFullStr = openDtFullStr;
            res.data.movVo.movieBeanList[i].openDtYearStr = openDt.getFullYear();
          }

          /* 제작국가 한줄 처리 */
          if (res.data.movVo.movieBeanList[i].movieNationBeanList != null) {
            res.data.movVo.movieBeanList[i].nationAlt = '';
            for (var j = 0; j < res.data.movVo.movieBeanList[i].movieNationBeanList.length; j++) {
              res.data.movVo.movieBeanList[i].nationAlt =
                res.data.movVo.movieBeanList[i].nationAlt + ' ' + res.data.movVo.movieBeanList[i].movieNationBeanList[j].korNm;
            }
          }

        }

        const movieBeanList = res.data.movVo.movieBeanList;
        setMovVo(prevState => ({
          ...prevState,
          movieBeanList: movieBeanList,
        }));
      })
      .catch(function (err) {
        alert('실패 (오류)');
      });
  }

  /** 검색 버튼 클릭 시 */
  function searchMovieList() {
    selectDailyBoxOfficeList();
  }


  /** 검색, 필터 초기화  */
  function refreshFilterSearch() {
    // 검색조건 및 검색어 초기화
    setSchFilter('');
    setSchText('');

    // 리스트 조회
    selectDailyBoxOfficeList();
  }

  /** 영화 상세정보로 이동 */
  function moveToMovieInfo(movieCd) {
    navigate('/movie/MovieInfo', {state: {movieCd}});
  }

}

export default BoxOffice;
