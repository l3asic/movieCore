import React, { useEffect, useState } from 'react'
import {
  CNav, CNavItem, CNavLink
} from '@coreui/react'
import axios from "axios";
import FolderListTab from "./FolderListTab";
import BoardListTab from "./BoardListTab";
import { cilClipboard, cilFolder } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const FolderBoardList = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tabIndex) => {
    if (activeTab !== tabIndex) {
      setActiveTab(tabIndex);
    }
  };

  return (
    <>
      {/** 상단 탭 네비 */}
      <CNav variant="pills">
        <CNavItem>
          <CNavLink onClick={() => toggleTab(0)} active={activeTab === 0}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CIcon icon={cilFolder} style={{ marginRight: '10px' }} />
              폴더 리스트
            </div>
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => toggleTab(1)} active={activeTab === 1}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CIcon icon={cilClipboard} style={{ marginRight: '10px' }} />
              게시판 리스트
            </div>
          </CNavLink>
        </CNavItem>
      </CNav>

      {/** 탭 컨텐트 영역 */}
      <div className="mt-4">
        {activeTab === 0 && <FolderListTab />}
        {activeTab === 1 && <BoardListTab />}
      </div>
    </>
  );
};

export default FolderBoardList;
