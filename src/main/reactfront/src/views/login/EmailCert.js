import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CCardHeader,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilEnvelopeClosed, cilCheckCircle } from '@coreui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailCert = () => {
  const navigate = useNavigate();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('naver.com');
  const [code, setCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const [memberInfo, setMemberInfo] = useState({
  });


  const handleEmailIdChange = (e) => {
    setEmailId(e.target.value);
  };

  const handleEmailDomainChange = (e) => {
    setEmailDomain(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };


  /** 이메일 인증 코드 전송 */
  const sendVerificationEmail = () => {
    const email = `${emailId}@${emailDomain}`;

    // 유효성 검사
    if (!validateEmail(email)) {
      setMessage('유효한 이메일 주소를 입력하세요.');
      return;
    }

    // 임시값 추후 수정@@@
    var memberBean = {
      memId : "MEM2157073142",
      email : email
    }

    axios.post('/sendVerificationEmail', { memberBean })
      .then(response => {
        if (response.data.successResult) {
          setMessage(email + ' 주소로 인증 이메일이 전송되었습니다. 인증 코드를 입력해주세요.');
          setVerificationCode(response.data.verificationCode);
        } else {
          setMessage('이메일 전송에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch(error => {
        setMessage('오류가 발생했습니다. 다시 시도해주세요.');
      });
  };


  const verifyCode = () => {

    // 인증 코드 검증
    if(verificationCode != code){
      setMessage('인증 코드가 올바르지 않습니다.');
      return;
    }

    const email = `${emailId}@${emailDomain}`;
    axios.post('/verifyCode', { email, code })
      .then(response => {
        if (response.data.success) {
          setMessage('이메일 인증이 완료되었습니다.');
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

  const goToLogin = () => {
    navigate('/login/Login');
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row" style={{ marginTop: "140px" }}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="mx-4">
              <CCardHeader>
                <h4>이메일 인증</h4>
              </CCardHeader>
              <CCardBody className="p-4 text-center bg-gradient">
                {!showEmailForm ? (
                  <>
                    <h4>회원 가입이 완료되었습니다.</h4>
                    <p>비밀번호 분실시 계정을 찾기 위해 이메일 인증을 해주세요</p>
                    <CButton color="dark" onClick={() => setShowEmailForm(true)} className="mt-3 me-5 text-light">
                      이메일 인증하기
                    </CButton>
                    <CButton color="secondary" onClick={goToLogin} className="mt-3">
                      나중에 하기
                    </CButton>
                  </>
                ) : (
                  <CForm>
                    <CInputGroup className="mb-3 mt-3 ">
                      <CFormInput
                        placeholder="이메일 아이디"
                        value={emailId}
                        onChange={handleEmailIdChange}
                      />
                      <CInputGroupText>@</CInputGroupText>
                      <CFormSelect className="rounded-end" value={emailDomain} onChange={handleEmailDomainChange}>
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="daum.net">daum.net</option>
                        <option value="hotmail.com">hotmail.com</option>
                      </CFormSelect>
                      <CButton color="dark" onClick={sendVerificationEmail} className="ms-2 rounded">
                        인증 이메일 전송
                      </CButton>
                    </CInputGroup>
                    <CInputGroup className="mt-5 mb-3">
                      <CFormInput
                        className="rounded-end"
                        placeholder="인증 코드"
                        value={code}
                        onChange={handleCodeChange}
                      />
                      <CButton color="dark" onClick={verifyCode} className="ms-2 rounded">
                        확인
                      </CButton>
                    </CInputGroup>
                    {message && <strong className="mt-3">{message}</strong>}
                  </CForm>

                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default EmailCert;
