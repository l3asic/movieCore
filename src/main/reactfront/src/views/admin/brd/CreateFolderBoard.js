import React, { useState } from 'react';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react';
import FolderTab from "./FolderTab";
import BoardTab from "./BoardTab";

const CreateFolderBoard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tabIndex) => {
    if (activeTab !== tabIndex) {
      setActiveTab(tabIndex);
    }
    console.log("탭인덱스 : " + activeTab)
  };

  return (
    <>
      {/** 상단 탭 네비 */}
      <CNav variant="pills" className="mb-5">
        <CNavItem>
          <CNavLink  onClick={() => toggleTab(0)} active={activeTab === 0}>
            폴더 생성 탭
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => toggleTab(1)} active={activeTab === 1}>
            게시판 생성 탭
          </CNavLink>
        </CNavItem>
      </CNav>


      {/** 탭 컨텐트 영역 */}
      <div>
        {activeTab === 0 && <FolderTab />}
        {activeTab === 1 && <BoardTab />}
      </div>

    </>
  );
};

export default CreateFolderBoard;
