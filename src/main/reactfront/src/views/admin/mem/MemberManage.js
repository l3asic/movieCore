import React, { useEffect, useState } from 'react'
import {
  CFormInput, CForm, CFormLabel, CFormTextarea,
  CFormSelect,
  CCol, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CTable
} from '@coreui/react'
import axios from "axios";
import GrayLine from "../../uitils/GrayLine";



const MemberManage = () => {


  // 영화 객체 관리
  const [memVo, setMemVo] = useState({
    memberBeanList : {}
  });



  useEffect(() =>{
    selectMemberList();
    }, []
  );

  return (
    <>

      <h4> 회원 관리 </h4>

      {/* 회색 가로줄 하나 */}
      <GrayLine marginTop="30px" marginBottom="30px" />

      <CTable hover striped>

        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">고유번호</CTableHeaderCell>
            <CTableHeaderCell scope="col">사용자 ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">사용자 명</CTableHeaderCell>
            <CTableHeaderCell scope="col">성별</CTableHeaderCell>
            <CTableHeaderCell scope="col">상태</CTableHeaderCell>
            <CTableHeaderCell scope="col">주소</CTableHeaderCell>
            <CTableHeaderCell scope="col">상세주소</CTableHeaderCell>
            <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
            <CTableHeaderCell scope="col">회원 등급</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        {/*<CTableBody>
          {userData.map((user) => (
            <CTableRow key={user.id}>
              <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
              <CTableDataCell>{user.userId}</CTableDataCell>
              <CTableDataCell>{user.userName}</CTableDataCell>
              <CTableDataCell>{user.gender}</CTableDataCell>
              <CTableDataCell>{user.status}</CTableDataCell>
              <CTableDataCell>{user.address}</CTableDataCell>
              <CTableDataCell>{user.detailAddress}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>dd</CTableDataCell>
            </CTableRow>
          ))}

        </CTableBody>*/}

      </CTable>

    </>
  ) //return


  /** 멤버 리스트 조회 */
  function selectMemberList() {

    axios({
      url: '/selectMemberList',
      method: 'post',
      data: {
        /*memberBean : {
          memId : "testid"
        }*/
      }
    })
      .then(function (res) {

        debugger;

        setMemVo((prevMemVo) => ({
          ...prevMemVo,
          memberBeanList: res.data.memVo.memberBeanList
        }));



      })
      .catch(function (err) {
        alert('(오류)');
      });
  }






}

export default MemberManage
