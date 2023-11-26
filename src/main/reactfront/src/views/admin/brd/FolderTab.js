import React, {useEffect, useState} from 'react';
import {CInputGroup, CInputGroupText, CForm, CFormInput, CCol, CFormSelect, CButton} from "@coreui/react";
import axios from "axios";

function FolderTab() {

  const [brdVo, setBrdVo] = useState({
    folderBeanList : []
  });

  const [folderBean, setFolderBean] = useState({
    memId : '',
    folName : '',
    folLoc : '',
    depth : 0,
    odr : 0
  });


  return (
    <>
      <h1 className="pb-lg-5"> 폴더 생성</h1>
      <CForm className="row g-3">

        <CCol md={5}>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">폴더 명</CInputGroupText>
            <CFormInput placeholder="폴더 명 입력" aria-label="Username" aria-describedby="basic-addon1"
                        name="folName"
                        onChange={changeFolderBean}
            />
          </CInputGroup>
        </CCol>

        <CCol md={2}>
          <CButton
            color="primary"
            onClick={createFolder}
          >폴더 생성</CButton>
        </CCol>


      </CForm>


    </>
  ) // return



  function changeFolderBean(e){
    const { value, name } = e.target;
    setFolderBean({
      ...folderBean,
      [name] : value
    });
  }


  /** 폴더 최종 생성 */
  function createFolder(){
    axios({
      url: '/createFolder', // 통신할 웹문서
      method: 'post', // 통신할 방식
      params:{
        memId: folderBean.memId,
        folName: folderBean.folName,
        folLoc: folderBean.folLoc,
        depth: folderBean.depth,
        odr: folderBean.odr
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



};

export default FolderTab;
