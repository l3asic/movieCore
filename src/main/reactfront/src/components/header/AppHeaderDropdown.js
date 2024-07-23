import React, {useState} from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout, cilHeart
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import ReactImg from "../../assets/images/react.jpg";

const AppHeaderDropdown = ({ onLogout }) => {

  const [memberInfo, setMemberInfo] = useState(JSON.parse(localStorage.getItem('memberBean')));

  const navigate = useNavigate();

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar
          src={memberInfo.fileBean && memberInfo.fileBean.src ? memberInfo.fileBean.src : avatar8}
          size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem
          onClick={MoveToProfile}
        >
          <CIcon
            icon={cilUser}
            className="me-2 text-dark"
          />
          내 정보 관리
        </CDropdownItem>

        <CDropdownItem
          onClick={MoveToMyFavMovie}
        >
          <CIcon icon={cilHeart} className="me-2 text-danger" />
          내가 찜한 영화
        </CDropdownItem>

        {/*<CDropdownItem href="#/login">
          <CIcon icon={cilBell} className="me-2" />
          로그인
        </CDropdownItem>*/}

        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>

        <CDropdownDivider />
        {/*<CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>*/}

        {/** 로그아웃 버튼*/}
        <CDropdownItem
          onClick={onLogout}
        >
          <CIcon icon={cilAccountLogout} className="me-2 text-black"
                 />
          로그아웃
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )



  /** 내 정보 페이지로 이동 */
  function MoveToProfile(){
    navigate('/member/myInformation/CheckPassword');
  }

  /** 내가 찜한 영화 페이지로 이동 */
  function MoveToMyFavMovie(){
    navigate('/member/favMov/MyFavMovie');
  }

}

// props 유효성 검사
AppHeaderDropdown.propTypes = {
  onLogout: PropTypes.func.isRequired, // onLogout이 함수 타입이고 필수로 전달되어야 함
};

export default AppHeaderDropdown
