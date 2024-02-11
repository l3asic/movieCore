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
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from "axios";

const Login = () => {

  const navigate  = useNavigate();


  const [memberInfo, setMemberInfo] = useState({
    loginId: '',
    loginPassword: '',
    memName: '',
  });


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>

                      {/* 아이디 입력 */}
                      <CFormInput
                        placeholder="UserId"
                        autoComplete="username"
                        name="loginId"
                        onChange={changeMemberInfo}
                      />

                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>

                      {/* 비밀번호 입력 */}
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="loginPassword"
                        onChange={changeMemberInfo}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            LoginButtonClick();
                          }
                        }}
                      />

                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4"
                        onClick={LoginButtonClick}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )


  /** id pw 값 할당 */
  function changeMemberInfo(e){
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setMemberInfo({
      ...memberInfo, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });

  }




  /** 로그인 버튼 클릭시 */
  function LoginButtonClick() {
    // 추후 유효성 검사 추가 할것

    axios({
      url: '/authenticate',
      method: 'post',
      params: {
        loginId: memberInfo.loginId,
        loginPassword: memberInfo.loginPassword
      }
    })
      .then(function (res) {
        // 로그인 성공
        if(res.data.loginStatus == 'success'){

          // 로컬 스토리지에 데이터 담기
          localStorage.setItem('token', res.data.jwt.token);
          localStorage.setItem('loginId', res.data.userId);
          localStorage.setItem('memberBean', JSON.stringify(res.data.memberBean));

          // 스토리지에서 객체 추출 예시)
          // JSON.parse(localStorage.getItem('memberBean'));

          var welcomeMsg = '환영합니다 ' + res.data.memberBean.memName + ' 님' ;
          alert(welcomeMsg);

          // 로그인 후 메인으로 이동
          navigate('/dashboard');

        }else{
          alert('로그인 오류');
        }




      })
      .catch(function (res) {
        // 로그인 실패
        if(res.response.data.loginStatus == 'fail'){
          alert('id pw 를 확인 해주세요');
        }else{
          alert('로그인 오류');
        }

      });





  }


}




export default Login
