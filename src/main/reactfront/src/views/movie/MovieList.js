import React, {useEffect, useState} from 'react';
import {
  CCardGroup,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle
} from '@coreui/react';
import ReactImg from '../../assets/images/react.jpg';
import axios from 'axios';

const MovieList = () => {
  const cardStyle = {
    marginRight: '20px'
  };

  const [movVo, setMovVo] = useState({
    movieBeanList: []
  });

  /** 전체 영화 리스트 조회 */
  useEffect(() => {
    selectAllMovieList();
  }, []);

  return (
    <>
      <h4 className="mb-3">영화 리스트 페이지 입니다</h4>
      <h4 className="mb-3">검색 및 상태 표시줄</h4>

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


    </>
  );

  /** 전체 영화 리스트 조회 */
  function selectAllMovieList() {
    axios({
      url: '/selectAllMovieList',
      method: 'post',
      params: {}
    })
      .then(function (res) {
        const movieBeanList = res.data.movVo.movieBeanList;
        debugger;
        setMovVo({movieBeanList}); // setMovVo로 상태를 업데이트
      })
      .catch(function (err) {
        alert('등록 실패 (오류)');
      });
  }


  /** openDt 를 년도로 변환 */
  function changeToFullYear(openDt){
    const dateObject = new Date(openDt);
    const year = dateObject.getFullYear();
    return year;
  }


}


export default MovieList;
