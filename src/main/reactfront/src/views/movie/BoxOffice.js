import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../cstmCss/BoxOffice.css';
import { cilChevronLeft, cilChevronRight } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import GrayLine from "../uitils/GrayLine";
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CBadge, CNav, CNavItem, CNavLink } from '@coreui/react';

const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('');
};

const BoxOffice = () => {
  const [movVo, setMovVo] = useState({
    movieBoxOfficeBeanList: [],
    currentPage: 1
  });
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)));
  const [activeTab, setActiveTab] = useState('DAILY');
  const navigate = useNavigate();

  useEffect(() => {
    selectBoxOfficeList(activeTab);
  }, [startDate, activeTab]);

  const selectBoxOfficeList = async (boxOfficeType) => {
    const formattedDate = formatDate(startDate);
    try {
      const response = await axios.post('/selectBoxOfficeList', {
        showRange: formattedDate,
        boxOfficeType: boxOfficeType
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
      console.error('Box office list fetch failed:', err);
      alert('영화 목록 조회에 실패했습니다.');
      setMovVo(prevState => ({
        ...prevState,
        movieBoxOfficeBeanList: [],
      }));
    }
  };

  const handlePrevDay = () => {
    const current = new Date(startDate);
    current.setDate(current.getDate() - 1);
    setStartDate(current);
  };

  const handleNextDay = () => {
    const current = new Date(startDate);
    current.setDate(current.getDate() + 1);
    setStartDate(current);
  };

  const moveToMovieInfo = (movieCd) => {
    navigate(`/movie/MovieInfo`, { state: { movieCd } });
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
      <CNav variant="tabs" role="tablist" className="mb-lg-5">
        <CNavItem>
          <CNavLink
            active={activeTab === 'DAILY'}
            onClick={() => setActiveTab('DAILY')}
          >
            일일 박스오피스
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeTab === 'WEEKLY'}
            onClick={() => setActiveTab('WEEKLY')}
          >
            주간 박스오피스
          </CNavLink>
        </CNavItem>
      </CNav>

      <div className="date-selector" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        <button onClick={handlePrevDay} className="arrow-button">
          <CIcon icon={cilChevronLeft} />
        </button>
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          dateFormat="yyyy-MM-dd"
          className="form-control"
          style={{ width: '50%' }}
        />
        <button onClick={handleNextDay} className="arrow-button">
          <CIcon icon={cilChevronRight} />
        </button>
      </div>

      <Slider {...settings}>
        {movVo.movieBoxOfficeBeanList.map((movie, index) => (
          <div key={index} className="movie-card" onClick={() => moveToMovieInfo(movie.movieCd)}>
            <CCard className="movie-card-content">
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
    </>
  );
};

export default BoxOffice;
