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
  CForm, CButton, CFormInput, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle
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

  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    selectMemberList();
  }, []);

  let [schFilter, setSchFilter] = useState('all');
  let [schText, setSchText] = useState('');
  let [sortKey, setSortKey] = useState('login_id');
  let [sortOdr, setSortOdr] = useState('asc');

  const searchFilter = event => {
    setSchFilter(event.target.value);
  };

  const searchText = event => {
    setSchText(event.target.value);
  };

  const sortColumn = (key) => {
    if (sortKey === key) {
      setSortOdr(sortOdr === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOdr('asc');
    }
    selectMemberList();
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setProfileImage(member.profileImage || null); // Load existing profile image if available
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedMember(null);
    setProfileImage(null);
  };

  const handleModalSave = () => {
    // Save logic here
    updateMember(selectedMember);
    handleModalClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    // Update selected member's profile image
    setSelectedMember(prev => ({
      ...prev,
      profileImage: URL.createObjectURL(file)
    }));
  };

  const selectMemberList = () => {
    axios({
      url: '/selectMemberList',
      method: 'post',
      data: {
        searchBean : {
          searchFilter: schFilter,
          searchText: schText,
          sortKey: sortKey,
          sortOdr: sortOdr
        }
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

          memberBeanList[i].selected = false;
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

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
    const updatedList = [...memVo.memberBeanList];
    updatedList.forEach((member) => (member.selected = !selectAll));
    setMemVo((prevMemVo) => ({ ...prevMemVo, memberBeanList: updatedList }));
  }

  const handleSelect = (memId) => {
    const updatedList = [...memVo.memberBeanList];
    const member = updatedList.find(m => m.memId === memId);
    if (member) {
      member.selected = !member.selected;
    }
    setMemVo((prevMemVo) => ({ ...prevMemVo, memberBeanList: updatedList }));
    setSelectAll(updatedList.every((member) => member.selected));
  }

  const searchMemberList = () => {
    selectMemberList();
  }

  const refreshFilterSearch = () => {
    setSchFilter('');
    setSchText('');
    setSortKey('');
    setSortOdr('');
    schFilter = '';
    schText = '';
    sortKey = '';
    sortOdr = '';
    selectMemberList();
  }

  const updateMemberState = (mode) => {
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
        alert(res.data.successMsg);
        selectMemberList();
      })
      .catch(function (err) {
        alert(err.data.successMsg);
      });
  }

  const updateMember = (member) => {
    const formData = new FormData();
    formData.append('memberBean', JSON.stringify(member));
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    axios({
      url: '/updateMember',
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(function (res) {
        alert('Member updated successfully');
        selectMemberList();
      })
      .catch(function (err) {
        alert('Update failed');
      });
  }

  return (
    <>
      <h4> 회원 관리 </h4>
      <GrayLine marginTop="30px" marginBottom="30px" />

      <CNavbar colorScheme="light" className="bg-light">
        <CContainer fluid style={{ padding: 0 }}>
          <div className="d-flex align-items-center">
            <CButton
              color="black" variant="outline"
              style={{ whiteSpace: 'nowrap', border: '1px solid gray', marginRight: '10px' }}
              title="회원 상태 정상으로 변경"
              onClick={() => updateMemberState('restore')}
            >
              <CIcon icon={cilRecycle} />
            </CButton>

            <CButton
              color="black" variant="outline"
              style={{ whiteSpace: 'nowrap', border: '1px solid gray', marginRight: '10px'}}
              title="회원 상태 삭제로 변경"
              onClick={() => updateMemberState('delete')}
            >
              <CIcon icon={cilTrash} />
            </CButton>

            <CNavbarBrand className="ms-3">Total : {memVo.memberBeanList.length}</CNavbarBrand>
          </div>

          <CForm className="d-flex">
            <CFormSelect
              style={{ marginRight: '5px' }}
              options={[
                { label: '전체', value: 'all' },
                { label: '사용자 고유번호', value: 'memId' },
                { label: '사용자 ID', value: 'loginId' },
                { label: '사용자 명', value: 'memName' },
                { label: '성별', value: 'gender' },
                { label: '상태', value: 'state' }
              ]}
              onChange={searchFilter} value={schFilter}
            />

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
            <CTableHeaderCell scope="col">고유번호<CIcon icon={cilSwapVertical} onClick={() => sortColumn('mem_id')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">사용자 ID<CIcon icon={cilSwapVertical} onClick={() => sortColumn('login_id')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">사용자 명<CIcon icon={cilSwapVertical} onClick={() => sortColumn('mem_name')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">성별<CIcon icon={cilSwapVertical} onClick={() => sortColumn('gender')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">상태<CIcon icon={cilSwapVertical} onClick={() => sortColumn('state')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">주소</CTableHeaderCell>
            <CTableHeaderCell scope="col">상세주소</CTableHeaderCell>
            <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
            <CTableHeaderCell scope="col">회원 등급<CIcon icon={cilSwapVertical} onClick={() => sortColumn('mem_role')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">가입일<CIcon icon={cilSwapVertical} onClick={() => sortColumn('mem_create_date')} /></CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {memVo.memberBeanList.map((memberBean) => (
            <CTableRow key={memberBean.memId} onClick={() => handleEdit(memberBean)}>
              <CTableDataCell>
                <CFormCheck
                  checked={memberBean.selected || selectAll}
                  onChange={() => handleSelect(memberBean.memId)}
                />
              </CTableDataCell>
              <CTableDataCell>{memberBean.memId}</CTableDataCell>
              <CTableDataCell>{memberBean.loginId}</CTableDataCell>
              <CTableDataCell>{memberBean.memName}</CTableDataCell>
              <CTableDataCell>
                {memberBean.gender === 'M' ? '남성' : memberBean.gender === 'F' ? '여성' : '미상'}
              </CTableDataCell>
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

      {selectedMember && (
        <CModal visible={showModal} onClose={handleModalClose}>
          <CModalHeader onClose={handleModalClose}>
            <CModalTitle>회원 정보 수정</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="text-center mb-3">
                {selectedMember.profileImage ? (
                  <img
                    src={selectedMember.profileImage}
                    alt="프로필 이미지"
                    className="img-thumbnail"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="img-thumbnail"
                    style={{ width: '150px', height: '150px', lineHeight: '150px', textAlign: 'center', backgroundColor: '#f0f0f0' }}
                  >
                    No Image
                  </div>
                )}
                <div className="mt-2">
                  <CFormInput type="file" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>
              <CFormInput
                label="사용자 명"
                value={selectedMember.memName}
                name="memName"
                onChange={handleInputChange}
              />
              <CFormSelect
                label="성별"
                value={selectedMember.gender}
                name="gender"
                onChange={handleInputChange}
              >
                <option value="M">남성</option>
                <option value="F">여성</option>
                <option value="">미상</option>
              </CFormSelect>
              <CFormInput
                label="주소"
                value={selectedMember.address}
                name="address"
                onChange={handleInputChange}
              />
              <CFormInput
                label="상세주소"
                value={selectedMember.addressInfo}
                name="addressInfo"
                onChange={handleInputChange}
              />
              <CFormInput
                label="이메일"
                value={selectedMember.email}
                name="email"
                onChange={handleInputChange}
              />
              <CFormSelect
                label="회원 등급"
                value={selectedMember.memRole}
                name="memRole"
                onChange={handleInputChange}
              >
                <option value="ADMIN">관리자</option>
                <option value="USER">사용자</option>
              </CFormSelect>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={handleModalClose}>취소</CButton>
            <CButton color="primary" onClick={handleModalSave}>저장</CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  );
}

export default MemberManage;
