import React, {useEffect, useState} from 'react';

import ReactImg from '../../../assets/images/react.jpg';
import {
  CAvatar,
  CButton,
  CFormInput, CFormSelect,
  CInputGroup
} from "@coreui/react";
import avatar2 from 'src/assets/images/avatars/2.jpg'
import {useLocation} from "react-router-dom";
import axios from "axios";
import CIcon from "@coreui/icons-react";

import heartIcon from '../../../assets/brand/heartIcon.png';
import fillHeartIcon from '../../../assets/brand/fillHeartIcon.png';
import {cilRecycle, cilTrash, cilUser} from "@coreui/icons";
import GrayLine from "../../uitils/GrayLine";



export default function MovieInfoManage() {

  const location = useLocation();
  const { movieCd } = location.state;

  const [movVo, setMovVo] = useState({
    movieBean:{
      movieCd : movieCd
    },
    memberBean:{},

    moviePersonalMoviePointBean:{
      point : "5" // 기본값 별 5개
    }

  });


  // 파일 상태
  const [file, setFile] = useState(null);

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // 파일의 미리보기 생성
        setPreviewImageData(e.target.result);
      };
      // 파일을 읽어옴
      reader.readAsDataURL(selectedFile);

      // 파일 상태 업데이트
      setFile(selectedFile);
    }
  };

  // 미리보기 이미지 상태 업데이트
  const setPreviewImageData = (imageData) => {
    // 이미지 데이터를 상태에 업데이트
    setMovVo(prevMovVo => ({
      ...prevMovVo, // 기존 movVo 객체를 그대로 복사
      movieBean: {
        ...prevMovVo.movieBean, // 기존 movieBean 객체를 그대로 복사
        fileBean: {
          ...prevMovVo.movieBean.fileBean, // 기존 fileBean 객체를 그대로 복사
          src: imageData // src 속성만 변경
        }
      }
    }));

  };

  /** 영화 포스터 등록/변경 */
  const moviePosterUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('movVo', JSON.stringify(movVo));

      axios.post('/moviePosterUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          if (res.data.successResult) {
            alert("성공");
          } else {
            alert("실패 (서버 오류)");
          }
        })
        .catch(error => {
          console.error("포스터 업로드 오류:", error);
          alert("실패. (오류)");
        });
    } else {
      alert("파일을 선택해주세요.");
    }
  };


  useEffect(() => {
    /** 선택한 영화 정보 조회 */
    selectMovieInfo();

    /** 영화 조회 수 증가 */
    addMovieViewCnt();
  }, []);

  const [isHeartFilled, setIsHeartFilled] = useState(movVo.movieBean.fav); // 하트 아이콘의 상태

  const [isEvaluated, setIsEvaluated] = useState(movVo.movieBean.evaluated); // 영화 평가 여부

  /** 하트 아이콘 클릭 시 */
  const handleHeartClick = () => {
    // 하트 아이콘 변경
    setIsHeartFilled(prevState => !prevState);
    // 영화 찜 추가
    updateMovieFavorite();
  };

  /** 별점 선택 시 값 세팅 */
  const handlePointChange = (event) => {
    // 선택한 별점 값을 가져옵니다.
    const selectedRating = event.target.value;

    // movVo 상태를 업데이트하여 movPersonalMoviePoint의 point 값을 설정합니다.
    setMovVo(prevMovVo => ({
      ...prevMovVo,
      moviePersonalMoviePointBean: {
        ...prevMovVo.moviePersonalMoviePointBean,
        point: selectedRating
      }
    }));
  };

  /** 한줄평 입력 시 값 세팅*/
  const handleReplChange = (event) => {
    const replValue = event.target.value;
    setMovVo(prevMovVo => ({
      ...prevMovVo,
      moviePersonalMoviePointBean: {
        ...prevMovVo.moviePersonalMoviePointBean,
        repl: replValue
      }
    }));
  };

  /** 한줄평 접기 / 더보기 */
  const [visibleItems, setVisibleItems] = useState(3); // 초기에 보여줄 항목 수
  const [expanded, setExpanded] = useState(false); // 펼쳐진 상태 추적

  const handleShowMore = () => {
    setVisibleItems(movVo.movieBean.moviePersonalMoviePointBeanList.length); // 모든 항목을 보이도록 설정
    setExpanded(true); // 펼쳐진 상태로 설정
  };

  const handleToggleExpand = () => {
    if (expanded) {
      setVisibleItems(3); // 최초 상태인 3개 항목만 보이도록 설정
    } else {
      setVisibleItems(movVo.movieBean.moviePersonalMoviePointBeanList.length); // 모든 항목을 보이도록 설정
    }
    setExpanded(!expanded); // 펼쳐진 상태를 토글
  };

  return (
    <>
      {/** 영화 상세정보 섹션 */}
      <section className="py-6 lg:py-12 xl:py-16">
        <div className="container">

          {/* 포스터 + 출연진 */}
          <div className="grid items-start gap-4 md:grid-cols-[1fr_2fr] xl:gap-8"
               style={{display: "flex", marginTop: "20px", marginBottom: "50px"}}>

            {/* 영화 포스터 */}
            <div className="flex items-start gap-4 md:items-center" style={{marginRight: "150px"}}>

              <img
                alt="Movie poster"
                className="rounded-lg object-cover aspect-[2/3] overflow-hidden"
                height="450"
                src={movVo.movieBean.fileBean && movVo.movieBean.fileBean.src ? movVo.movieBean.fileBean.src : ReactImg}
                width="320"
                style={{ borderRadius: '10px' }}
              />

              {/**/}
              {/* 포스터 파일 수정 */}
              <div className="mb-3" style={{display: "flex"}}>
                <CFormInput
                  type="file"
                  id="formFileMultiple"
                  style={{marginTop : "20px", width : "250px"}}
                  multiple
                  onChange={handleFileChange}
                />
                <CButton
                  color="dark"
                  style={{marginTop : "20px", marginLeft : "10px"}}
                  onClick={moviePosterUpload}>변경</CButton>
              </div>

            </div>

            {/* 포스터 우측 출연진 정보 */}
            <div className="grid items-start gap-2">
              <p className="text-sm tracking-wide md:text-base" style={{marginBottom: "20px"}}>{movVo.movieBean.prdtYear}</p>
              <div style={{marginBottom: "10px", display:"flex", flexDirection: "column"}}>
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">{movVo.movieBean.movieNm}</h1>
                {movVo.movieBean.movieNmEn && (
                  <h5 className="text-3xl font-bold tracking-tighter md:text-4xl" style={{marginTop: "10px"}}>
                    {movVo.movieBean.movieNmEn}
                  </h5>
                )}
              </div>

              {/* 대표 장르 칸 */}
              <p className="text-sm tracking-wide md:text-base" style={{marginBottom: "20px"}}>{movVo.movieBean.repGenreNm}</p>

              {/* 평균 별점 칸 , 찜 칸 */}
              <div style={{ marginBottom: "60px", display: "flex" }}>
                <h5 className="text-2xl tracking-wide md:text-base" style={{ marginRight: "350px" }}>★ {movVo.movieBean.pointAvg} ({movVo.movieBean.pointTotalCnt})</h5>

                {/* 찜 : 하트 아이콘 */}
                <img src={isHeartFilled ? fillHeartIcon : heartIcon} // 상태에 따라 아이콘 변경
                     alt="Heart Icon"
                     style={{ width: '40px', height: '40px' }}
                     onClick={handleHeartClick} //
                />

              </div>

              {/* 감독 칸 */}
              <div className="flex items-center gap-2" style={{display: "flex", marginBottom: "20px"}}>
                <div style={{
                  border: "2px solid gray", /* 테두리 색상을 회색으로 설정 */
                  borderRadius: "10px", /* 모서리를 조금만 깎기 위한 설정 */
                  display: "inline-flex", /* 아이콘이 가운데 정렬되도록 설정 */
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px", /* 내부 패딩을 추가하여 아이콘과 테두리 사이의 간격 설정 */
                  marginRight : "10px"
                }}>
                  <CIcon icon={cilUser} className="" size="xl" />
                </div>

                {/** 감독 */}
                <div className="flex flex-col">
                  {movVo.movieBean.movieDirectorBeanList && movVo.movieBean.movieDirectorBeanList.map((director, index) => (
                    <div key={index}>
                      <span  className="font-semibold">{director.peopleNm}</span>
                      <span className="font-semibold"> / </span>
                      <span className="text-xs tracking-wide uppercase">{director.repRoleNm}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* 배우들 한줄  */}
              <div className="grid w-full grid-cols-2 items-start gap-4 md:grid-cols-3 lg:gap-6 "
                   style={{display: "flex", marginBottom: "20px"}}>

                {movVo.movieBean.movieActorBeanList && movVo.movieBean.movieActorBeanList.map((actor, index) => (
                  <div key={index} className="flex items-center gap-2" style={{display: "flex"}}>

                    <div style={{
                      border: "2px solid gray", /* 테두리 색상을 회색으로 설정 */
                      borderRadius: "10px", /* 모서리를 조금만 깎기 위한 설정 */
                      display: "inline-flex", /* 아이콘이 가운데 정렬되도록 설정 */
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px", /* 내부 패딩을 추가하여 아이콘과 테두리 사이의 간격 설정 */
                      marginRight : "10px"
                    }}>
                      <CIcon icon={cilUser} className="text-secondary" size="xl" />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold">{actor.peopleNm}</span>
                      <span className="font-semibold"> / </span>
                      <span className="text-xs tracking-wide uppercase">{actor.repRoleNm}</span>
                    </div>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 회색 가로줄 하나 */}
      <GrayLine marginTop="20px" marginBottom="50px" />

      {/** 영화 추가 정보 섹션 */}
      <section className="border-t py-6 lg:py-12 xl:py-16" style={{marginBottom: "50px"}}>
        <div className="container">
          <div className="row justify-content-center" style={{ display: "flex" }}>
            <div className="space-y-2">
              <h5 className="text-2xl font-bold tracking-tighter md:text-4xl" style={{ marginRight: "50px" }}>상세정보</h5>
            </div>
            <div className="col-md-8">
              <div className="card shadow-sm text-white" style={{ backgroundColor: "#2f363f" }}>
                <div className="card-body">

                  {/* 영화 제목  영화 영문 제목 */}
                  <div className="row mb-4 mt-4">
                    <div className="col-sm-6">
                      <strong style={{ fontWeight: "normal" }}> 영화 제목 :  </strong> {movVo.movieBean.movieNm}
                    </div>
                    <div className="col-sm-6">
                      <strong style={{ fontWeight: "normal" }}> 영화 영문 제목 :  </strong> {movVo.movieBean.movieNmEn}
                    </div>
                  </div>

                  {/* 대표장르  장르 */}
                  <div className="row mb-4 mt-4">
                    <div className="col-sm-6">
                      <strong style={{ fontWeight: "normal" }}> 대표 장르 :  </strong> {movVo.movieBean.repGenreNm}
                    </div>
                    <div className="col-sm-6">
                      <strong style={{ fontWeight: "normal" }}> 장르 : </strong> {movVo.movieBean.genreAlt}
                    </div>
                  </div>

                  {/* 개봉일  제작 연도 */}
                  <div className="row mb-4 mt-4">
                    <div className="col-sm-6">
                      <strong style={{ fontWeight: "normal" }}> 개봉일 : </strong> {movVo.movieBean.openDtFullStr}
                    </div>
                    <div className="col-sm-6">
                      <strong style={{ fontWeight: "normal" }}> 제작 연도 : </strong> {movVo.movieBean.prdtYear}
                    </div>
                  </div>

                  {/* 제작 상태  관람 등급 */}
                  <div className="row mb-4 mt-4">
                    <div className="col-sm-6">
                      <strong style={{ fontWeight: "normal" }}> 제작 상태 : </strong> {movVo.movieBean.prdtStatNm}
                    </div>
                    <div className="col-sm-6">
                      <strong style={{ fontWeight: "normal" }}> 관람 등급 : </strong> {movVo.movieBean.watchGradeNm}
                    </div>
                  </div>

                  {/* 감독 명  출연진 */}
                  <div className="row mb-4">
                    <div className="col-sm-6">
                      <strong style={{fontWeight: "normal"}}> 감독 명 : </strong>
                      {movVo.movieBean.movieDirectorBeanList && movVo.movieBean.movieDirectorBeanList.map((director, index) => (
                        <span key={index} className="font-semibold">
                          {index > 0 && ", "}
                          {director.peopleNm}
                        </span>
                      ))}
                    </div>
                    <div className="col-sm-6">
                      <strong style={{fontWeight: "normal"}}> 출연진 : </strong>
                      {movVo.movieBean.movieActorBeanList && movVo.movieBean.movieActorBeanList.map((actor, index) => (
                        <span key={index} className="font-semibold">
                            {index > 0 && ", "}
                          {actor.peopleNm}
                          </span>
                      ))}
                    </div>
                  </div>

                  {/* 상영 시간  상영 형태 */}
                  <div className="row mb-4">
                    <div className="col-sm-6">
                      <strong style={{fontWeight: "normal"}}> 상영 시간 : </strong>
                      {movVo.movieBean.showTm && `${movVo.movieBean.showTm} 분`}
                    </div>

                    {movVo.movieBean.showTypeNm && (
                      <div className="col-sm-6">
                        <strong style={{ fontWeight: "normal" }}> 상영 형태 : </strong> {movVo.movieBean.showTypeNm}
                      </div>
                    )}
                  </div>

                  {/* 제작 국가 루프 맵*/}
                  {movVo.movieBean.movieCompanyBeanList && movVo.movieBean.movieCompanyBeanList.length > 0 && (
                    <div className="row mb-4">
                      <div className="col-sm-6">
                        <strong style={{ fontWeight: "normal" }}> 제작 국가 : </strong>

                        {movVo.movieBean.movieNationBeanList.map((nation, index) => (
                          <span key={index}>
                              {index > 0 && ", "}
                            {nation.korNm}
                            </span>
                        ))}

                      </div>
                    </div>

                  )}

                  {/* 제작 및 배급사 루프 맵 */}
                  {movVo.movieBean.movieCompanyBeanList  && movVo.movieBean.movieCompanyBeanList[0] != null &&movVo.movieBean.movieCompanyBeanList.length > 0 && (
                    <div className="row mb-4">
                      <div className="col-sm-12">
                        <strong style={{fontWeight: "normal"}}> 제작 및 배급사 : </strong>

                        {movVo.movieBean.movieCompanyBeanList.map((company, index) => (
                          <span key={index}>
                            {index > 0 && ", "}
                            {company.companyNm}
                          </span>
                        ))}

                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 회색 가로줄 하나 */}
      <GrayLine marginTop="20px" marginBottom="50px" />

      {/** 예고편 영역 */}
      <section className="border-t py-6 lg:py-12 xl:py-16" style={{marginBottom: "50px"}}>
        <div className="container">
          <div className="row justify-content-center" style={{ display: "flex" }}>
            <div className="space-y-2">
              <h5 className="text-2xl font-bold tracking-tighter md:text-4xl" style={{ marginRight: "50px" }}>미디어</h5>
            </div>
            <div className="col-md-8">
              <div>
                {/* 동영상을 재생할 영역 */}
                {movVo.movieBean.previewUrl && (
                  <video controls width="500" height="auto">
                    {/* 동영상 소스 지정 */}
                    <source src={movVo.movieBean.previewUrl} type="video/mp4" />
                    {/* 지원되지 않는 브라우저 메시지 */}
                    해당 브라우저는 비디오 태그를 지원하지 않습니다.
                  </video>
                )}
              </div>
              <p>
                {/* 링크 렌더링 */}
                {movVo.movieBean.previewUrl && (
                  <>
                    영상이 재생 되지 않을 시&nbsp;
                    <a href={movVo.movieBean.previewUrl} target="_blank" rel="noopener noreferrer">링크</a>
                    &nbsp;를 클릭
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 회색 가로줄 하나 */}
      <GrayLine marginTop="20px" marginBottom="50px" />

      {/** 한줄 평 섹션 */}
      <section className="border-t border-gray-200 py-6 lg:py-12 xl:py-16" style={{marginBottom: "20px"}}>

        <div className="container">
          <div className="grid items-start gap-4 md:grid-cols-[1fr_2fr] xl:gap-8" style={{display: "flex"}}>

            {/* 한줄 평 태그 */}
            <div className="space-y-2">
              <h5 className="text-2xl font-bold tracking-tighter md:text-4xl" style={{marginRight: "50px"}}>Reviews</h5>
            </div>

            <div className="grid items-start gap-4 md:grid-cols-[2fr_1fr] xl:gap-8" style={{width: "100%", display: "block"}}>

              {/* 사람 + 한줄평 내용 */}
              {
                movVo.movieBean.moviePersonalMoviePointBeanList && movVo.movieBean.moviePersonalMoviePointBeanList.slice(0, visibleItems).map((pointBean, index) => (
                  <div key={index} className="flex items-start gap-4" style={{marginBottom: "30px"}}>
                    {/* 프사 + 이름 */}
                    <div className="flex items-center gap-4" style={{display: "flex"}}>
                      {/* 프사 칸 */}
                      {pointBean.profileSrc ? (
                        <CAvatar src={pointBean.profileSrc}/>
                      ) : (
                        <CIcon icon={cilUser} className="text-secondary" size="xl" />
                      )}

                      {/* 아이디 + 별점 + 한줄평 내용 */}
                      <div className="grid items-start gap-1" style={{marginBottom: "30px"}}>
                        {/* 아이디 칸 */}
                        <h5 className="text-lg font-semibold tracking-tighter" style={{marginBottom: "10px"}}>{pointBean.memName}</h5>
                        {/* 별점 칸 */}
                        <div className="flex items-center gap-1" style={{marginBottom: "10px"}}>
                          <span className="text-sm font-medium tracking-tighter">★({pointBean.point}) </span>
                        </div>
                        <div style={{display:"flex" }}>
                          {/* 한줄평 내용 칸 */}
                          <p
                            className="text-sm tracking-wide leading-paragraph md:text-base lg:text-lg xl:text-base dark:text-gray-400">
                            {pointBean.repl}
                          </p>

                          <div style={{marginLeft:"500px", display:"flex"}}>

                            <p
                              className="text-sm tracking-wide leading-paragraph md:text-base lg:text-lg xl:text-base dark:text-gray-400"
                              style={{marginRight:"20px"}}
                            >
                              상태 ({pointBean.stateText})
                            </p>

                            {/** 복원 버튼 */}
                            <CButton
                              color="black" variant="outline"
                              style={{ whiteSpace: 'nowrap', border: '1px solid gray', marginRight: '10px' }}
                              title="리뷰 상태 정상으로 복구"
                              onClick={() => updateReviewState('restore',pointBean)}
                            >
                              <CIcon icon={cilRecycle} />
                            </CButton>

                            {/** 삭제 버튼 */}
                            <CButton
                              color="black" variant="outline"
                              style={{ whiteSpace: 'nowrap', border: '1px solid gray', marginRight: '10px'}}
                              title="리뷰 상태 삭제로 변경"
                              onClick={() => updateReviewState('delete',pointBean)}
                            >
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                ))
              }

              {/** 더보기 / 접기 영역 */}
              {movVo.movieBean.moviePersonalMoviePointBeanList && movVo.movieBean.moviePersonalMoviePointBeanList.length > visibleItems && (
                <CButton className="mb-3" color="dark" variant="ghost" onClick={handleShowMore}>{expanded ? '접기' : '... 더보기'}</CButton> // 상태에 따라 버튼 텍스트 변경
              )}
              {expanded && (
                <CButton className="mb-3" color="dark" variant="ghost" onClick={handleToggleExpand}>접기</CButton> // 펼쳐진 상태일 때만 접기 버튼 렌더링
              )}

            </div>

          </div>

          {/** 평가여부 분기 (평가하였을시 : 출력칸 ,  미평가시 : 입력칸) */}
          {isEvaluated ? (
            <div>
              {/* 한줄 평 태그 */}
              <GrayLine marginBottom="20px" marginTop="10px"/>
              <div className="space-y-2">
                <h5 className="text-2xl font-bold tracking-tighter md:text-4xl" style={{marginBottom:"20px"}}>내 평가</h5>
              </div>

              {/* 내 평가(별점 + 한줄평) 출력 영역 */}
              <CInputGroup className="mb-3">

                {/* 별점 매기기*/}
                <CFormSelect
                  className="mb-3"
                  name="point"
                  style={{width: "10%", height: '50px'}}
                  onChange={handlePointChange}
                  disabled
                  value={movVo.moviePersonalMoviePointBean.point}
                >
                  <option value="5">★★★★★</option>
                  <option value="4">★★★★</option>
                  <option value="3">★★★</option>
                  <option value="2">★★</option>
                  <option value="1">★</option>
                </CFormSelect>

                {/* 한줄평 */}
                <CFormInput
                  name="repl"
                  placeholder={movVo.moviePersonalMoviePointBean.repl}
                  style={{width: "70%", height: '50px'}}
                  onChange={handleReplChange}
                  readOnly
                />

                <CButton
                  type="button"
                  color="dark"
                  variant="outline"
                  style={{height: '50px'}}
                  onClick={updatePointInputBox}
                >
                  수정
                </CButton>

                <CButton
                  type="button"
                  color="dark"
                  variant="outline"
                  style={{height: '50px'}}
                  onClick={() => updateMovPersonalMoviePoint("delete")}
                >
                  삭제
                </CButton>
              </CInputGroup>
            </div>
          ) : (
            /* 별점 + 한줄평 입력 영역 */
            <CInputGroup className="mb-3">
              {/* 별점 매기기*/}
              <CFormSelect
                className="mb-3"
                name="point"
                style={{width: "10%", height: '50px'}}
                onChange={handlePointChange}
              >
                <option value="5">★★★★★</option>
                <option value="4">★★★★</option>
                <option value="3">★★★</option>
                <option value="2">★★</option>
                <option value="1">★</option>
              </CFormSelect>

              {/* 한줄평 */}
              <CFormInput
                name="repl"
                placeholder="한줄평 남기기"
                style={{width: "80%", height: '50px'}}
                onChange={handleReplChange}
              />

              <CButton
                type="button"
                color="primary"
                style={{height: '50px'}}
                onClick={() => updateMovPersonalMoviePoint("update")}
              >
                평가 등록
              </CButton>
            </CInputGroup>
          )}

        </div>
      </section>

      {/* 회색 가로줄 하나 */}
      <GrayLine marginTop="20px" marginBottom="50px" />

    </>
  )

  /** 영화 조회수 증가 */
  function addMovieViewCnt() {

    axios({
      url: '/addMovieViewCnt',
      method: 'post',
      data: {
        movieBean: movVo.movieBean,
        memberBean: movVo.memberBean
      }
    })
      .then(function (res) {

      })
      .catch(function (err) {
        alert("실패 (오류)");
      });

  }

  /** 선택 영화 상세 조회 */
  function selectMovieInfo() {
    // 사용자 정보 추출
    movVo.memberBean = JSON.parse(localStorage.getItem('memberBean'));

    axios({
      url: '/selectMovieInfo',
      method: 'post',
      data: {
        movieBean: movVo.movieBean,
        memberBean: movVo.memberBean
      }
    })
      .then(function (res) {

        /* 개봉일 포맷 (1990.07.07 형식) */
        if(res.data.movieBean.openDt != null){
          const openDt = new Date(res.data.movieBean.openDt);
          const openDtFullStr =  openDt.getFullYear() + '.' + String(openDt.getMonth() + 1).padStart(2, '0') + '.' + String(openDt.getDate()).padStart(2, '0'); ;
          res.data.movieBean.openDtFullStr = openDtFullStr;
        }

        if(res.data.movieBean.moviePersonalMoviePointBeanList != null && res.data.movieBean.moviePersonalMoviePointBeanList.length > 0){
          var pointBeanList = res.data.movieBean.moviePersonalMoviePointBeanList;
          for (var i = 0; i < pointBeanList.length; i++) {
            if(pointBeanList[i].state == "B"){
              pointBeanList[i].stateText = "정상";
            }else if(pointBeanList[i].state == "D"){
              pointBeanList[i].stateText = "삭제";
            }

          }
          res.data.movieBean.moviePersonalMoviePointBeanList = pointBeanList;

        }

        setMovVo(prevMovVo => ({
          ...prevMovVo,
          movieBean: res.data.movieBean,
          moviePersonalMoviePointBean: res.data.moviePersonalMoviePointBean,
        }));

        setIsHeartFilled(res.data.movieBean.fav);
        setIsEvaluated(res.data.movieBean.evaluated);

      })
      .catch(function (err) {
        alert("실패 (오류)");
      });

  }

  /** 영화 찜 수정 */
  function updateMovieFavorite(){
    var mode = "";
    if(isHeartFilled){  // 하트가 채워져 있는 경우 (찜해제하기)
      mode = "delete";
    }else{// 하트를 비워져 있는 경우 (찜하기)
      mode = "add";
    }

    axios({
      url: '/updateMovieFavorite',
      method: 'post',
      data: {
        movieBean: movVo.movieBean,
        memberBean: movVo.memberBean,
        mode : mode
      }
    })
      .then(function (res) {

      })
      .catch(function (err) {
        alert("실패 (오류)");
      });

  }

  /** 평가(별점, 한줄평) 등록 및 수정시 */
  function updateMovPersonalMoviePoint(mode){

    // 포인트 빈 기본 객체세팅
    if(movVo.moviePersonalMoviePointBean == null){
      movVo.moviePersonalMoviePointBean = {
        point : "5",
        repl : ''
      }
    }
    // 별 기본값 5 강제 세팅
    if(movVo.moviePersonalMoviePointBean.point == null){
      movVo.moviePersonalMoviePointBean.point = "5";
    }

    movVo.moviePersonalMoviePointBean.movieCd = movVo.movieBean.movieCd;

    axios({
      url: '/updateMovPersonalMoviePoint',
      method: 'post',
      data: {
        moviePersonalMoviePointBean : movVo.moviePersonalMoviePointBean,
        memberBean: movVo.memberBean,
        movieBean : movVo.movieBean,
        mode : mode
      }
    })
      .then(function (res) {
        // 평가 정보, 여부 갱신
        selectMovieInfo();
      })
      .catch(function (err) {
        alert("실패 (오류)");
      });
  }

  /** 내 한줄 평 수정 버튼 클릭 시 */
  function updatePointInputBox(){
    // 한줄 평 인풋박스 입력으로 전환
    setIsEvaluated(false);

    // 별 5개 기본값 강제 세팅
    movVo.moviePersonalMoviePointBean.point = "5";
  }

  /** 리뷰 상태 정상/삭제 로 변경 */
  function updateReviewState(mode, pointBean){
    axios({
      url: '/updateMovieState',
      method: 'post',
      data: {
        moviePersonalMoviePointBean : pointBean,
        mode : mode
      }
    })
      .then(function (res) {
        // 상태 변경 후 영화 목록 다시 불러오기
        selectMovieInfo();
      })
      .catch(function (err) {
      });

  }

}
