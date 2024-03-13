import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked } from '@coreui/icons';
import axios from 'axios';

const CheckPassword = () => {
  const navigate = useNavigate();

  // 사용자 정보 상태 변수 설정: 비밀번호
  const [password, setPassword] = useState('');

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 비밀번호 확인 핸들러
  const handleCheckPassword = () => {
    // 비밀번호 확인 로직 구현
    if (password === 'qq1212') { // 사용자의 비밀번호로 변경
      // 비밀번호가 일치하는 경우, 내정보 수정 페이지로 이동
      navigate('/member/myInformation/Profile');
    } else {
      // 비밀번호가 일치하지 않는 경우, 알림 등 처리
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center" style={{ marginTop: '200px' }}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm className="align-items-center"  style={{display : "flex"}}>
                    <div >
                      <h3>내 정보 수정</h3>
                      <p className="text-medium-emphasis" >비밀번호를 입력 하세요.</p>
                      <CInputGroup className="mb-3" style={{ width: "250px", margin: "0 auto" }}> {/* 가로길이 250px, 가운데 정렬 */}
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="비밀번호 입력"
                          autoComplete="current-password"
                          value={password}
                          onChange={handlePasswordChange}
                          style={{ width: '150px' }} // 가로길이를 150px로 설정
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" className="px-4" onClick={handleCheckPassword}>확인</CButton>
                        </CCol>
                      </CRow>
                    </div>

                    <CCard className="text-white bg-primary py-5" style={{ width: '70%', marginLeft : "100px" }}>
                      <CCardBody className="text-center">
                        <div>
                          <h2>임시 제목</h2>
                          <p>
                            임시 텍스트
                          </p>
                          <Link to="/register">
                            <CButton color="primary" className="mt-3" active tabIndex={-1}>
                              비밀번호 찾기?
                            </CButton>
                          </Link>
                        </div>
                      </CCardBody>
                    </CCard>

                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default CheckPassword;
