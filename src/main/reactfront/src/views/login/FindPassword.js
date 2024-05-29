import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
} from '@coreui/react';
import axios from 'axios';
import GrayLine from "../uitils/GrayLine";

const FindPassword = () => {
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('naver.com');
  const [code, setCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('nothing');
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // 회원 객체 관리
  const [memVo, setMemVo] = useState({
    memberBean: {
      loginId: '',
      email: '',
      password: '',
    },
    memberBeanList: [],
  });

  const handleLoginIdChange = (e) => {
    setMemVo({
      ...memVo,
      memberBean: {
        ...memVo.memberBean,
        loginId: e.target.value,
      },
    });
  };

  const handleEmailIdChange = (e) => {
    setEmailId(e.target.value);
  };

  const handleEmailDomainChange = (e) => {
    setEmailDomain(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const sendVerificationEmail = () => {
    memVo.memberBean.email = `${emailId}@${emailDomain}`;

    // 유효성 검사
    if (!validateEmail(memVo.memberBean.email)) {
      setMessage('유효한 이메일 주소를 입력하세요.');
      return;
    }

    axios.post('/sendVerificationEmail', { memberBean: memVo.memberBean })
      .then(response => {
        if (response.data.successResult) {
          setMessage(memVo.memberBean.email + ' 주소로 인증 이메일이 전송되었습니다. 인증 코드를 입력해주세요.');
          setVerificationCode(response.data.verificationCode);
        } else {
          setMessage('이메일 발송에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch(error => {
        setMessage('오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  // 비밀번호 초기화
  const resetPassword = () => {

    // 인증코드 검증
    if (verificationCode !== code || verificationCode === "nothing") {
      setMessage('인증 코드가 올바르지 않습니다.');
      return;
    }


    memVo.memberBean.email = `${emailId}@${emailDomain}`;
    axios.post('/resetPassword', { memberBean: memVo.memberBean })
      .then(response => {
        if (response.data.successResult) {
          setNewPassword(response.data.memVo.memberBean.loginPassword);
          setMessage('비밀번호가 초기화되었습니다. 새로운 비밀번호를 확인하세요.');
        } else {
          setMessage('인증 코드가 유효하지 않습니다. 다시 시도해주세요.');
        }
      })
      .catch(error => {
        setMessage('오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row justify-content-center" style={{ marginTop: "100px" }}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="mx-4" style={{ minWidth: "500px" }}>
              <CCardHeader>
                <h4>비밀번호 찾기</h4>
              </CCardHeader>
              <CCardBody className="p-4">
                <CForm>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="아이디"
                      value={memVo.memberBean.loginId}
                      onChange={handleLoginIdChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="이메일 아이디"
                      value={emailId}
                      onChange={handleEmailIdChange}
                    />
                    <CInputGroupText>@</CInputGroupText>
                    <CFormSelect value={emailDomain} onChange={handleEmailDomainChange}>
                      <option value="naver.com">naver.com</option>
                      <option value="gmail.com">gmail.com</option>
                      <option value="daum.net">daum.net</option>
                      <option value="hotmail.com">hotmail.com</option>
                    </CFormSelect>
                    <CButton color="dark" onClick={sendVerificationEmail} className="ms-2">
                      인증 이메일 전송
                    </CButton>
                  </CInputGroup>
                  <CInputGroup className="mb-5">
                    <CFormInput
                      placeholder="인증 코드"
                      value={code}
                      onChange={handleCodeChange}
                    />
                    <CButton color="dark" onClick={resetPassword} className="ms-2">
                      확인
                    </CButton>
                  </CInputGroup>
                  {message && <strong className="mt-3">{message}</strong>}
                  {newPassword && (
                    <>
                      <GrayLine marginBottom="40px" marginTop="40px"></GrayLine>
                      <div className="mt-3">
                        <strong>초기화된 비밀번호: {newPassword}</strong>
                      </div>
                    </>
                  )}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default FindPassword;
