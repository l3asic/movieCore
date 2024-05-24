import React, {useEffect, useState} from 'react'
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
import ReactImg from "../../../assets/images/react.jpg";

const Profile = () => {

  const navigate  = useNavigate();

  const [memberInfo, setMemberInfo] = useState(JSON.parse(localStorage.getItem('memberBean')));

  // 비밀번호 변경 버튼 상태
  const [changePassword, setChangePassword] = useState(false);


  // 비밀번호 변경 버튼 클릭 시 상태 변경
  const handlePasswordChangeClick = () => {
    setChangePassword(!changePassword);
  };




  // 파일 상태
  const [file, setFile] = useState(null);

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // 파일의 미리보기 생성
        setPreviewImageData(e.target.result);
      };
      // 파일을 읽어옴
      reader.readAsDataURL(selectedFile);

      // 파일 상태 업데이트
      setFile(selectedFile);
    }
  };


  // 미리보기 이미지 상태 업데이트
  const setPreviewImageData = (imageData) => {
    // 이미지 데이터를 상태에 업데이트
    setMemberInfo(prevMemberInfo => ({
      ...prevMemberInfo,
        fileBean: {
          ...prevMemberInfo.fileBean, // 기존 fileBean 객체를 그대로 복사
          src: imageData // src 속성만 변경
        }
    }));

  };


  useEffect(() => {
    /** 프로필 사진 조회 */
    selectProfileImg();


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

                    {/* 프로필 사진 */}
                    <div className="flex items-start gap-4 md:items-center" style={{display : "flex"}}>

                      <img
                        alt="Movie poster"
                        className="rounded-lg object-cover aspect-[2/3] overflow-hidden"
                        height="200px"
                        src={memberInfo.fileBean && memberInfo.fileBean.src ? memberInfo.fileBean.src : ReactImg}
                        /*src={ReactImg}*/
                        width="150px"
                        style={{ borderRadius: '10px' }}
                      />

                      {/** 아이디 + 비밀번호 */}
                      <div>

                      {/* 아이디 칸*/}
                      <CInputGroup className="mb-3" style={{width: "350px", height: "40px"}}>
                        <CInputGroupText>
                          <CIcon icon={cilAddressBook}/>
                        </CInputGroupText>
                        <CFormInput name="loginId" placeholder="아이디" value={memberInfo.loginId} disabled></CFormInput>
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

                          {/* 비밀번호 변경 안함 버튼*/}
                          <CButton
                            color="dark"
                            variant="ghost"
                            style={{marginBottom : "5px", marginTop : "15px"}}
                            onClick={handlePasswordChangeClick}
                          >
                            <CIcon size="lg" color="dark"  icon={cilArrowCircleLeft}   />
                          </CButton>

                          {/* 비밀번호 칸*/}
                          <CInputGroup className="mb-1">
                            <CInputGroupText>
                              <CIcon icon={cilLockLocked} />
                            </CInputGroupText>
                            <CFormInput name="loginPassword" type="password" placeholder="비밀번호" onChange={changeMemberInfo} />
                          </CInputGroup>

                          {/* 비밀번호 확인 칸*/}
                          <CInputGroup className="">
                            <CInputGroupText>
                              <CIcon icon={cilLockLocked} />
                            </CInputGroupText>
                            <CFormInput name="loginPasswordConfirm" type="password" placeholder="비밀번호 확인" onChange={changeMemberInfo} />
                          </CInputGroup>
                        </>
                      )}
                      </div>

                    </div>

                    {/* 프로필 사진 수정 */}
                    <div className="mb-3" style={{display: "flex",  height : "55px"}}>
                      <CFormInput
                        type="file"
                        id="formFileMultiple"
                        style={{marginTop : "20px", width : "250px"}}
                        multiple
                        onChange={handleFileChange}
                      />
                      <CButton
                        color="secondary"
                        style={{marginTop : "20px", marginLeft : "10px"}}
                        /*onClick={profileImgUpload}*/
                      >
                        변경
                      </CButton>
                    </div>



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
                        <CButton color="secondary" onClick={openDaumPostcode} style={{ width: '100%', height: '100%'}}>
                          주소 검색
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

                    <div className="d-grid" style={{marginTop : "20px"}}>
                      <CButton color="dark" onClick={updateMemberInfo}>
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

  /** 내 정보 수정 버튼 클릭 */
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

      if(file){
        profileImgUpload();
      }

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


  /** 프사 조회 */
  function selectProfileImg(){

    axios({
      url: '/selectProfileImg',
      method: 'post',
      data: {
        memId : memberInfo.memId
      }
    })
      .then(function (res) {
        setMemberInfo(prevMemberInfo => ({
          ...prevMemberInfo, // 이전 상태의 모든 속성 복사
          fileBean: res.data.memVo.memberBean.fileBean // fileBean만 새로운 값으로 업데이트
        }));

      })
      .catch(function (err) {
      });

  }


  /** 프로필 사진 등록/변경 */
  function profileImgUpload() {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('memberInfo', JSON.stringify(memberInfo)); // movVo 객체를 직접 FormData에 추가

    return axios.post('/profileImgUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {


      })
      .catch(error => {
      });

  }









}




export default Profile
