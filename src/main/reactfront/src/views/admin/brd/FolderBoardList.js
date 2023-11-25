import React, { useEffect, useState } from 'react'
import {
  CNav, CNavItem, CNavLink

} from '@coreui/react'
import axios from "axios";
import FolderListTab from "./FolderListTab";
import BoardListTab from "./BoardListTab";



const FolderBoardList = () => {

  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tabIndex) => {
    if (activeTab !== tabIndex) {
      setActiveTab(tabIndex);
    }
    console.log("탭인덱스 : " + activeTab)
  };



  return (
    <>

      <h3 className="pb-lg-3"> 폴더/게시판 관리</h3>


      {/** 상단 탭 네비 */}
      <CNav variant="pills" >
        <CNavItem>
          <CNavLink  onClick={() => toggleTab(0)} active={activeTab === 0}>
            폴더 리스트 탭
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => toggleTab(1)} active={activeTab === 1}>
            게시판 리스트 탭
          </CNavLink>
        </CNavItem>
      </CNav>


      {/** 탭 컨텐트 영역 */}
      <div className="mt-4">
        {activeTab === 0 && <FolderListTab />}
        {activeTab === 1 && <BoardListTab />}
      </div>






    </>
  ) //return








}

export default FolderBoardList
