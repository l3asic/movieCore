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
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleCheckPassword();
                            }
                          }}
                          style={{ width: '150px' }} // 가로길이를 150px로 설정
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            color="dark"
                            className="px-4"
                            onClick={handleCheckPassword}
                          >
                            확인
                          </CButton>
                        </CCol>
                      </CRow>
                    </div>

                    <CCard className="text-white text-bg-dark py-5" style={{ width: '70%', marginLeft : "100px" }}>
                      <CCardBody className="text-center">
                        <div>
                          <h2>비밀번호를 잊으셨나요?</h2>
                          {/*<p>
                            비밀번호
                          </p>*/}
                          <Link to="/register">
                            <CButton  className="mt-3 btn-dark" active tabIndex={-1}>
                              비밀번호 찾기
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



  // 비밀번호 확인 함수
  function handleCheckPassword() {
    var memberBean = JSON.parse(localStorage.getItem('memberBean'));


    axios({
      url: '/authenticate',
      method: 'post',
      params: {
        loginId: memberBean.loginId,
        loginPassword: password
      }
    })
      .then(function (res) {
        // 비밀번호 확인 성공
        if(res.data.loginStatus == 'success'){

          // 로컬 스토리지 비우기
          localStorage.removeItem('memberBean');
          localStorage.removeItem('loginId');
          localStorage.removeItem('memRole');
          localStorage.removeItem('token');

          // 로컬 스토리지에 데이터 담기
          localStorage.setItem('token', res.data.jwt.token);
          localStorage.setItem('loginId', res.data.userId);
          localStorage.setItem('memRole', res.data.memRole);
          localStorage.setItem('memberBean', JSON.stringify(res.data.memberBean));

          // 스토리지에서 객체 추출 예시)
          // JSON.parse(localStorage.getItem('memberBean'));

          // 비밀번호 확인 후 내 정보 관리로 이동
          navigate('/member/myInformation/Profile');

        }else{
          alert('로그인 오류');
        }

      })
      .catch(function (res) {
        // 비밀번호 확인 실패
        if(res.response.data.loginStatus == 'fail'){
          alert('비밀번호 오류');
        }else{
          alert('로그인 오류');
        }

      });


  };



};

export default CheckPassword;
