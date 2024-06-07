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
import GrayLine from "../../uitils/GrayLine";

function BoardListTab() {
  const [brdVo, setBrdVo] = useState({
    folderBeanList: [],
    boardBeanList: [],
  });

  const [selectAll, setSelectAll] = useState(false);
  const [schFilter, setSchFilter] = useState("");
  const [schText, setSchText] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOdr, setSortOdr] = useState("");

  useEffect(() => {
    selectBoardListAdmin();
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
    selectBoardListAdmin();
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedList = brdVo.boardBeanList.map((board) => ({
      ...board,
      selected: !selectAll,
    }));
    setBrdVo((prevState) => ({
      ...prevState,
      boardBeanList: updatedList,
    }));
  };

  const handleSelect = (index) => {
    const updatedList = [...brdVo.boardBeanList];
    updatedList[index].selected = !updatedList[index].selected;
    setBrdVo((prevState) => ({
      ...prevState,
      boardBeanList: updatedList,
    }));
    setSelectAll(updatedList.every((board) => board.selected));
  };

  const searchBoardList = () => {
    selectBoardListAdmin();
  };

  const refreshFilterSearch = () => {
    setSchFilter("");
    setSchText("");
    setSortKey("");
    setSortOdr("");
    selectBoardListAdmin();
  };

  const updateBoardStateAdmin = (mode) => {
    const selectedBoards = brdVo.boardBeanList.filter((board) => board.selected);

    axios({
      url: "/updateBoardStateAdmin",
      method: "post",
      data: {
        boardBeanList: selectedBoards,
        mode: mode,
      },
    })
      .then((res) => {
        alert(res.data.successMsg);
        selectBoardListAdmin();
      })
      .catch((err) => {
        alert(err.response.data.errorMsg);
      });
  };

  const selectBoardListAdmin = () => {
    axios({
      url: "/selectBoardListAdmin",
      method: "post",
      params: {
        searchFilter: schFilter,
        searchText: schText,
        sortKey: sortKey,
        sortOdr: sortOdr,
      },
    })
      .then((res) => {
        const boardBeanList = res.data.brdVo.boardBeanList.map((board) => {
          const date = new Date(board.createDt);
          const formattedDate = date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).replace(/\.$/, "");

          return {
            ...board,
            createDt: formattedDate,
            selected: false,
            stateText: board.state === "B" ? "정상" : board.state === "D" ? "삭제" : "기타",
          };
        });

        setBrdVo((prevState) => ({
          ...prevState,
          boardBeanList: boardBeanList,
        }));
      })
      .catch((err) => {
        alert("조회 실패 (오류)");
      });
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
              title="게시판 상태 정상으로 변경"
              onClick={() => updateBoardStateAdmin("restore")}
            >
              <CIcon icon={cilRecycle} />
            </CButton>

            <CButton
              color="black"
              variant="outline"
              style={{ whiteSpace: "nowrap", border: "1px solid gray", marginRight: "10px" }}
              title="게시판 상태 삭제로 변경"
              onClick={() => updateBoardStateAdmin("delete")}
            >
              <CIcon icon={cilTrash} />
            </CButton>

            <CNavbarBrand className="ms-3">Total : {brdVo.boardBeanList.length}</CNavbarBrand>
          </div>

          <CForm className="d-flex">
            <CFormSelect
              style={{ marginRight: "5px" }}
              options={[
                { label: "전체", value: "all" },
                { label: "게시판 고유번호", value: "brdId" },
                { label: "게시판 명", value: "brdName" },
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
                  searchBoardList();
                }
              }}
            />

            <CButton
              color="black"
              variant="outline"
              className="me-2"
              style={{ whiteSpace: "nowrap", border: "1px solid gray" }}
              onClick={searchBoardList}
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
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("brdId")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              게시판 명
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("brdName")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              설명
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("brdComment")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              생성자 명
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("memId")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              상태
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("state")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              순서
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("odr")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              생성일
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("createDt")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              공지 여부
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("noticeYn")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              이미지 첨부
              <CIcon icon={cilSwapVertical} onClick={() => sortColumn("imgUploadYn")} />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">파일 용량</CTableHeaderCell>
            <CTableHeaderCell scope="col">파일 갯수</CTableHeaderCell>
            <CTableHeaderCell scope="col">게시글 갯수</CTableHeaderCell>
            <CTableHeaderCell scope="col">토탈 사용 용량</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {brdVo.boardBeanList.map((board, index) => (
            <CTableRow key={index}>
              <CTableDataCell style={{ width: "50px" }}>
                <CFormCheck
                  checked={board.selected || selectAll}
                  onChange={() => handleSelect(index)}
                />
              </CTableDataCell>
              <CTableDataCell>{board.brdId}</CTableDataCell>
              <CTableDataCell>{board.brdName}</CTableDataCell>
              <CTableDataCell>{board.brdComment}</CTableDataCell>
              <CTableDataCell>{board.memId}</CTableDataCell>
              <CTableDataCell>{board.stateText}</CTableDataCell>
              <CTableDataCell>{board.odr}</CTableDataCell>
              <CTableDataCell>{board.createDt}</CTableDataCell>
              <CTableDataCell>{board.noticeYn}</CTableDataCell>
              <CTableDataCell>{board.imgUploadYn}</CTableDataCell>
              <CTableDataCell>임시값</CTableDataCell>
              <CTableDataCell>임시값</CTableDataCell>
              <CTableDataCell>임시값</CTableDataCell>
              <CTableDataCell>임시값</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
}

export default BoardListTab;
