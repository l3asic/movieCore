import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormCheck,
  CNavbar,
  CContainer,
  CNavbarBrand,
  CForm,
  CButton,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import {
  cilLoopCircular,
  cilTrash,
  cilSwapVertical,
  cilMagnifyingGlass,
  cilRecycle,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import Paging from "../../uitils/Paging"; // 페이징 컴포넌트 가져오기
import GrayLine from "../../uitils/GrayLine";

function FolderListTab() {
  const [brdVo, setBrdVo] = useState({
    folderBeanList: [],
    paging: {
      totalItems: 0,
      currentPage: 0,
    },
    searchBean: {
      schFilter: "",
      schText: "",
    },
  });

  const [selectAll, setSelectAll] = useState(false);
  const [schFilter, setSchFilter] = useState("");
  const [schText, setSchText] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOdr, setSortOdr] = useState("");

  useEffect(() => {
    selectFolderListAdmin();
  }, []);

  const searchFilter = (event) => {
    setSchFilter(event.target.value);
  };

  const searchText = (event) => {
    setSchText(event.target.value);
  };

  const sortColumn = (key) => {
    if (sortKey === key) {
      setSortOdr(sortOdr === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOdr("asc");
    }
    selectFolderListAdmin();
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedList = brdVo.folderBeanList.map((folder) => ({
      ...folder,
      selected: !selectAll,
    }));
    setBrdVo((prevState) => ({
      ...prevState,
      folderBeanList: updatedList,
    }));
  };

  const handleSelect = (index) => {
    const updatedList = [...brdVo.folderBeanList];
    updatedList[index].selected = !updatedList[index].selected;
    setBrdVo((prevState) => ({
      ...prevState,
      folderBeanList: updatedList,
    }));
    setSelectAll(updatedList.every((folder) => folder.selected));
  };

  const searchFolderList = () => {
    selectFolderListAdmin();
  };

  const refreshFilterSearch = () => {
    setSchFilter("");
    setSchText("");
    setSortKey("");
    setSortOdr("");
    selectFolderListAdmin();
  };

  const updateFolderStateAdmin = (mode) => {
    const selectedFolders = brdVo.folderBeanList.filter((folder) => folder.selected);

    axios({
      url: "/updateFolderStateAdmin",
      method: "post",
      data: {
        folderBeanList: selectedFolders,
        mode: mode,
      },
    })
      .then((res) => {
        alert(res.data.successMsg);
        selectFolderListAdmin();
      })
      .catch((err) => {
        alert(err.response.data.errorMsg);
      });
  };

  const selectFolderListAdmin = (newPage = 0) => {
    axios({
      url: "/selectFolderListAdmin",
      method: "post",
      data: {
        newPage: newPage,
        searchBean : {
          schFilter: schFilter,
          schText: schText,
          sortKey: sortKey,
          sortOdr: sortOdr
        }
      },
    })
      .then((res) => {
        const folderBeanList = res.data.brdVo.folderBeanList.map((folder) => {
          const date = new Date(folder.createDt);
          const formattedDate = date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).replace(/\.$/, "");

          return {
            ...folder,
            createDt: formattedDate,
            selected: false,
            stateText: folder.state === "B" ? "정상" : folder.state === "D" ? "삭제" : "기타",
          };
        });

        setBrdVo((prevState) => ({
          ...prevState,
          folderBeanList: folderBeanList,
          paging: res.data.brdVo.paging, // 페이징 정보 업데이트
        }));
      })
      .catch((err) => {
        alert("조회 실패 (오류)");
      });
  };


  const handlePageChange = (newPage) => {
    selectFolderListAdmin(newPage);
  };

  return (
    <>
      <GrayLine marginTop="30px" marginBottom="30px" />

      <CNavbar colorScheme="light" className="bg-light">
        <CContainer fluid style={{ padding: 0 }}>
          <div className="d-flex align-items-center">
            <CButton
              color="black"
              variant="outline"
              style={{ whiteSpace: "nowrap", border: "1px solid gray", marginRight: "10px" }}
              title="폴더 상태 정상으로 변경"
              onClick={() => updateFolderStateAdmin("restore")}
            >
              <CIcon icon={cilRecycle} />
            </CButton>

            <CButton
              color="black"
              variant="outline"
              style={{ whiteSpace: "nowrap", border: "1px solid gray", marginRight: "10px" }}
              title="폴더 상태 삭제로 변경"
              onClick={() => updateFolderStateAdmin("delete")}
            >
              <CIcon icon={cilTrash} />
            </CButton>

            <CNavbarBrand className="ms-3">Total : {brdVo.paging.totalItems}</CNavbarBrand>
          </div>

          <CForm className="d-flex">
            <CFormSelect
              style={{ marginRight: "5px" }}
              options={[
                { label: "전체", value: "all" },
                { label: "폴더 고유번호", value: "folId" },
                { label: "폴더 명", value: "folName" },
                { label: "생성자 명", value: "memId" },
                { label: "상태", value: "state" },
              ]}
              onChange={searchFilter}
              value={schFilter}
            />

            <CFormInput
              type="search"
              className="me-2"
              placeholder="Search"
              onChange={searchText}
              value={schText}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  searchFolderList();
                }
              }}
            />

            <CButton
              color="black"
              variant="outline"
              className="me-2"
              style={{ whiteSpace: "nowrap", border: "1px solid gray" }}
              onClick={searchFolderList}
            >
              <CIcon icon={cilMagnifyingGlass} />
            </CButton>

            <CButton
              color="black"
              variant="outline"
              style={{ whiteSpace: "nowrap", border: "1px solid gray" }}
              onClick={refreshFilterSearch}
            >
              <CIcon icon={cilLoopCircular} />
            </CButton>
          </CForm>
        </CContainer>
      </CNavbar>

      <CTable color="dark" striped className="mt-3 mb-lg-5">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col" style={{ width: "50px" }}>
              <CFormCheck
                id="selectAllCheckBox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              고유번호
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("folId")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              폴더 명
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("folName")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              생성자 명
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("memId")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              게시판 갯수
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("boardCnt")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              상태
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("state")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              폴더 순서
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("odr")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              폴더 생성일
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("createDt")} />
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {brdVo.folderBeanList.map((folder, index) => (
            <CTableRow key={index}>
              <CTableDataCell style={{ width: "50px" }}>
                <CFormCheck
                  checked={folder.selected || selectAll}
                  onChange={() => handleSelect(index)}
                />
              </CTableDataCell>
              <CTableDataCell>{folder.folId}</CTableDataCell>
              <CTableDataCell>{folder.folName}</CTableDataCell>
              <CTableDataCell>{folder.memId}</CTableDataCell>
              <CTableDataCell>{folder.boardCnt}</CTableDataCell>
              <CTableDataCell>{folder.stateText}</CTableDataCell>
              <CTableDataCell>{folder.odr}</CTableDataCell>
              <CTableDataCell>{folder.createDt}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <Paging
        paging={brdVo.paging}
        onPageChange={handlePageChange}
        itemsPerPage={10}
      />
    </>
  );
}

export default FolderListTab;
