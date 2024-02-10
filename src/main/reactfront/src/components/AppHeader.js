import React, { useState, useEffect } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons';
import loginIcon from '../assets/brand/loginIcon.png';
import { AppBreadcrumb } from './index';
import { AppHeaderDropdown } from './header/index';
import { logo } from 'src/assets/brand/logo';

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [isLogin, setIsLogin] = useState(false);
  const navigate  = useNavigate();

  useEffect(() => {
    // 페이지에 접근할 때마다 로컬 스토리지에서 'token' 키값을 확인하여 로그인 상태를 설정
    const token = localStorage.getItem('token');
    setIsLogin(token ? true : false);
  }, []);


  // 로그아웃 버튼 클릭 시 (로그아웃 처리 함수)
  const handleLogout = () => {
    alert("로그아웃 되었습니다.");

    localStorage.removeItem('memberBean');
    localStorage.removeItem('loginId');
    localStorage.removeItem('token');

    // isLogin 상태값 업데이트
    setIsLogin(false);

    // 메인화면으로 (새로고침)
    navigate('/#/dashboard');

  };


  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/register">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>

          {/* 로그인 화면 이동 아이콘 부분 */}
          {!isLogin && (
            <CNavItem style={{ marginBottom: '30px' }}>
              <CNavLink href="#/login" style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '5px' }}>
                  <img src={loginIcon} alt="Login Icon" style={{ width: '22px', height: '22px' }} />
                </div>
                Login Now
              </CNavLink>
            </CNavItem>
          )}

        </CHeaderNav>

        {/* 프로필 이미지 부분 (로그인 시에만 렌더링) */}
        {isLogin && (
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown onLogout={handleLogout} />
          </CHeaderNav>
        )}

      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
