import React, {useState} from 'react';
import {CInputGroup, CInputGroupText, CForm, CFormInput, CCol, CButton} from "@coreui/react";
import { cilFolder } from '@coreui/icons';
import axios from "axios";
import CIcon from "@coreui/icons-react";
import {useNavigate} from "react-router-dom";

function FolderTab() {
  const [folderBean, setFolderBean] = useState({
    memId: JSON.parse(localStorage.getItem('memberBean')).memId,
    folName: '',
    odr: 0
  });

  const navigate  = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        <CIcon icon={cilFolder} className="text-warning" style={{ marginRight: '10px',  width : '25px', height : '25px' }} />
        폴더 생성
      </h1>
      <div style={styles.spacing}></div>
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
            color="dark"
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
        odr: folderBean.odr
      }
    }).then(function (res) {
      if (res.data.succesResult) {
        alert("등록 성공");
        // 메인화면으로
        navigate('/dashboard');
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
    backgroundColor: '#6c757d', // 회색 계열 색상으로 변경
    color: '#fff',
    border: 'none'
  },
  input: {
    border: '1px solid #ced4da',
    borderRadius: '4px'
  },
  button: {
    backgroundColor: '#6c757d', // 회색 계열 색상으로 변경
    borderColor: '#6c757d',
    color: '#fff',
    height: '38px'
  }


};

export default FolderTab;
