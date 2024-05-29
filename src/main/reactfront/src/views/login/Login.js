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
import loginImg from "../../assets/images/uiImg/loginImg.webp";

const Login = () => {

  const navigate  = useNavigate();


  const [memberInfo, setMemberInfo] = useState({
    loginId: '',
    loginPassword: '',
    memName: '',
  });


  return (
    <div className="bg-light min-vh-100 d-flex flex-row /*align-items-center*/"
    style={{ marginTop : "150px"}}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody className="mt-5">
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
                      <CCol xs={4}>
                        <CButton color="dark" className="px-4"
                        onClick={LoginButtonClick}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={8} className="text-right">
                        <CButton
                          onClick={() => navigate('/login/SelectFindIdPw')}
                          color="link" className="px-0">
                          ID / Password를 잊으셨나요?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <img
                    alt="Movie poster"
                    className="rounded-lg object-cover aspect-[2/3] overflow-hidden"
                    height="250"
                    src={loginImg}
                    width="320"
                    style={{ borderRadius: '10px' }}
                  />
                  <div>
                    <h5 className="mt-3 mb-xl-4">아직 회원이 아니신가요?</h5>
                    <Link to="/login/Register">
                      <CButton color="dark" className="mt-3" active tabIndex={-1}>
                        회원 가입
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

    // 유효성 검사 수행
    if (!validateLoginInfo()) {
      return;
    }

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
          localStorage.setItem('memRole', res.data.memRole);
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
          alert('id 혹은 pw 를 확인 해주세요');
        }else{
          alert('로그인 오류');
        }

      });





  }


  /** 로그인 유효성 검사  */
  function validateLoginInfo() {
    const { loginId, loginPassword } = memberInfo;

    // 아이디와 비밀번호가 비어 있는지 확인
    if (!loginId || !loginPassword) {
      alert('아이디와 비밀번호를 모두 입력해주세요');
      return false;
    }

    // 비밀번호에 공백이 포함되어 있는지 검사
    if (/\s/.test(loginPassword)) {
      alert('비밀번호에는 공백이 포함될 수 없습니다');
      return false;
    }

    // 아이디와 비밀번호가 모두 입력되어 있다면 유효성 검사 통과
    return true;
  }


}




export default Login
