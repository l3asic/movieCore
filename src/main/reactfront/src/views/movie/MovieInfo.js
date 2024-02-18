

import React from 'react';

import ReactImg from '../../assets/images/react.jpg';
import {CAvatar, CCardImage} from "@coreui/react";
import avatar2 from 'src/assets/images/avatars/2.jpg'


export default function MovieInfo() {




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
              <p className="text-sm tracking-wide md:text-base" style={{marginBottom: "10px"}}>개봉년도</p>
              <h1 className="text-3xl font-bold tracking-tighter md:text-4xl" style={{marginBottom: "10px"}}>영화 제목</h1>

              {/* 장르 칸 (추후 예정) */}
              <p className="text-sm tracking-wide md:text-base" style={{marginBottom: "10px"}}>장르 칸</p>

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
      <section className="border-t py-6 lg:py-12 xl:py-16" style={{marginBottom: "50px"}}>
        <div className="container">
          <div className="grid items-start gap-4 md:grid-cols-[1fr_2fr] xl:gap-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter md:text-4xl">영화 상세 정보들</h2>
            </div>
            <div
              className="space-y-4 text-sm tracking-wide leading-paragraph md:text-base lg:space-y-6 lg:text-lg xl:space-y-8 dark:text-gray-400">
              <p>
                상세 정보들 추가 예정
              </p>
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
}



