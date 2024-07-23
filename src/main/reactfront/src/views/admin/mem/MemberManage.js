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
  CForm,
  CButton,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInputGroup,
  CInputGroupText, CBadge
} from "@coreui/react";
import axios from "axios";
import dayjs from 'dayjs'; // 날짜 형식을 위한 라이브러리 추가
import GrayLine from "../../uitils/GrayLine";
import {
  cilLoopCircular,
  cilTrash,
  cilSwapVertical,
  cilMagnifyingGlass,
  cilRecycle,
  cilRoom,
  cilUser,
  cilEnvelopeOpen,
  cilGroup,
  cilLockLocked,
  cilArrowCircleLeft, cilMovie
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
  const [selectedMember, setSelectedMember] = useState({
    memId: '',
    memName: '',
    gender: '',
    address: '',
    addressInfo: '',
    email: '',
    memRole: '',
    profileImage: null,
    fileBean: {
      src: null
    },
    changePassword: false,
    loginPassword: '',
    loginPasswordConfirm: ''
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    selectMemberList();

    // Daum 우편번호 서비스 스크립트 로드
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
      // Daum 우편번호 서비스 초기화
      new window.daum.Postcode({
        oncomplete: function (data) {
          const fullAddress = data.address;
          setSelectedMember(prev => ({
            ...prev,
            address: fullAddress
          }));
        },
      });
    };
    document.body.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.body.removeChild(script);
    };
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
    // 선택된 사용자 프로필 사진 조회
    selectProfileImg(member.memId);
    setProfileImage(member.profileImage || null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedMember({
      memName: '',
      gender: '',
      address: '',
      addressInfo: '',
      email: '',
      memRole: '',
      profileImage: null,
      fileBean: {
        src: null
      },
      changePassword: false,
      loginPassword: '',
      loginPasswordConfirm: ''
    });
    setProfileImage(null);
  };

  const handleModalSave = () => {
    if (!validateMemberInfo()) {
      return;
    }
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
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedMember(prev => ({
          ...prev,
          fileBean: {
            ...prev.fileBean,
            src: e.target.result
          }
        }));
      };
      reader.readAsDataURL(file);
      setProfileImage(file);
    }
  };

  const selectMemberList = () => {
    axios({
      url: '/selectMemberList',
      method: 'post',
      data: {
        searchBean: {
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
  };

  /** 선택된 사용자 프사 조회 */
  const selectProfileImg = (memId) => {
    axios({
      url: '/selectProfileImg',
      method: 'post',
      data: {
        memId: memId
      }
    })
      .then(function (res) {
        setProfileImage(res.data.memVo.memberBean.fileBean.src);

        setSelectedMember(prevSelectedMember => ({
          ...prevSelectedMember, // 이전 상태의 모든 속성 복사
          fileBean: res.data.memVo.memberBean.fileBean // fileBean만 새로운 값으로 업데이트
        }));

      })
      .catch(function (err) {
      });
  };

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
    const updatedList = [...memVo.memberBeanList];
    updatedList.forEach((member) => (member.selected = !selectAll));
    setMemVo((prevMemVo) => ({ ...prevMemVo, memberBeanList: updatedList }));
  };

  const handleSelect = (memId) => {
    const updatedList = [...memVo.memberBeanList];
    const member = updatedList.find(m => m.memId === memId);
    if (member) {
      member.selected = !member.selected;
    }
    setMemVo((prevMemVo) => ({ ...prevMemVo, memberBeanList: updatedList }));
    setSelectAll(updatedList.every((member) => member.selected));
  };

  const searchMemberList = () => {
    selectMemberList();
  };

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
  };

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
  };

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
  };

  const validateMemberInfo = () => {
    const { memName, gender, address, email } = selectedMember;
    if (!memName || !gender || !address) {
      alert('필수 항목을 입력하세요.');
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailRegex.test(email)) {
      alert('유효한 이메일 주소를 입력하세요.');
      return false;
    }
    return true;
  };

  const openDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address;
        setSelectedMember(prev => ({
          ...prev,
          address: fullAddress
        }));
      }
    }).open();
  };

  const toggleChangePassword = () => {
    setSelectedMember(prev => ({
      ...prev,
      changePassword: !prev.changePassword,
      loginPassword: '',
      loginPasswordConfirm: ''
    }));
  };

  return (
    <>

      <h4 className="mb-4 d-flex align-items-center">
        <CIcon icon={cilUser} size="xl" className="me-2" style={{ fontSize: '2rem' }} />
        회원 관리
      </h4>

      <GrayLine marginTop="30px" marginBottom="30px" />

      <CNavbar colorScheme="light" className="bg-light">
        <CContainer fluid style={{ padding: 0 }}>
          <div className="d-flex align-items-center mb-3">
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
              style={{ whiteSpace: 'nowrap', border: '1px solid gray', marginRight: '10px' }}
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
                style={{cursor: "pointer"}}
                checked={selectAll}
                onChange={() => handleSelectAll()}
              />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">고유번호<CIcon icon={cilSwapVertical} style={{cursor: "pointer"}} onClick={() => sortColumn('mem_id')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">사용자 ID<CIcon icon={cilSwapVertical} style={{cursor: "pointer"}} onClick={() => sortColumn('login_id')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">사용자 명<CIcon icon={cilSwapVertical} style={{cursor: "pointer"}} onClick={() => sortColumn('mem_name')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">성별<CIcon icon={cilSwapVertical} style={{cursor: "pointer"}} onClick={() => sortColumn('gender')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">주소</CTableHeaderCell>
            <CTableHeaderCell scope="col">상세주소</CTableHeaderCell>
            <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
            <CTableHeaderCell scope="col">회원 등급<CIcon icon={cilSwapVertical} style={{cursor: "pointer"}} onClick={() => sortColumn('mem_role')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">가입일<CIcon icon={cilSwapVertical} style={{cursor: "pointer"}} onClick={() => sortColumn('mem_create_date')} /></CTableHeaderCell>
            <CTableHeaderCell scope="col">상태<CIcon icon={cilSwapVertical} style={{cursor: "pointer"}} onClick={() => sortColumn('state')} /></CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {memVo.memberBeanList.map((memberBean) => (
            <CTableRow key={memberBean.memId} >
              <CTableDataCell>
                <CFormCheck style={{cursor: "pointer"}}
                  checked={memberBean.selected || selectAll}
                  onChange={() => handleSelect(memberBean.memId)}
                />
              </CTableDataCell>
              <CTableDataCell onClick={() => handleEdit(memberBean)} style={{cursor: "pointer"}}>{memberBean.memId}</CTableDataCell>
              <CTableDataCell>{memberBean.loginId}</CTableDataCell>
              <CTableDataCell onClick={() => handleEdit(memberBean)} style={{cursor: "pointer"}}>{memberBean.memName}</CTableDataCell>
              <CTableDataCell>
                {memberBean.gender === 'M' ? '남성' : memberBean.gender === 'F' ? '여성' : '미상'}
              </CTableDataCell>
              <CTableDataCell>{memberBean.address}</CTableDataCell>
              <CTableDataCell>{memberBean.addressInfo}</CTableDataCell>
              <CTableDataCell>{memberBean.email}</CTableDataCell>
              <CTableDataCell>{memberBean.memRole === 'ADMIN' ? '관리자' : '사용자'}</CTableDataCell>
              <CTableDataCell>{dayjs(memberBean.memCreateDate).format('YYYY.MM.DD')}</CTableDataCell>
              <CTableDataCell>
                <CBadge color={memberBean.state === "B" ? "primary" : "danger"}>
                  {memberBean.state === 'B' ? '정상' : '삭제'}
                </CBadge>
              </CTableDataCell>
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
                {selectedMember.fileBean && selectedMember.fileBean.src ? (
                  <img
                    src={selectedMember.fileBean.src}
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
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="사용자 명"
                  value={selectedMember.memName}
                  name="memName"
                  onChange={handleInputChange}
                />
              </CInputGroup>

              {selectedMember.changePassword ? (
                <>

                  <CButton
                    color="dark"
                    style={{ width: '50%', height: '35px', marginBottom: '20px' }}
                    onClick={toggleChangePassword}
                  >
                    <CIcon icon={cilLockLocked} /> 비밀번호 변경
                  </CButton>



                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="비밀번호"
                      type="password"
                      value={selectedMember.loginPassword}
                      name="loginPassword"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="비밀번호 확인"
                      type="password"
                      value={selectedMember.loginPasswordConfirm}
                      name="loginPasswordConfirm"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                </>
              ) : (
                <CButton
                  color="dark"
                  style={{ width: '50%', height: '35px', marginTop: '30px' , marginBottom : '30px'}}
                  onClick={toggleChangePassword}
                >
                  <CIcon icon={cilLockLocked} /> 비밀번호 변경
                </CButton>
              )}



              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilGroup} />
                </CInputGroupText>
                <CFormSelect
                  value={selectedMember.gender}
                  name="gender"
                  onChange={handleInputChange}
                >
                  <option value="M">남성</option>
                  <option value="F">여성</option>
                  <option value="">성별을 밝히지 않음</option>
                </CFormSelect>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilRoom} />
                </CInputGroupText>
                <CFormInput
                  placeholder="주소명"
                  value={selectedMember.address}
                  name="address"
                  onChange={handleInputChange}
                />
                <CButton
                  color="secondary"
                  onClick={openDaumPostcode}
                >
                  주소 검색
                </CButton>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilRoom} />
                </CInputGroupText>
                <CFormInput
                  placeholder="상세주소"
                  value={selectedMember.addressInfo}
                  name="addressInfo"
                  onChange={handleInputChange}
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilEnvelopeOpen} />
                </CInputGroupText>
                <CFormInput
                  placeholder="이메일"
                  value={selectedMember.email}
                  name="email"
                  onChange={handleInputChange}
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormSelect
                  value={selectedMember.memRole}
                  name="memRole"
                  onChange={handleInputChange}
                >
                  <option value="ADMIN">관리자</option>
                  <option value="ROLE_USER">사용자</option>
                </CFormSelect>
              </CInputGroup>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={handleModalClose}>취소</CButton>
            <CButton color="dark" onClick={handleModalSave}>저장</CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  );
}

export default MemberManage;
