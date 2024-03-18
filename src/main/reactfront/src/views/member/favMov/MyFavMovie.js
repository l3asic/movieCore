import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardGroup, CCardImage, CCardText, CCardTitle,
  CCol,
  CContainer,
  CForm,
  CFormInput, CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilAddressBook,
  cilArrowCircleLeft,
  cilGroup,
  cilLockLocked,
  cilRoom,
  cilUser
} from '@coreui/icons'
import axios from "axios";
import ReactImg from "../../../assets/images/react.jpg";
import heartIcon from '../../../assets/brand/heartIcon.png';
import fillHeartIcon from '../../../assets/brand/fillHeartIcon.png';

const MyFavMovie = () => {

  const navigate  = useNavigate();

  const [memberInfo, setMemberInfo] = useState(JSON.parse(localStorage.getItem('memberBean')));

  // 영화 객체 관리
  const [movVo, setMovVo] = useState({});


  useEffect(() => {
    /** 찜한 영화 리스트 조회 */
    selectMyFavMovList();

  }, []);


  return (

    <>
      <h5 style={{marginBottom : "20px"}}>내가 찜한 영화 페이지</h5>

      {/* 회색 가로줄 하나 */}
      <div className="header-divider"
           style={{borderTop: '1px solid #ccc', marginTop: '50px', marginBottom: '50px'}}></div>

      <div>
        {movVo.movieBeanList && movVo.movieBeanList.map((movie, index) => (
          <CCard key={movie.movieCd} className="mb-3" style={{ maxWidth: '1000px' }}>
            <CRow className="g-0">

              <CCol md={3}>
                <CCardImage
                  style={{ width: '150px', height: '200px', margin: '20px' }}
                  src={movie.fileBean && movie.fileBean.src ? movie.fileBean.src : ReactImg}
                />
              </CCol>

              <CCol
                md={4}
                onClick={() => movToMovieInfo(movie.movieCd)}
              >
                <CCardBody style={{ margin: '20px' }}>
                  <CCardTitle style={{ marginBottom: '20px' }}>{movie.movieNm} {movie.openDtYearStr && `(${movie.openDtYearStr})`}</CCardTitle>
                  <CCardText>{movie.repGenreNm}</CCardText>
                  <CCardText>{movie.nationAlt}</CCardText>
                  <CCardText><small className="text-body-secondary">{`★ ${movie.pointAvg} (${movie.pointTotalCnt})`}</small></CCardText>
                </CCardBody>
              </CCol>

              <CCol
                className="text-end"
                md={4}
                style={{ margin: '20px'}}
              >
                {/* 찜 : 하트 아이콘 */}
                <img
                  src={movie.fav ? fillHeartIcon : heartIcon} // 상태에 따라 아이콘 변경
                  alt="Heart Icon"
                  style={{ width: '40px', height: '40px'}}
                  onClick={() => handleHeartClick(movie.movieCd, index)}
                />

                {movie.moviePersonalMoviePoint.point && (
                  <CCardText style={{marginTop: "70px"}}>
                    <CBadge style={{marginRight: "10px"}} color="warning">★ ({movie.moviePersonalMoviePoint.point})</CBadge>
                    {movie.moviePersonalMoviePoint.repl}
                  </CCardText>
                )}
              </CCol>
            </CRow>
          </CCard>
        ))}
      </div>




    </>
  )



  /** 내가 찜한 영화 리스트 조회 */
  function selectMyFavMovList(){
    axios({
      url: '/selectMyFavMovList',
      method: 'post',
      data: {
        memberBean : {
          memId : memberInfo.memId
        }

      }
    })
      .then(function (res) {

        for (var i = 0; i < res.data.movVo.movieBeanList.length; i++) {

          /* 개봉일 포맷 (1990.07.07 형식) */
          if(res.data.movVo.movieBeanList[i].openDt != null){
            const openDt = new Date(res.data.movVo.movieBeanList[i].openDt);
            const openDtFullStr =  openDt.getFullYear() + '.' + String(openDt.getMonth() + 1).padStart(2, '0') + '.' + String(openDt.getDate()).padStart(2, '0'); ;
            res.data.movVo.movieBeanList[i].openDtFullStr = openDtFullStr;
            res.data.movVo.movieBeanList[i].openDtYearStr = openDt.getFullYear();
          }

          /* 제작국가 한줄 처리 */
          if(res.data.movVo.movieBeanList[i].movieNationBeanList != null){
            res.data.movVo.movieBeanList[i].nationAlt = '';
            for (var j = 0; j < res.data.movVo.movieBeanList[i].movieNationBeanList.length; j++) {
              res.data.movVo.movieBeanList[i].nationAlt =
                res.data.movVo.movieBeanList[i].nationAlt + ' ' + res.data.movVo.movieBeanList[i].movieNationBeanList[j].korNm;
            }
          }

          /* 찜하기 상태 초기화 */
          res.data.movVo.movieBeanList[i].fav = true;

        }


        const movieBeanList = res.data.movVo.movieBeanList;
        setMovVo(prevState => ({
          ...prevState,
          movieBeanList: movieBeanList
        }));


      })
      .catch(function (err) {

      });
  }



  /** 영화 상세보기 페이지로 이동  */
  function movToMovieInfo(movieCd){
    navigate('/movie/MovieInfo', { state: { movieCd } });
  }


  /** 영화 찜하기 on/off */
  function handleHeartClick(movieCd, index) {
    // 아이콘 변경, 모드 세팅
    var mode = "";
    const updatedMovieBeanList = [...movVo.movieBeanList];

    if(updatedMovieBeanList[index].fav){  // 하트가 채워져 있는 경우 (찜해제하기)
      mode = "delete";
    }else{// 하트를 비워져 있는 경우 (찜하기)
      mode = "add";
    }

    updatedMovieBeanList[index].fav = !updatedMovieBeanList[index].fav;
    setMovVo(prevState => ({
      ...prevState,
      movieBeanList: updatedMovieBeanList
    }));

    // 찜하기 등록/삭제 처리
    axios({
      url: '/updateMovieFavorite',
      method: 'post',
      data: {
        movieBean: updatedMovieBeanList[index],
        memberBean: memberInfo,
        mode : mode

      }
    })
      .then(function (res) {

      })
      .catch(function (err) {

      });



  }







}




export default MyFavMovie
