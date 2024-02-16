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
  CCol, CButton
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

  /** 전체 영화 리스트 조회 */
  useEffect(() => {
    selectMovieList();
  }, []);

  return (
    <>
      <h4 className="mb-3">영화 리스트 페이지 입니다</h4>

      {/** 상단 상태 영역 */}
      <CForm className="row g-3 mb-4">
          {/*<CFormCheck inline id="inlineCheckbox1" value="option1" label="1"/>
        <CFormCheck inline id="inlineCheckbox2" value="option2" label="2"/>
        <CFormCheck inline id="inlineCheckbox3" value="option2" label="3"/>*/}

        {/*<CCol md={3}>
          <CFormSelect
                       aria-label="Default select example"
                       options={[
                         {label: '전체 년도', value: 'All'},
                         {label: '1970', value: '1970'},
                         {label: '1980', value: '1980'},
                         {label: '1990', value: '1990'},
                         {label: '2000', value: '2000'},
                         {label: '2010', value: '2010'},
                         {label: '2020', value: '2020'}
                       ]}
          />

        </CCol>

        <CCol md={3}>
          <CFormSelect
            aria-label="Default select example"
            options={[
              {label: '장르박스', value: 'All'},
              {label: '제목', value: '2'},
              {label: '제작국가', value: '3'},
              {label: '개봉일', value: '4'}
            ]}
          />
        </CCol>*/}

        <CCol md={5}>
        </CCol>


        <CCol md={2}>
          <CFormSelect
                       aria-label="Default select example"
                       options={[
                         {label: '전체', value: 'all'},
                         {label: '제목', value: 'movieNm'},
                         {label: '제작국가', value: 'nation'},
                         {label: '개봉일', value: 'openDt'}
                       ]}
                       name="searchFilter"
                       onChange={changeSearch}
          />
        </CCol>

        <CCol md={3}>
          <CFormInput
                      type="text"
                      placeholder="검색"
                      aria-label="default input example"
                      name="searchText"
                      onChange={changeSearch}
                      onKeyDown={movieSearch}
          />
        </CCol>
        <CCol md={2}>
          <CButton
            color="black"
            variant="outline"
            className="me-2"
            style={{ whiteSpace: 'nowrap', border: '1px solid gray' }}
            id="searchBtn"
          >
            <CIcon icon={cilMagnifyingGlass} />
          </CButton>
          {/* 초기화 */}
          <CButton color="black" variant="outline"
                   style={{ whiteSpace: 'nowrap', border: '1px solid gray' }}
                   >
            <CIcon icon={cilLoopCircular} />
          </CButton>
        </CCol>
      </CForm>



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
                    <p><small>{movie.repGenreNm} </small></p>
                    <p><small> 제작국가 </small></p>
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
        searchFilter : movVo.searchBean.searchFilter,
        searchText : movVo.searchBean.searchText
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



  /** 검색 시작 함수 */
  function movieSearch(e) {
    if (e.key === 'Enter') {
      selectMovieList();
    }
  }








}


export default MovieList;
