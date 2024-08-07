import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CBadge, CNavGroup, CNavItem } from '@coreui/react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import {cilClipboard, cilFolder} from '@coreui/icons';

export const AppSidebarNav = ({ items }) => {
  const location = useLocation();

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const [navItems, setNavItems] = useState(items);

  useEffect(() => {
    const selectAllFolderBoardList = async () => {
      try {
        const res = await axios.post('/selectAllFolderBoardList');
        const brdVo = res.data.brdVo;
        const folderList = brdVo.folderBeanList;

        const updatedItems = [...items];

        // 폴더 렌더링 위치 (게시글 작성 다음칸)
        let startFolderIndex = 0;
        for (let i = 0; i < updatedItems.length; i++) {
          if(updatedItems[i].name == "게시글 작성"){
            startFolderIndex = i+1;
            break;
          }
        }

        for (let i = 0; i < folderList.length; i++) {
          const folderBean = folderList[i];
          const boardList = folderList[i].boardBeanList;

          const boardItemList = [];

          // 예외처리 => 폴더에 게시판이 없어도 boardBeanList의 size가 있음 (매퍼 리절트맵 문제)
          if(boardList && boardList.length > 0 && boardList[0].brdId != null){
            for (let j = 0; j < boardList.length; j++) {
              const boardBean = boardList[j];

              const boardItem = {
                component: CNavItem,
                name: boardBean.brdName,
                to: '/brd/ArticleListView?brdId=' + boardBean.brdId,
                icon: <CIcon icon={cilClipboard} customClassName="nav-icon" style={{ paddingLeft : "30px", marginRight : "10px" }} />,
              };

              boardItemList.push(boardItem);
            }
          }

          const folderItem = {
            component: CNavGroup,
            name: folderBean.folName,
            to: '/base',
            icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
            items: boardItemList,
          };

          updatedItems.splice(startFolderIndex + i, 0, folderItem);
        }

        setNavItems(updatedItems);
      } catch (err) {
        alert('등록 실패 (오류)');
      }
    };

    selectAllFolderBoardList();
  }, []); // Call selectAllFolderBoardList only once on component mount

  const navItem = (item, index) => {

    // 관리자 모듈 예외 처리
    if (item.name === '관리자' && localStorage.getItem('memRole') !== 'ADMIN') {
      return null;
    }

    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {

    // 관리자 모듈 예외 처리
    if(item.name == "관리자" && localStorage.getItem('memRole') != "ADMIN"){
      return null;
    }

    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {navItems &&
        navItems.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
