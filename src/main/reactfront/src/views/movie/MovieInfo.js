

import React, {useEffect, useState} from 'react';

import ReactImg from '../../assets/images/react.jpg';
import {CAvatar, CCardImage} from "@coreui/react";
import avatar2 from 'src/assets/images/avatars/2.jpg'
import {useLocation} from "react-router-dom";
import axios from "axios";


export default function MovieInfo() {

  const location = useLocation();
  const { movieCd } = location.state;

  const [movVo, setMovVo] = useState({
    movieBean:{
      movieCd : movieCd
    }
  });


  /** 선택한 영화 정보 조회 */
  useEffect(() => {
    selectMovieInfo();
  }, []);



  return (
    <>

      <h5> 영화 상세정보 페이지</h5>

      {/** 영화 상세정보 섹션 */}
      <section className="py-6 lg:py-12 xl:py-16">
        <div className="container">

          {/* 포스터 + 출연진 */}
          <div className="grid items-start gap-4 md:grid-cols-[1fr_2fr] xl:gap-8"
               style={{display: "flex", marginTop: "20px", marginBottom: "50px"}}>

            {/* 영화 포스터 */}
            <div className="flex items-start gap-4 md:items-center" style={{marginRight: "200px"}}>
              <img
                alt="Movie poster"
                className="rounded-lg object-cover aspect-[2/3] overflow-hidden"
                height="450"
                src={ReactImg}
                width="300"
                style={{borderRadius: '10px'}}
              />
            </div>

            {/* 포스터 우측 출연진 정보 */}
            <div className="grid items-start gap-2">
              <p className="text-sm tracking-wide md:text-base" style={{marginBottom: "10px"}}>{movVo.movieBean.prdtYear}</p>
              <div style={{marginBottom: "10px", display:"flex"}}>
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl" >{movVo.movieBean.movieNm}</h1>
                {movVo.movieBean.movieNmEn && (
                  <h5 className="text-3xl font-bold tracking-tighter md:text-4xl" style={{marginLeft:"10px", marginTop : "20px"}}>
                    ({movVo.movieBean.movieNmEn})
                  </h5>
                )}
              </div>

              {/* 장르 칸 (추후 예정) */}
              <p className="text-sm tracking-wide md:text-base" style={{marginBottom: "10px"}}>{movVo.movieBean.repGenreNm}</p>

              {/* 별점칸 (추후 예정) */}
              <p className="text-sm tracking-wide md:text-base" style={{marginBottom: "80px"}}>별점 칸</p>


              {/* 감독 칸 */}
              <div className="flex items-center gap-2" style={{display: "flex", marginBottom: "20px"}}>
                {/*<img
                    alt="Director avatar"
                    className="rounded-full object-cover"
                    height="40"
                    src={ReactImg}
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />*/}
                <CAvatar src={avatar2}/>
                <div className="flex flex-col">
                  <span className="font-semibold">감독 명</span>
                  <span className="font-semibold"> / </span>
                  <span className="text-xs tracking-wide uppercase">감독</span>
                </div>
              </div>

              {/* 배우들 한줄 (3명씩) */}
              <div className="grid w-full grid-cols-2 items-start gap-4 md:grid-cols-3 lg:gap-6 "
                   style={{display: "flex", marginBottom: "20px"}}>

                {/* 배우 한칸 */}
                <div className="flex items-center gap-2" style={{display: "flex"}}>
                  {/* 배우 사진 */}
                  <img
                    alt="Actor avatar"
                    className="rounded-full object-cover"
                    height="40"
                    src={ReactImg}
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  {/* 배우명, 역할명 */}
                  <div className="flex flex-col">
                    <span className="font-semibold">배우 명</span>
                    <span className="font-semibold">/</span>
                    <span className="text-xs tracking-wide uppercase">역할 명</span>
                  </div>
                </div>

                {/* 배우 한칸 */}
                <div className="flex items-center gap-2" style={{display: "flex"}}>
                  {/* 배우 사진 */}
                  <img
                    alt="Actor avatar"
                    className="rounded-full object-cover"
                    height="40"
                    src={ReactImg}
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  {/* 배우명, 역할명 */}
                  <div className="flex flex-col">
                    <span className="font-semibold">배우 명</span>
                    <span className="font-semibold">/</span>
                    <span className="text-xs tracking-wide uppercase">역할 명</span>
                  </div>
                </div>

                {/* 배우 한칸 */}
                <div className="flex items-center gap-2" style={{display: "flex"}}>
                  {/* 배우 사진 */}
                  <img
                    alt="Actor avatar"
                    className="rounded-full object-cover"
                    height="40"
                    src={ReactImg}
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  {/* 배우명, 역할명 */}
                  <div className="flex flex-col">
                    <span className="font-semibold">배우 명</span>
                    <span className="font-semibold">/</span>
                    <span className="text-xs tracking-wide uppercase">역할 명</span>
                  </div>
                </div>


              </div>

              {/* 배우들 한줄 (3명씩) */}
              <div className="grid w-full grid-cols-2 items-start gap-4 md:grid-cols-3 lg:gap-6 "
                   style={{display: "flex"}}>

                {/* 배우 한칸 */}
                <div className="flex items-center gap-2" style={{display: "flex"}}>
                  {/* 배우 사진 */}
                  <img
                    alt="Actor avatar"
                    className="rounded-full object-cover"
                    height="40"
                    src={ReactImg}
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  {/* 배우명, 역할명 */}
                  <div className="flex flex-col">
                    <span className="font-semibold">배우 명</span>
                    <span className="font-semibold">/</span>
                    <span className="text-xs tracking-wide uppercase">역할 명</span>
                  </div>
                </div>

                {/* 배우 한칸 */}
                <div className="flex items-center gap-2" style={{display: "flex"}}>
                  {/* 배우 사진 */}
                  <img
                    alt="Actor avatar"
                    className="rounded-full object-cover"
                    height="40"
                    src={ReactImg}
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  {/* 배우명, 역할명 */}
                  <div className="flex flex-col">
                    <span className="font-semibold">배우 명</span>
                    <span className="font-semibold">/</span>
                    <span className="text-xs tracking-wide uppercase">역할 명</span>
                  </div>
                </div>

                {/* 배우 한칸 */}
                <div className="flex items-center gap-2" style={{display: "flex"}}>
                  {/* 배우 사진 */}
                  <img
                    alt="Actor avatar"
                    className="rounded-full object-cover"
                    height="40"
                    src={ReactImg}
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  {/* 배우명, 역할명 */}
                  <div className="flex flex-col">
                    <span className="font-semibold">배우 명</span>
                    <span className="font-semibold">/</span>
                    <span className="text-xs tracking-wide uppercase">역할 명</span>
                  </div>
                </div>


              </div>

            </div>

          </div>

        </div>
      </section>


      {/* 회색 가로줄 하나 */}
      <div className="header-divider"
           style={{borderTop: '1px solid #ccc', marginTop: '20px', marginBottom: '50px'}}></div>


      {/** 영화 추가 정보 섹션 */}
      {/* typeNm 장/단편,  movieNmEn 영문명, showTm 상영시간,    watchGradeNm 관람등급,  totalViewCnt  전체조회수
        companyNm 회사명,  genreNm 영화 장르들,  nationNm 제작국가,  prdtStatNm  개봉/개봉예정,
        showTm 상영시간,  openDt 개봉일,
        */}
      <section className="border-t py-6 lg:py-12 xl:py-16" style={{marginBottom: "50px"}}>
        <div className="container">
          <div className="row justify-content-center" style={{ display: "flex" }}>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter md:text-4xl" style={{ marginRight: "50px" }}>상세정보</h2>
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
                      <strong style={{ fontWeight: "normal" }}> 감독 명 : </strong> directorNm
                    </div>
                    <div className="col-sm-6">
                      <strong style={{ fontWeight: "normal" }}> 출연진 : </strong> actorNm
                    </div>
                  </div>

                  {/* 상영 시간  상영 형태 */}
                  <div className="row mb-4">
                    <div className="col-sm-6">
                      <strong style={{ fontWeight: "normal" }}> 상영 시간 : </strong> {movVo.movieBean.showTm} 분
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
                  {movVo.movieBean.movieCompanyBeanList && movVo.movieBean.movieCompanyBeanList.length > 0 && (
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
      <div className="header-divider"
           style={{borderTop: '1px solid #ccc', marginTop: '20px', marginBottom: '50px'}}></div>


      {/** 한줄 평 섹션 */}
      <section className="border-t border-gray-200 py-6 lg:py-12 xl:py-16" style={{marginBottom: "20px"}}>

        <div className="container">
          <div className="grid items-start gap-4 md:grid-cols-[1fr_2fr] xl:gap-8" style={{display: "flex"}}>

            {/* 한줄 평 태그 */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter md:text-4xl" style={{marginRight: "50px"}}>Reviews</h2>
            </div>

            <div className="grid items-start gap-4 md:grid-cols-[2fr_1fr] xl:gap-8">

              {/* 사람 + 한줄평 내용 */}
              <div className="flex items-start gap-4" style={{marginBottom: "30px"}}>
                {/* 프사 + 이름 */}
                <div className="flex items-center gap-4" style={{display: "flex"}}>
                  {/*<img
                      alt="User avatar"
                      className="rounded-full object-cover"
                      height="80"
                      src={ReactImg}
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width="80"
                    />*/}
                  {/* 프사 칸 */}
                  <CAvatar src={avatar2}/>

                  {/* 아이디 + 별점 + 한줄평 내용 */}
                  <div className="grid items-start gap-1" style={{marginBottom: "30px"}}>
                    {/* 아이디 칸 */}
                    <h3 className="text-lg font-semibold tracking-tighter" style={{marginBottom: "10px"}}>유저 아이디</h3>
                    {/* 별점 칸 */}
                    <div className="flex items-center gap-1" style={{marginBottom: "10px"}}>
                      <span className="text-sm font-medium tracking-tighter">★(3.5) 별점</span>
                    </div>
                    {/* 한줄평 내용 칸 */}
                    <p
                      className="text-sm tracking-wide leading-paragraph md:text-base lg:text-lg xl:text-base dark:text-gray-400">
                      한줄 평 내용
                    </p>
                  </div>
                </div>
              </div>

              {/* 사람 + 한줄평 내용 */}
              <div className="flex items-start gap-4" style={{marginBottom: "30px"}}>
                {/* 프사 + 이름 */}
                <div className="flex items-center gap-4" style={{display: "flex"}}>
                  {/*<img
                      alt="User avatar"
                      className="rounded-full object-cover"
                      height="80"
                      src={ReactImg}
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width="80"
                    />*/}
                  {/* 프사 칸 */}
                  <CAvatar src={avatar2}/>

                  {/* 아이디 + 별점 + 한줄평 내용 */}
                  <div className="grid items-start gap-1" style={{marginBottom: "30px"}}>
                    {/* 아이디 칸 */}
                    <h3 className="text-lg font-semibold tracking-tighter" style={{marginBottom: "10px"}}>유저 아이디</h3>
                    {/* 별점 칸 */}
                    <div className="flex items-center gap-1" style={{marginBottom: "10px"}}>
                      <span className="text-sm font-medium tracking-tighter">★(3.5) 별점</span>
                    </div>
                    {/* 한줄평 내용 칸 */}
                    <p
                      className="text-sm tracking-wide leading-paragraph md:text-base lg:text-lg xl:text-base dark:text-gray-400">
                      한줄 평 내용
                    </p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* 회색 가로줄 하나 */}
      <div className="header-divider"
           style={{borderTop: '1px solid #ccc', marginTop: '20px', marginBottom: '50px'}}></div>

      {/** 추후 예매 기능 추가 */}

      {/** 연관 영화 섹션 */}
      {/*<section className="border-t border-gray-200 py-6 lg:py-12 xl:py-16">
          <div className="container">
            <div className="grid items-start gap-4 md:grid-cols-[1fr_2fr] xl:gap-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter md:text-4xl">Related Movies</h2>
              </div>
              <div className="grid w-full grid-cols-2 items-start gap-4 md:grid-cols-3 lg:gap-6">
                <div className="flex flex-col items-center gap-2">
                  <img
                    alt="Movie cover"
                    className="rounded-lg object-cover aspect-[2/3] overflow-hidden"
                    height="270"
                    src={ReactImg}
                    width="180"
                  />
                  <h3 className="text-sm font-bold tracking-tighter">The Batman</h3>
                  <p className="text-xs tracking-tight uppercase">2022</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    alt="Movie cover"
                    className="rounded-lg object-cover aspect-[2/3] overflow-hidden"
                    height="270"
                    src={ReactImg}
                    width="180"
                  />
                  <h3 className="text-sm font-bold tracking-tighter">The Batman</h3>
                  <p className="text-xs tracking-tight uppercase">2022</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    alt="Movie cover"
                    className="rounded-lg object-cover aspect-[2/3] overflow-hidden"
                    height="270"
                    src={ReactImg}
                    width="180"
                  />
                  <h3 className="text-sm font-bold tracking-tighter">The Batman</h3>
                  <p className="text-xs tracking-tight uppercase">2022</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    alt="Movie cover"
                    className="rounded-lg object-cover aspect-[2/3] overflow-hidden"
                    height="270"
                    src={ReactImg}
                    width="180"
                  />
                  <h3 className="text-sm font-bold tracking-tighter">The Batman</h3>
                  <p className="text-xs tracking-tight uppercase">2022</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    alt="Movie cover"
                    className="rounded-lg object-cover aspect-[2/3] overflow-hidden"
                    height="270"
                    src={ReactImg}
                    width="180"
                  />
                  <h3 className="text-sm font-bold tracking-tighter">The Batman</h3>
                  <p className="text-xs tracking-tight uppercase">2022</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    alt="Movie cover"
                    className="rounded-lg object-cover aspect-[2/3] overflow-hidden"
                    height="270"
                    src={ReactImg}
                    width="180"
                  />
                  <h3 className="text-sm font-bold tracking-tighter">The Batman</h3>
                  <p className="text-xs tracking-tight uppercase">2022</p>
                </div>
              </div>
            </div>
          </div>
        </section>*/}

      {/** 기타 내용 칸 섹션  */}
      {/*<div className="border-t">
          <div className="container py-6 lg:py-12 xl:py-16">
            <div className="grid items-center justify-center gap-4 text-center md:gap-10">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to watch?</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Experience the movie magic on the big screen or from the comfort of your home.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <h5>
                  링크
                </h5>
                <h5>
                  링크
                </h5>
              </div>
            </div>
          </div>
        </div>*/}

    </>
  )


  /** 선택 영화 상세 조회 */
  function selectMovieInfo() {

    axios({
      url: '/selectMovieInfo',
      method: 'post',
      data: {
        movieBean: movVo.movieBean,
      }
    })
      .then(function (res) {

        /* 개봉일 포맷 (1990.07.07 형식) */
        if(res.data.movieBean.openDt != null){
          const openDt = new Date(res.data.movieBean.openDt);
          const openDtFullStr =  openDt.getFullYear() + '.' + String(openDt.getMonth() + 1).padStart(2, '0') + '.' + String(openDt.getDate()).padStart(2, '0'); ;
          res.data.movieBean.openDtFullStr = openDtFullStr;
        }


        setMovVo(prevMovVo => ({
          ...prevMovVo,
          movieBean: res.data.movieBean
        }));

      })
      .catch(function (err) {
        alert("실패 (오류)");
      });


  }


}



