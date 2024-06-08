import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react';
import '../../cstmCss/MovieRecommend.css';
import { useNavigate } from 'react-router-dom';

const MovieRecommend = () => {
  const [activeTab, setActiveTab] = useState('core');
  const [memberBean, setMemberBean] = useState(JSON.parse(localStorage.getItem('memberBean')));
  const [movVo, setMovVo] = useState({
    personalRecommendMovList: [],
    hotMoviesList: [],
    topRatedMoviesList: [],
  });
  const [returnMsg, setReturnMsg] = useState('');

  useEffect(() => {
    selectPersonalRecommendMov();
    selectHotMovies();
    selectTopRatedMovies();
  }, []);

  const selectPersonalRecommendMov = async () => {
    try {
      const response = await axios.post('/selectPersonalRecommendMov', {
        memberBean: memberBean,
      });
      setMovVo(prevState => ({ ...prevState, personalRecommendMovList: response.data.movVo.movieBeanList }));
    } catch (err) {
      alert('실패 (오류)');
    }
  };

  const selectHotMovies = async () => {
    try {
      const response = await axios.post('/selectHotMovies', {
        memberBean: memberBean,
      });
      setMovVo(prevState => ({ ...prevState, hotMoviesList: response.data.movVo.movieBeanList }));
    } catch (err) {
      // alert('실패 (오류)');
    }
  };

  const selectTopRatedMovies = async () => {
    try {
      const response = await axios.post('/selectTopRatedMovies', {
        memberBean: memberBean,
      });
      setMovVo(prevState => ({ ...prevState, topRatedMoviesList: response.data.movVo.movieBeanList }));
    } catch (err) {
      alert('실패 (오류)');
    }
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
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();

  const moveToMovieInfo = (movieCd) => {
    navigate(`/movie/MovieInfo`, { state: { movieCd } });
  };

  return (
    <>
      {returnMsg && <div className="return-msg">{returnMsg}</div>}
      <CNav variant="tabs" className="justify-content-center mt-5">
        <CNavItem>
          <CNavLink active={activeTab === 'core'} onClick={() => setActiveTab('core')}>
            무비코어 추천 영화
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 'hot'} onClick={() => setActiveTab('hot')}>
            최근 핫한 영화
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 'top'} onClick={() => setActiveTab('top')}>
            역대 최고 평점
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane visible={activeTab === 'core'}>
          <Slider {...settings}>
            {movVo.personalRecommendMovList.map((movie, index) => (
              <div key={index} className="movie-card" onClick={() => moveToMovieInfo(movie.movieCd)}>
                <CCard className="movie-card-content">
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
                      <small className="text-medium-emphasis">★ {movie.pointAvg} ({movie.pointTotalCnt})</small>
                    </CCardText>
                  </CCardBody>
                </CCard>
              </div>
            ))}
          </Slider>
        </CTabPane>
        <CTabPane visible={activeTab === 'hot'}>
          <Slider {...settings}>
            {movVo.hotMoviesList.map((movie, index) => (
              <div key={index} className="movie-card" onClick={() => moveToMovieInfo(movie.movieCd)}>
                <CCard className="movie-card-content">
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
                      <small className="text-medium-emphasis">★ {movie.pointAvg} ({movie.pointTotalCnt})</small>
                    </CCardText>
                  </CCardBody>
                </CCard>
              </div>
            ))}
          </Slider>
        </CTabPane>
        <CTabPane visible={activeTab === 'top'}>
          <Slider {...settings}>
            {movVo.topRatedMoviesList.map((movie, index) => (
              <div key={index} className="movie-card" onClick={() => moveToMovieInfo(movie.movieCd)}>
                <CCard className="movie-card-content">
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
                      <small className="text-medium-emphasis">★ {movie.pointAvg} ({movie.pointTotalCnt})</small>
                    </CCardText>
                  </CCardBody>
                </CCard>
              </div>
            ))}
          </Slider>
        </CTabPane>
      </CTabContent>
    </>
  );
};

export default MovieRecommend;
