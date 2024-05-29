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
  CFormSelect, CListGroup, CListGroupItem,
} from '@coreui/react';
import axios from 'axios';
import GrayLine from "../uitils/GrayLine";

const FindId = () => {
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('naver.com');
  const [code, setCode] = useState('');
  let [verificationCode, setVerificationCode] = useState('nothing');
  const [message, setMessage] = useState('');

  // 회원 객체 관리
  const [memVo, setMemVo] = useState({
    memberBean: {},
    memberBeanList: [],
    foundIdList: []
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
          verificationCode = response.data.verificationCode;
        } else {
          setMessage('이메일 발송에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch(error => {
        setMessage('오류가 발생했습니다. 다시 시도해주세요.');
      });
  };


  // id 정보 조회
  const selectMemberListByEmail = () => {

    debugger;

    // 인증코드 검증
    if (verificationCode !== code || verificationCode === "nothing") {
      setMessage('인증 코드가 올바르지 않습니다.');
      return;
    }

    memVo.memberBean.email = `${emailId}@${emailDomain}`;
    axios.post('/selectMemberListByEmail', { memberBean : memVo.memberBean })
      .then(response => {
        debugger;
        if (response.data.successResult) {
          const maskedIds = response.data.memVo.memberBeanList.map(member => maskId(member.loginId));
          setMemVo(prevMemVo => ({
            ...prevMemVo,
            memberBeanList: response.data.memVo.memberBeanList,
            foundIdList: maskedIds
          }));
          setMessage('이메일에 등록된 ' + memVo.foundIdList.length + '개의 계정을 찾았습니다.' ) ;
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

  const maskId = (id) => {
    if (id.length <= 2) {
      return id;
    }
    return id[0] + id[1] + id[2] + '*'.repeat(id.length - 4) + id[id.length - 1];
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row justify-content-center" style={{ marginTop: "100px" }}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="mx-4" style={{ minWidth: "500px" }}>
              <CCardHeader>
                <h4>이메일 인증</h4>
              </CCardHeader>
              <CCardBody className="p-4">
                <CForm>
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
                    <CButton color="dark" onClick={selectMemberListByEmail} className="ms-2">
                      확인
                    </CButton>
                  </CInputGroup>
                  {message && <strong className="mt-3">{message}</strong>}
                  {memVo.foundIdList.length > 0 && (
                    <>
                      <GrayLine marginBottom="40px" marginTop="40px"></GrayLine>
                      <div className="mt-3">
                        <strong>이메일에 등록된 아이디 </strong>
                        <CListGroup className="mt-2">
                          {memVo.foundIdList.map((id, index) => (
                            <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                              {id}
                            </CListGroupItem>
                          ))}
                        </CListGroup>
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

export default FindId;
