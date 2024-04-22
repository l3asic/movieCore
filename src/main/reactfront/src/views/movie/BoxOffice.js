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
  const navigate = useNavigate();

  useEffect(() => {
    selectDailyBoxOfficeList();
  }, [startDate]);

  const selectDailyBoxOfficeList = async () => {
    const formattedDate = formatDate(startDate);
    try {
      const response = await axios.post('/selectDailyBoxOfficeList', { showRange: formattedDate }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setMovVo(prevState => ({
        ...prevState,
        movieBoxOfficeBeanList: response.data.movVo.movieBoxOfficeBeanList,
      }));
    } catch (err) {
      console.error('Box office list fetch failed:', err);
      alert('영화 목록 조회에 실패했습니다.');
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
      <h4 className="box-office-header">일일 박스 오피스</h4>

      {/* 회색 가로줄 하나 */}
      <GrayLine marginTop="20px" marginBottom="40px" />

      <div className="date-selector"
           style={{
             justifyContent: 'center',
             display: 'flex',
             alignItems: 'center',
             marginBottom: '40px'
      }}>
        <button onClick={handlePrevDay} className="arrow-button">
          <CIcon icon={cilChevronLeft}/>
        </button>
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          dateFormat="yyyy-MM-dd" // 날짜 형식을 yyyy-MM-dd로 설정
        />

        <button onClick={handleNextDay} className="arrow-button">
          <CIcon icon={cilChevronRight}/>
        </button>
      </div>

      <Slider {...settings}>
        {movVo.movieBoxOfficeBeanList.map((movie, index) => (
          <div key={index} className="movie-card" onClick={() => moveToMovieInfo(movie.movieCd)}>
            <img
              src={movie.fileBean && movie.fileBean.src ? movie.fileBean.src : 'default-movie.jpg'}
              alt={movie.movieNm}
              className="movie-image"
            />
            <div className="movie-info">
              <h5 className="movie-title">{movie.movieNm}</h5>
              {movie.openDtYearStr && <span>({movie.openDtYearStr})</span>}
              <p className="movie-rating">평점: {movie.pointAvg}</p>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default BoxOffice;
