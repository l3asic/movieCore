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
    parentFolder : '',
    folLoc : '',
    depth : 0,
    odr : 0
  });


  /** 모든 폴더 리스트 조회 */
  useEffect(() => {
    selectAllFolderList();
  }, [])

  /** 조회된 폴더 리스트의 첫번째 폴더로 기본 값 세팅 */
  useEffect(() => {
    if (brdVo.folderBeanList.length > 0) {
      const firstFolder = brdVo.folderBeanList[0];
      setFolderBean((prevFolderBean) => ({
        ...prevFolderBean,
        folId: firstFolder.folId,
      }));
    }
  }, [brdVo.folderBeanList]);



  return (
    <>
      <h1 className="pb-lg-5"> 폴더 생성</h1>
      <CForm className="row g-3">

        {/** 상위폴더 선택 추후 트리구조로 개편 필요 */}
        <CCol md={5}>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">상위 폴더 선택</CInputGroupText>
            <CFormSelect
              aria-label="상위 폴더 선택"
              options={
              brdVo.folderBeanList.map(folderBean => ({
                label: folderBean.folName,
                value: folderBean.folId
              }))}
              name="parentFolder"
              onChange={changeFolderBean}
            />
          </CInputGroup>
        </CCol>


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


  /** 모든 폴더 리스트 조회 */
  function selectAllFolderList(){
    axios({
      url: '/selectAllFolderList',
      method: 'post',
      params:{
      }

    }).then(function (res){
      setBrdVo((prevBrdVo) => ({
        ...prevBrdVo,
        folderBeanList: res.data.brdVo.folderBeanList
      }));

    }).catch(function (err){
      alert("조회실패 (오류)");
    });

  }




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
        parentFolder: folderBean.parentFolder,
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
