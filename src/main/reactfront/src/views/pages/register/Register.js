import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {cilAddressBook, cilGroup, cilLockLocked, cilRoom, cilUser} from "@coreui/icons";
import axios from 'axios';

const Register = () => {
  const [memberInfo, setMemberInfo] = useState({
    loginId: '',
    loginPassword: '',
    memName: '',
    gender: 'N', // 기본값 (성별을 밝히지 않음)
    address: '',
    addressInfo: '',
    email: '',
  });

  useEffect(() => {
    // Daum 우편번호 서비스 스크립트 로드
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
      // Daum 우편번호 서비스 초기화
      new window.daum.Postcode({
        oncomplete: function (data) {
          const fullAddress = data.address;
          handleAddressSelection(fullAddress);
        },
      });
    };
    document.body.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilAddressBook} />
                    </CInputGroupText>
                    <CFormInput name="loginId" placeholder="아이디" onChange={changeMemberInfo} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput name="loginPassword"
                      type="password"
                      placeholder="비밀번호"
                      onChange={changeMemberInfo}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput name="loginPasswordConfirm"
                      type="password"
                      placeholder="비밀번호 확인"
                      onChange={changeMemberInfo}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput name="memName" placeholder="이름" onChange={changeMemberInfo} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilGroup} />
                    </CInputGroupText>
                    <CFormSelect
                      aria-label="Default select example"
                      placeholder="성별"
                      value={memberInfo.gender} // 현재 state의 값을 표시
                      onChange={changeMemberInfo} // 변경 시 함수 호출
                      name="gender" // name 설정
                    >
                      <option value="N">성별을 밝히지 않음</option>
                      <option value="M">남성</option>
                      <option value="F">여성</option>
                    </CFormSelect>
                  </CInputGroup>
                  <CRow className="mb-3">
                    <CCol md={9}>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilRoom} />
                        </CInputGroupText>
                        <CFormInput name="address" placeholder="주소"  value={memberInfo.address}
                                    onChange={changeMemberInfo} />
                      </CInputGroup>
                    </CCol>
                    <CCol md={3}>
                      <CButton color="info" onClick={openDaumPostcode} style={{ width: '100%', height: '100%'}}>
                        주소검색
                      </CButton>
                    </CCol>
                  </CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilRoom} />
                    </CInputGroupText>
                    <CFormInput name="addressInfo" placeholder="상세주소" onChange={changeMemberInfo} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput name="email" placeholder="이메일" onChange={changeMemberInfo} />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={signUp}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )

  function changeMemberInfo(e){

    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setMemberInfo({
      ...memberInfo, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });

  }

  function handleAddressSelection(selectedAddress) {
    setMemberInfo({
      ...memberInfo,
      address: selectedAddress,
    });
  }

  function openDaumPostcode() {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address; // 선택된 전체 주소
        handleAddressSelection(fullAddress); // 선택된 주소를 상태값에 반영
      },
    }).open();
  }

  function signUp(){
    // post 버전
    axios({
      url: '/signUp', // 통신할 웹문서
      method: 'post', // 통신할 방식
      params:{
        loginId: memberInfo.loginId,
        loginPassword:  memberInfo.loginPassword,
        memName: memberInfo.memName,
        gender: memberInfo.gender,
        address: memberInfo.address,
        addressInfo: memberInfo.addressInfo,
        email: memberInfo.email
      }

    }).then(function (res){
      if(res.data.succesResult){
        alert(res.data.memberVo.memberBean.loginId + " 가입성공");
      }else{
        alert("가입 그냥 실패?");
      }

    }).catch(function (err){
      alert("가입 실패 (오류)");
    });


  }

}

export default Register
