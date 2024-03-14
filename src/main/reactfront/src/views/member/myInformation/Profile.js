import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput, CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilAddressBook,
  cilArrowCircleLeft,
  cilGroup,
  cilLockLocked,
  cilRoom,
  cilUser
} from '@coreui/icons'
import axios from "axios";

const Profile = () => {

  const navigate  = useNavigate();

  const [memberInfo, setMemberInfo] = useState(JSON.parse(localStorage.getItem('memberBean')));

  // 비밀번호 변경 버튼 상태
  const [changePassword, setChangePassword] = useState(false);


  // 비밀번호 변경 버튼 클릭 시 상태 변경
  const handlePasswordChangeClick = () => {
    setChangePassword(!changePassword);
  };



  return (

    <>
      <div className="bg-light min-vh-100 d-flex flex-row {/*align-items-center*/}">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>내 정보 관리</h1>
                    <p className="text-medium-emphasis">* 항목은 필수 입니다</p>
                    {/* 아이디 칸*/}
                    *
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilAddressBook} />
                      </CInputGroupText>
                      <CFormInput name="loginId" placeholder="아이디" value={memberInfo.loginId}  disabled></CFormInput>
                    </CInputGroup>

                    {/* 비밀번호 렌더링 버튼 칸*/}
                    {changePassword ? null : (
                      <CInputGroup className="mb-3" style={{height : "35px", marginTop : "30px"}}>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CButton color="dark" style={{ width: '50%', height: '100%'}} onClick={handlePasswordChangeClick}>
                          비밀번호 변경
                        </CButton>
                      </CInputGroup>
                    )}

                    {/* 비밀번호 변경 폼 */}
                    {changePassword && (
                      <>

                        <CButton
                          color="dark"
                          variant="ghost"
                          style={{marginBottom : "5px"}}
                          onClick={handlePasswordChangeClick}
                        >
                          <CIcon size="lg" color="dark" icon={cilArrowCircleLeft}   />
                        </CButton>

                        {/* 비밀번호 칸*/}
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput name="loginPassword" type="password" placeholder="비밀번호" onChange={changeMemberInfo} />
                        </CInputGroup>

                        {/* 비밀번호 확인 칸*/}
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput name="loginPasswordConfirm" type="password" placeholder="비밀번호 확인" onChange={changeMemberInfo} />
                        </CInputGroup>
                      </>
                    )}

                    {/* 이름 칸 */}
                    *
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput name="memName" placeholder="사용자 명" onChange={changeMemberInfo} value={memberInfo.memName}/>
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
                      <CFormInput name="addressInfo" placeholder="상세주소" onChange={changeMemberInfo} value={memberInfo.addressInfo}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput name="email" placeholder="이메일" onChange={changeMemberInfo} value={memberInfo.email}/>
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" onClick={updateMemberInfo}>
                        내 정보 수정
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>


    </>
  )


  /** 회원정보 객체 값 할당 */
  function changeMemberInfo(e){

    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setMemberInfo({
      ...memberInfo, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });

  }

  /** 주소 검색 및 값 할당 */
  function handleAddressSelection(selectedAddress) {
    setMemberInfo({
      ...memberInfo,
      address: selectedAddress,
    });
  }

  /** 다음 주소 api  */
  function openDaumPostcode() {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address; // 선택된 전체 주소
        handleAddressSelection(fullAddress); // 선택된 주소를 상태값에 반영
      },
    }).open();
  }

  /** 회원가입 버튼 클릭 */
  function updateMemberInfo(){

    // 유효성 검사
    if (!validateMemberInfo()) {
      return;
    }

    // post 버전
    axios({
      url: '/updateMemberInfo', // 통신할 웹문서
      method: 'post', // 통신할 방식
      params:{
        memId : memberInfo.memId,
        loginId: memberInfo.loginId,
        changePassword : changePassword,
        loginPassword:  memberInfo.loginPassword,
        memName: memberInfo.memName,
        gender: memberInfo.gender,
        address: memberInfo.address,
        addressInfo: memberInfo.addressInfo,
        email: memberInfo.email
      }

    }).then(function (res){
      if(res.data.successResult){
        alert("내 정보 변경 완료");

        // 메인화면 으로 이동
        navigate('/#');


      }else{
        alert("실패?");
      }

    }).catch(function (err){
      alert("실패 (오류)");
    });


  }

  /** 회원가입 유효성 검사 */
  function validateMemberInfo() {
    const { loginId, loginPassword, loginPasswordConfirm, memName, gender, address, email } = memberInfo;

    // 필수 항목 체크
    if (!loginId || !memName || !gender){    // 필수에 주소, 이메일 제외|| !address || !email
      alert(' * 필수 항목을 입력하세요.');
      return false;
    }

    // 비밀번호 변경 시
    if(changePassword){

      if (!loginPassword || !loginPasswordConfirm){    // 필수에 주소, 이메일 제외|| !address || !email
        alert(' * 필수 항목을 입력하세요.');
        return false;

        // 비밀번호와 비밀번호 확인 일치 여부 체크
      }else if (loginPassword !== loginPasswordConfirm) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return false;

        // 비밀번호 길이 체크 (예시: 최소 6자 이상)
      }else if (loginPassword.length < 6) {
        alert('비밀번호는 최소 6자 이상이어야 합니다.');
        return false;
      }
    }


    // 이메일 유효성 체크 (예시: 정규식 사용)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && email!="" && !emailRegex.test(email)) {
      alert('유효한 이메일 주소를 입력하세요.');
      return false;
    }

    // 유효성 검사 통과
    return true;
  }




}




export default Profile
