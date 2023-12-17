import React, { useEffect, useState } from 'react'
import {
  CFormInput, CForm, CFormLabel, CFormTextarea,
  CFormSelect,
  CCol, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CTable
} from '@coreui/react'
import axios from "axios";



const MemberManage = () => {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/allInfo');
        setUserData(response.data.memData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>

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



            <CTableHeaderCell scope="col">수정/삭제</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
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
              <CTableDataCell>수정/삭제 버튼</CTableDataCell>
            </CTableRow>
          ))}

        </CTableBody>

      </CTable>

    </>
  ) //return








}

export default MemberManage
