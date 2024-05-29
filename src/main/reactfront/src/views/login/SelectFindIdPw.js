import React from 'react';
import {CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CButton, CCardImage} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import findIdImg from 'src/assets/images/uiImg/findIdImg.webp'
import findPwImg from 'src/assets/images/uiImg/findPwImg.webp'



const SelectFindIdPw = () => {
  const navigate = useNavigate();

  const handleFindId = () => {
    navigate('/login/FindId');  // ID 찾기 페이지로 이동
  };

  const handleFindPw = () => {
    navigate('/login/FindPassword');  // PW 찾기 페이지로 이동
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row mt-5 justify-content-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CRow>
              <CCol md={6}>
                <CCard className="mx-4 my-4">
                  <CCardBody className="text-center">
                    <CCardImage
                      src={findIdImg}
                      style={{
                        marginTop : "30px",
                        marginBottom : "30px",
                      }}
                    >
                    </CCardImage>
                    <p>아이디를 잊으셨나요?</p>
                    <CButton color="dark" onClick={handleFindId} className="mt-3 mb-3 w-50">
                      ID 찾기
                    </CButton>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol md={6}>

                <CCard className="mx-4 my-4">
                  <CCardBody className="text-center">
                    <CCardImage
                      src={findPwImg}
                      style={{
                        marginTop : "30px",
                        marginBottom : "30px",
                      }}
                    >
                    </CCardImage>
                    <p>비밀번호를 잊으셨나요?</p>
                    <CButton color="dark" onClick={handleFindPw} className="mt-3 mb-3 w-50">
                      PW 찾기
                    </CButton>
                  </CCardBody>

                </CCard>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default SelectFindIdPw;
