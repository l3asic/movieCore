import React, {useState} from 'react';
import {CInputGroup, CInputGroupText, CForm, CFormInput, CCol, CButton} from "@coreui/react";
import axios from "axios";

function FolderTab() {
  const [folderBean, setFolderBean] = useState({
    memId: '',
    folName: '',
    folLoc: '',
    depth: 0,
    odr: 0
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>폴더 생성</h1>
      <div style={styles.spacing}></div> {/* 폴더 생성 탭과 폴더 생성 UI 간의 간격을 위해 추가 */}
      <CForm className="row g-3" style={styles.form}>
        <CCol md={5}>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1" style={styles.inputGroupText}>폴더 명</CInputGroupText>
            <CFormInput
              placeholder="폴더 명 입력"
              aria-label="Folder Name"
              aria-describedby="basic-addon1"
              name="folName"
              onChange={changeFolderBean}
              style={styles.input}
            />
          </CInputGroup>
        </CCol>
        <CCol md={2}>
          <CButton
            color="warning"
            onClick={createFolder}
            style={styles.button}
          >
            폴더 생성
          </CButton>
        </CCol>
      </CForm>
    </div>
  );

  // 폴더 정보 변경 핸들러
  function changeFolderBean(e) {
    const {value, name} = e.target;
    setFolderBean({
      ...folderBean,
      [name]: value
    });
  }

  // 폴더 생성 요청
  function createFolder() {
    axios({
      url: '/createFolder',
      method: 'post',
      params: {
        memId: folderBean.memId,
        folName: folderBean.folName,
        folLoc: folderBean.folLoc,
        depth: folderBean.depth,
        odr: folderBean.odr
      }
    }).then(function (res) {
      if (res.data.succesResult) {
        alert("등록 성공");
      } else {
        alert("등록 실패");
      }
    }).catch(function (err) {
      alert("등록 실패 (오류)");
    });
  }
}

// 스타일 정의
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333'
  },
  spacing: {
    marginBottom: '20px' // 폴더 생성 탭과 폴더 생성 UI 간의 간격
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputGroupText: {
    backgroundColor: '#DAA520', // 사이드 네비게이션 톤에 맞춘 색상
    color: '#333',
    border: 'none'
  },
  input: {
    border: '1px solid #ced4da',
    borderRadius: '4px'
  },
  button: {
    backgroundColor: '#DAA520', // 사이드 네비게이션 톤에 맞춘 색상
    borderColor: '#DAA520',
    color: '#333',
    height: '38px'
  }
};

export default FolderTab;
