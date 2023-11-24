import React, { useState } from 'react'
import {
  CFormInput, CForm, CFormLabel, CFormTextarea,
  CFormSelect,
  CCol, CButton
} from '@coreui/react'
import axios from "axios";



const ArticleReg = () => {

  const [brdVo, setBrdVo] = useState({
    folderBean : {},
    folderBeanList : [],
    boardBean : {},
    boardBeanList : [],
    articleBean : {
      atclId : '',
      brdId : '',
      memId : '',
      subject : '',
      content : ''
    }
  });


  const [articleBean, setArticleBean] = useState({
      atclId : '',
      brdId : '',
      memId : '',
      subject : '',
      content : ''
  });








  return (
    <>
      <h1 className="pb-lg-5"> 게시글 작성 창</h1>

      <CForm className="row g-3">

        <CCol md={3}>
          <CFormSelect
            label="폴더 선택"
            options={[
              {label: '임시 테스트 폴더 001', value: 'BF2311713518'},
              {label: '임시 테스트 폴더 002', value: 'BF4258826302'},
              {label: '임시 테스트 폴더 003', value: 'BF4258826303'}
            ]}
            name="folId"
          />
        </CCol>

        <CCol md={3}>
          <CFormSelect
            label="게시판 선택"
            options={[
              {label: '임시 그냥게시판', value: 'BB2115411073'},
              {label: '테스트 게시판 001', value: 'BB4265418620'}
            ]}
            name="brdId"
            onChange={changeAtclBean}
          />
        </CCol>


        <CCol md={3}>
          <CFormSelect
            label="만료 기한"
            options={[
              {label: '영구', value: 'N'},
              {label: '만료 기한 설정', value: 'Y'}
            ]}
            name="expireYn"
            onChange={changeAtclBean}
          />
        </CCol>


        <CCol md={3}>
          <CFormSelect
            label="게시 종료일자"
            options={[
              {label: '임시날짜 : 20991231', value: '20991231'},
              {label: '임시날짜 : 20231231', value: '20231231'}
            ]}
            name="expireDate"
            className="mb-3"
          />
        </CCol>



        <CCol md={9}>
          <div className="mb-1">
            <CFormLabel htmlFor="exampleFormControlInput1">제목</CFormLabel>
            <CFormInput type="" id="exampleFormControlInput1" placeholder="" name="subject" onChange={changeAtclBean}/>
          </div>

        </CCol>

        <CCol md={3}>
          <CFormSelect
            label="말머리?"
            options={[
              {label: '말머리1', value: '1'},
              {label: '말머리2', value: '2'}
            ]}
            name=""
            className="mb-1"
          />
        </CCol>


        <CCol md={12}>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlTextarea1">내용</CFormLabel>
            <CFormTextarea id="exampleFormControlTextarea1" rows={10} name="content" onChange={changeAtclBean}></CFormTextarea>
          </div>
        </CCol>


        <CCol md={12}>
          <div className="mb-3">
            {/*<CFormLabel htmlFor="formFileMultiple">파일 첨부</CFormLabel>*/}
            <CFormInput type="file" id="formFileMultiple" multiple/>
          </div>
        </CCol>



        {/* 불필요칸 주석 */}
        {/*<CCol md={6}>
          <CFormInput type="email" id="inputEmail4" label="Email"/>
        </CCol>
        <CCol md={6}>
          <CFormInput type="password" id="inputPassword4" label="Password"/>
        </CCol>
        <CCol xs={12}>
          <CFormInput id="inputAddress" label="Address" placeholder="1234 Main St"/>
        </CCol>
        <CCol xs={12}>
          <CFormInput id="inputAddress2" label="Address 2" placeholder="Apartment, studio, or floor"/>
        </CCol>
        <CCol md={6}>
          <CFormInput id="inputCity" label="City"/>
        </CCol>
        <CCol md={4}>
          <CFormSelect id="inputState" label="State">
            <option>Choose...</option>
            <option>...</option>
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CFormInput id="inputZip" label="Zip"/>
        </CCol>
        <CCol xs={12}>
          <CFormCheck type="checkbox" id="gridCheck" label="Check me out"/>
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Sign in</CButton>
        </CCol>*/}



        < div className = " d-grid gap-2 d-md-flex justify-content-md-end pb-3" >
          < CButton color = "dark" size="lg" > 임시 저장 </ CButton >
          < CButton  className = " me-md-2 " size="lg" onClick={atclRegistry}> 게시글 등록 </ CButton >
        </ div >
      </CForm>




    </>
  ) //return



  /** 게시글 정보 입력시 객체에 세팅 */
  function changeAtclBean(e){
    const { value, name } = e.target;
    setArticleBean({
      ...articleBean,
        [name] : value
    });
  }


  /** 게시글 최종 작성(등록) */
  function atclRegistry(){

    /** 테스트용 기본값 추가 세팅 */
    brdVo.articleBean.memId = "001";
    // brdVo.articleBean.atclBean.expireDt =  new Date(); // 날짜 타입 컨트롤러 값 전송시 추가 확인 필요

    axios({
      url: '/atclRegistry', // 통신할 웹문서
      method: 'post', // 통신할 방식
      params:{
        brdId: articleBean.brdId,
        memId: articleBean.memId,
        subject: articleBean.subject,
        content: articleBean.content
        /*expireDt:  brdVo.articleBean.expireDt*/
      }

    }).then(function (res){
      if(res.data.succesResult){
        alert("등록 성공");
      }else{
        alert("등록 그냥 실패?");
      }

    }).catch(function (err){
      alert("등록 실패 (오류)");
    });

  }






}

export default ArticleReg
