import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormCheck,
  CNavbar,
  CContainer,
  CNavbarBrand,
  CForm, CButton, CFormInput, CFormSelect
} from "@coreui/react";
import axios from "axios";
import dayjs from 'dayjs'; // 날짜 형식을 위한 라이브러리 추가
import GrayLine from "../../uitils/GrayLine";
import {
  cilLoopCircular,
  cilTrash,
  cilSwapVertical,
  cilMagnifyingGlass,
  cilRecycle
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const MemberManage = () => {
  // 회원 객체 관리
  const [memVo, setMemVo] = useState({
    memberBeanList: [],
    searchBean: {
      schFilter: "",
      schText: "",
    },
  });

  // 체크박스 관리
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    selectMemberList();
  }, []);

  // 검색조건 및 검색어 관리
  let [schFilter, setSchFilter] = useState('');
  let [schText, setSchText] = useState('');
  let [sortKey, setSortKey] = useState(); // 정렬 기준 컬럼
  let [sortOdr, setSortOdr] = useState(); // 정렬 순서

  const searchFilter = event => {
    setSchFilter(event.target.value);
  };

  const searchText = event => {
    setSchText(event.target.value);
  };

  // 정렬 함수
  const sortColumn = (key) => {
    if (sortKey === key) {
      // 동일한 컬럼을 클릭한 경우 정렬 순서를 변경
      setSortOdr(sortOdr === 'asc' ? 'desc' : 'asc');
    } else {
      // 다른 컬럼을 클릭한 경우 정렬 기준을 변경하고 기본 순서는 오름차순으로 설정
      setSortKey(key);
      setSortOdr('asc');
    }
    selectMemberList();
  };

  return (
    <>
      <h4> 회원 관리 </h4>

      {/* 회색 가로줄 하나 */}
      <GrayLine marginTop="30px" marginBottom="30px" />

      {/** 상단 네비 */}
      <CNavbar colorScheme="light" className="bg-light">
        <CContainer fluid style={{ padding: 0 }}>
          <div className="d-flex align-items-center">

            {/** 복원 버튼 */}
            <CButton
              color="black" variant="outline"
              style={{ whiteSpace: 'nowrap', border: '1px solid gray', marginRight: '10px' }}
              title="회원 상태 정상으로 변경"
              onClick={() => updateMemberState('restore')}
            >
              <CIcon icon={cilRecycle} />
            </CButton>

            {/** 삭제 버튼 */}
            <CButton
              color="black" variant="outline"
              style={{ whiteSpace: 'nowrap', border: '1px solid gray', marginRight: '10px'}}
              title="회원 상태 삭제로 변경"
              onClick={() => updateMemberState('delete')}
            >
              <CIcon icon={cilTrash} />
            </CButton>

            {/** 토탈 갯수 */}
            <CNavbarBrand className="ms-3">Total : {memVo.memberBeanList.length}</CNavbarBrand>
          </div>

          <CForm className="d-flex">
            {/* 검색조건 */}
            <CFormSelect
              style={{ marginRight: '5px' }}
              options={[
                { label: '전체', value: 'all' },
                { label: '사용자 ID', value: 'loginId' },
                { label: '사용자 명', value: 'memName' },
                { label: '성별', value: 'gender' },
                { label: '상태', value: 'state' }
              ]}
              onChange={searchFilter} value={schFilter}
            />

            {/* 검색어 */}
            <CFormInput
              type="search"
              className="me-2"
              placeholder="Search"
              onChange={searchText}
              value={schText}
              name={schText}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  searchMemberList();
                }
              }}
            />

            <CButton
              color="black"
              variant="outline"
              className="me-2"
              style={{ whiteSpace: 'nowrap', border: '1px solid gray' }}
              onClick={searchMemberList}
              id="searchBtn"
            >
              <CIcon icon={cilMagnifyingGlass} />
            </CButton>

            {/* 초기화 */}
            <CButton
              color="black"
              variant="outline"
              style={{ whiteSpace: 'nowrap', border: '1px solid gray' }}
              onClick={refreshFilterSearch}>
              <CIcon icon={cilLoopCircular} />
            </CButton>
          </CForm>
        </CContainer>
      </CNavbar>

      <CTable hover striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">
              <CFormCheck
                id="selectAllCheckBox"
                checked={selectAll}
                onChange={() => handleSelectAll()}
              />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">고유번호<CIcon icon={cilSwapVertical} onClick={() => sortColumn('memId')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">사용자 ID<CIcon icon={cilSwapVertical} onClick={() => sortColumn('loginId')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">사용자 명<CIcon icon={cilSwapVertical} onClick={() => sortColumn('memName')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">성별<CIcon icon={cilSwapVertical} onClick={() => sortColumn('gender')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">상태<CIcon icon={cilSwapVertical} onClick={() => sortColumn('state')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">주소</CTableHeaderCell>
            <CTableHeaderCell scope="col">상세주소</CTableHeaderCell>
            <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
            <CTableHeaderCell scope="col">회원 등급<CIcon icon={cilSwapVertical} onClick={() => sortColumn('memRole')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">가입일<CIcon icon={cilSwapVertical} onClick={() => sortColumn('memCreateDate')} /></CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {memVo.memberBeanList.map((memberBean) => (
            <CTableRow key={memberBean.memId}>
              <CTableDataCell>
                <CFormCheck
                  checked={memberBean.selected || selectAll}
                  onChange={() => handleSelect(memberBean.memId)}
                />
              </CTableDataCell>
              <CTableDataCell>{memberBean.memId}</CTableDataCell>
              <CTableDataCell>{memberBean.loginId}</CTableDataCell>
              <CTableDataCell>{memberBean.memName}</CTableDataCell>
              <CTableDataCell>{memberBean.gender === 'M' ? '남성' : '여성'}</CTableDataCell>
              <CTableDataCell>{memberBean.state === 'B' ? '정상' : '삭제'}</CTableDataCell>
              <CTableDataCell>{memberBean.address}</CTableDataCell>
              <CTableDataCell>{memberBean.addressInfo}</CTableDataCell>
              <CTableDataCell>{memberBean.email}</CTableDataCell>
              <CTableDataCell>{memberBean.memRole === 'ADMIN' ? '관리자' : '사용자'}</CTableDataCell>
              <CTableDataCell>{dayjs(memberBean.memCreateDate).format('YYYY.MM.DD')}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  ); //return

  /** 멤버 리스트 조회 */
  function selectMemberList() {
    axios({
      url: '/selectMemberList',
      method: 'post',
      data: {
        /*memberBean : {
          memId : "testid"
        }*/
        searchFilter: schFilter,
        searchText: schText,
        sortKey: sortKey, // 정렬 기준 컬럼
        sortOdr: sortOdr // 정렬 순서
      }
    })
      .then(function (res) {
        const memberBeanList = res.data.memVo.memberBeanList;

        for (var i = 0; i < memberBeanList.length; i++) {
          if (memberBeanList[i].state === "B") {
            memberBeanList[i].stateText = "정상";
          } else if (memberBeanList[i].state === "D") {
            memberBeanList[i].stateText = "삭제";
          }

          memberBeanList[i].selected = false; // 선택 속성 초기화
        }

        setMemVo((prevMemVo) => ({
          ...prevMemVo,
          memberBeanList: memberBeanList
        }));
      })
      .catch(function (err) {
        alert('(오류)');
      });
  }

  /** 체크박스 전체 선택*/
  function handleSelectAll() {
    setSelectAll((prev) => !prev);
    const updatedList = [...memVo.memberBeanList];
    updatedList.forEach((member) => (member.selected = !selectAll));
    setMemVo((prevMemVo) => ({ ...prevMemVo, memberBeanList: updatedList }));
  }

  function handleSelect(memId) {
    const updatedList = [...memVo.memberBeanList];
    const member = updatedList.find(m => m.memId === memId);
    if (member) {
      member.selected = !member.selected;
    }
    setMemVo((prevMemVo) => ({ ...prevMemVo, memberBeanList: updatedList }));
    setSelectAll(updatedList.every((member) => member.selected));
  }

  /** 검색 버튼 클릭 시 */
  function searchMemberList() {
    selectMemberList();
  }

  /** 검색, 필터 초기화  */
  function refreshFilterSearch() {
    // 검색조건 및 검색어 초기화 (강제로 즉시 초기화)
    setSchFilter('');
    setSchText('');

    // 정렬 초기화
    setSortKey('');
    setSortOdr('');

    // 초기화된 조건으로 리스트 조회
    selectMemberList();
  }

  /** 회원 상태 정상/삭제 로 변경 */
  function updateMemberState(mode) {
    // 체크된 회원 목록 필터링
    const selectedMembers = memVo.memberBeanList.filter(member => member.selected);

    axios({
      url: '/updateMemberState',
      method: 'post',
      data: {
        memberBeanList: selectedMembers,
        mode: mode
      }
    })
      .then(function (res) {
        // 상태 변경 성공 시 처리
        alert(res.data.successMsg);
        // 상태 변경 후 회원 목록 다시 불러오기
        selectMemberList();
      })
      .catch(function (err) {
        // 상태 변경 실패 시 메세지
        alert(err.data.successMsg);
      });
  }
}

export default MemberManage;
