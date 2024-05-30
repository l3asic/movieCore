import React, { useEffect, useState } from 'react';
import {
  CBadge,
  CCardText,
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

const Dashboard = () => {
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
      const movies = response.data.movVo.movieBoxOfficeBeanList || [];
      setMovVo(prevState => ({
        ...prevState,
        movieBoxOfficeBeanList: movies,
      }));
    } catch (err) {
      // alert('영화 목록 조회에 실패했습니다.');
      setMovVo(prevState => ({
        ...prevState,
        movieBoxOfficeBeanList: [],
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
      <GrayLine marginTop="20px" marginBottom="40px" />
      <h4 className="box-office-header">일일 박스 오피스</h4>

      <Slider {...settings}>
        {movVo.movieBoxOfficeBeanList.map((movie, index) => (
          <div key={index} className="movie-card" onClick={() => moveToMovieInfo(movie.movieCd)}>
            {movie.rankOldAndNew !== "OLD" && (
              <div className="position-relative">
                <CBadge color="danger" className="movie-badge position-absolute top-0 start-0" shape="rounded-pill">
                  {movie.rankOldAndNew} <span className="visually-hidden">unread messages</span>
                </CBadge>
              </div>
            )}
            <img
              src={movie.fileBean && movie.fileBean.src ? movie.fileBean.src : 'default-movie.jpg'}
              alt={movie.movieNm}
              className="movie-image"
            />
            <div className="movie-info">
              <h5 className="movie-title">{movie.movieNm}</h5>
              {movie.openDtYearStr && <span>({movie.openDtYearStr})</span>}
              <CCardText>
                <small className="text-medium-emphasis">★ {movie.movieBean.pointAvg} ({movie.movieBean.pointTotalCnt}) </small>
              </CCardText>
            </div>
          </div>
        ))}
      </Slider>

      <GrayLine marginTop="20px" marginBottom="40px" />

      {/** 게시판 영역 */}
      <h4 className="box-office-header">게시판 영역</h4>
    </>
  );
};

export default Dashboard;
