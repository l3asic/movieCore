import React, { useEffect, useRef, useState } from 'react';
import {
  CBadge,
  CCardText,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CButton,
  CRow,
  CCol
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GrayLine from "../uitils/GrayLine";
import DatePicker from 'react-datepicker';
import Slider from 'react-slick';
import 'react-datepicker/dist/react-datepicker.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../cstmCss/Dashboard.css';
import { cilCommentBubble, cilMovie } from "@coreui/icons";
import CIcon from '@coreui/icons-react';

const Dashboard = () => {
  const [movVo, setMovVo] = useState({
    movieBoxOfficeBeanList: [],
    currentPage: 1
  });

  const [brdVo, setBrdVo] = useState({
    articleBeanList: []
  });

  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)));
  const navigate = useNavigate();


  useEffect(() => {
    selectDailyBoxOfficeList();
    selectHotArticle();
  }, [startDate]);


  // 랜덤 색상을 생성하는 함수 추가
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // 게시판 이름과 색상 매핑을 저장할 빈 객체 초기화
  const colorMap = useRef({});

  const getBadgeColor = (boardName, noticeYn) => {
    if (noticeYn === 'Y') {
      return '#e55556';
    }

    // 아직 색상이 할당되지 않은 경우 새로운 색상을 생성하고 저장
    if (!colorMap.current[boardName]) {
      colorMap.current[boardName] = generateRandomColor();
    }
    // 게시판 이름에 대한 기존 색상 반환
    return colorMap.current[boardName];
  };



  const selectDailyBoxOfficeList = async () => {
    const formattedDate = formatDate(startDate);
    try {
      const response = await axios.post('/selectBoxOfficeList', {
        showRange: formattedDate,
        boxOfficeType : "DAILY"
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const movies = response.data.movVo.movieBoxOfficeBeanList || [];
      setMovVo(prevState => ({
        ...prevState,
        movieBoxOfficeBeanList: movies,
      }));
    } catch (err) {
      setMovVo(prevState => ({
        ...prevState,
        movieBoxOfficeBeanList: [],
      }));
    }
  };

  const selectHotArticle = async () => {
    try {
      const response = await axios.post('/selectHotArticle', {}, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const articles = response.data.brdVo.articleBeanList || [];
      setBrdVo(prevState => ({
        ...prevState,
        articleBeanList: articles,
      }));
    } catch (err) {
      setBrdVo(prevState => ({
        ...prevState,
        articleBeanList: [],
      }));
    }
  };

  const formatDate = (date) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
  };

  const moveToMovieInfo = (movieCd) => {
    navigate(`/movie/MovieInfo`, { state: { movieCd } });
  };

  const moveToPost = (atclId) => {
    navigate(`/brd/ArticleDetail`, { state: { atclId } });
  };

  const moveToBoard = (brdId) => {
    navigate(`/brd/ArticleListView?brdId=${brdId}`);
  };

  const moveToBoxOffice = () => {
    navigate(`/movie/BoxOffice`);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      {/** 박스오피스 영역 */}
      <CRow className="align-items-center mt-3">
        <CCol>
          <h4 className="box-office-header">
            <CIcon icon={cilMovie} size="xl" className="me-2 text-black" />
            일일 박스 오피스
          </h4>
        </CCol>
        <CCol className="text-end">
          <CButton color="link" className="p-0 text-muted cursor-pointer" onClick={moveToBoxOffice}>+ 더보기</CButton>
        </CCol>
      </CRow>

      <Slider {...settings}>
        {movVo.movieBoxOfficeBeanList.map((movie, index) => (
          <div key={index} className="movie-card cursor-pointer" onClick={() => moveToMovieInfo(movie.movieCd)}>
            <CCard className="movie-card-content cursorPoint" >
              {movie.rankOldAndNew !== "OLD" && (
                <div className="position-relative">
                  <CBadge color="danger" className="movie-badge position-absolute top-0 start-0" shape="rounded-pill">
                    {movie.rankOldAndNew} <span className="visually-hidden">unread messages</span>
                  </CBadge>
                </div>
              )}
              <CCardImage
                orientation="top"
                src={movie.fileBean && movie.fileBean.src ? movie.fileBean.src : 'default-movie.jpg'}
                alt={movie.movieNm}
                className="movie-image"
              />
              <CCardBody>
                <CCardTitle className="movie-title">{movie.movieNm}</CCardTitle>
                <CCardText className="movie-genre">{movie.repGenreNm}</CCardText>
                <CCardText className="movie-rating">
                  <small className="text-medium-emphasis">★ {movie.movieBean.pointAvg} ({movie.movieBean.pointTotalCnt})</small>
                </CCardText>
              </CCardBody>
            </CCard>
          </div>
        ))}
      </Slider>

      <GrayLine marginTop="20px" marginBottom="40px" />

      {/** 게시판 영역 */}
      <CRow className="align-items-center">
        <CCol>
          <h4 className="box-office-header mb-3">
            <CIcon icon={cilCommentBubble} size="xl" className="me-2 text-danger"  />
            지금 핫한 게시글
          </h4>
        </CCol>
      </CRow>
      <CListGroup className="hot-posts-list">
        {brdVo.articleBeanList.map((post, index) => (
          <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <strong className="me-2">{index + 1}</strong>
              {post.noticeYn === 'Y' && (
                <CBadge color="danger" className="me-2">
                  공지
                </CBadge>
              )}
              <div onClick={() => moveToPost(post.atclId)} className="post-title cursor-pointer" style={{ marginLeft: post.noticeYn === 'Y' ? '5px' : '0' }}>
                {post.subject} <span className="text-danger" style={{ color: '#ff6666' }}>({post.atclReplCnt})</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <CBadge style={{ backgroundColor: getBadgeColor(post.brdName, post.noticeYn), color: 'white' }} className="me-2 cursor-pointer" onClick={() => moveToBoard(post.brdId)}>
                {post.brdName}
              </CBadge>
              <CBadge color="dark" shape="rounded-pill">
                {post.viewCnt} views
              </CBadge>
            </div>
          </CListGroupItem>
        ))}
      </CListGroup>

      <GrayLine marginTop="20px" marginBottom="40px" />
    </>
  );
};

export default Dashboard;
