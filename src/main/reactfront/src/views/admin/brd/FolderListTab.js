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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
      searchFilter: "fol_name",
      searchText: "",
      sortKey: "",
      sortOdr: "",
    },
  });

  const [selectAll, setSelectAll] = useState(false);
  const [isEditingOrder, setIsEditingOrder] = useState(false);
  const [showDragInfo, setShowDragInfo] = useState(true);

  useEffect(() => {
    selectFolderListAdmin();
  }, []);

  const searchFilter = (event) => {
    setBrdVo((prevState) => ({
      ...prevState,
      searchBean: { ...prevState.searchBean, searchFilter: event.target.value },
    }));
  };

  const searchText = (event) => {
    setBrdVo((prevState) => ({
      ...prevState,
      searchBean: { ...prevState.searchBean, searchText: event.target.value },
    }));
  };

  const sortColumn = (key) => {
    setBrdVo((prevState) => {
      const sortOdr =
        prevState.searchBean.sortKey === key && prevState.searchBean.sortOdr === "asc"
          ? "desc"
          : "asc";
      return {
        ...prevState,
        searchBean: { ...prevState.searchBean, sortKey: key, sortOdr: sortOdr },
      };
    });
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
    setBrdVo((prevState) => ({
      ...prevState,
      searchBean: { searchFilter: "", searchText: "", sortKey: "", sortOdr: "" },
    }));
    selectFolderListAdmin();
  };

  /** 폴더 상태 변경 (삭제/ 원복) */
  const updateFolderStateAdmin = (mode) => {
    const selectedFolders = brdVo.folderBeanList.filter((folder) => folder.selected).map((folder) => ({
      ...folder,
      createDt: folder.createDt ? new Date(folder.createDt.replace(/\./g, "-")).toISOString() : null, // ISO 형식으로 변환
    }));

    axios({
      url: "/updateFolderStateAdmin",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        folderBeanList: selectedFolders,
        mode: mode,
      }),
    })
      .then((res) => {
        alert(res.data.successMsg);
        selectFolderListAdmin();
      })
      .catch((err) => {
        alert(err.response.data.errorMsg);
      });
  };

  /** 폴더 리스트 조회  */
  const selectFolderListAdmin = (newPage = 0) => {
    axios({
      url: "/selectFolderListAdmin",
      method: "post",
      data: {
        newPage: newPage,
        searchBean: brdVo.searchBean,
      },
    })
      .then((res) => {
        const folderBeanList = res.data.brdVo.folderBeanList.map((folder) => {
          const date = new Date(folder.createDt);
          const formattedDate = date
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\.$/, "");

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

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(brdVo.folderBeanList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBrdVo((prevState) => ({
      ...prevState,
      folderBeanList: items,
    }));
    setIsEditingOrder(true);
    setShowDragInfo(false);
  };

  /** 폴더 순서 변경 저장 */
  const handleSaveOrder = () => {
    const reorderedFolders = brdVo.folderBeanList.map((folder, index) => ({
      ...folder,
      odr: index + 1, // 새로운 순서 지정
      createDt: folder.createDt ? new Date(folder.createDt.replace(/\./g, "-")).toISOString() : null, // ISO 형식으로 변환
    }));

    axios({
      url: "/updateFolderOrderAdmin",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        folderBeanList: reorderedFolders,
      }),
    })
      .then((res) => {
        if (res.data.successResult) {
          alert("순서 변경 완료");
        } else {
          alert("순서 변경 실패");
        }
        setIsEditingOrder(false);
        setShowDragInfo(true);
        selectFolderListAdmin();
      })
      .catch((err) => {
        alert("실패 (오류)");
      });
  };

  const handleCancelOrder = () => {
    setIsEditingOrder(false);
    setShowDragInfo(true);
    selectFolderListAdmin(); // 변경 사항 취소
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

            <CNavbarBrand className="ms-3">
              Total : {brdVo.paging.totalItems}
              {showDragInfo && (
                <span style={{ fontSize: "0.8rem", color: "gray", marginLeft: "10px" }}>
                  폴더를 끌어다 놓으면 순서를 변경할 수 있습니다.
                </span>
              )}
            </CNavbarBrand>

            {isEditingOrder && (
              <div className="ms-auto d-flex">
                <CButton color="dark" onClick={handleSaveOrder} className="me-2">
                  순서 저장
                </CButton>
                <CButton color="secondary" onClick={handleCancelOrder}>
                  취소
                </CButton>
              </div>
            )}
          </div>

          <CForm className="d-flex">
            <CFormSelect
              style={{ marginRight: "5px" }}
              options={[
                { label: "폴더 명", value: "fol_name" },
                { label: "폴더 고유번호", value: "fol_id" },
                { label: "생성자 명", value: "mem_id" },
                { label: "상태", value: "state" },
              ]}
              onChange={searchFilter}
              value={brdVo.searchBean.searchFilter}
            />

            <CFormInput
              type="search"
              className="me-2"
              placeholder="Search"
              onChange={searchText}
              value={brdVo.searchBean.searchText}
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="folders">
          {(provided) => (
            <CTable
              color="dark"
              striped
              className="mt-3 mb-lg-5"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ width: "10px" }}>
                    <CFormCheck
                      id="selectAllCheckBox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: "40px" }}>
                    순서
                    <CIcon icon={cilSwapVertical} onClick={() => sortColumn("odr")} />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: "60px" }}>
                    고유번호
                    <CIcon icon={cilSwapVertical} onClick={() => sortColumn("fol_id")} />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: "120px" }}>
                    폴더 명
                    <CIcon icon={cilSwapVertical} onClick={() => sortColumn("fol_name")} />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: "100px" }}>
                    생성자 명
                    <CIcon icon={cilSwapVertical} onClick={() => sortColumn("mem_id")} />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: "100px" }}>
                    게시판 갯수
                    <CIcon icon={cilSwapVertical} onClick={() => sortColumn("board_cnt")} />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: "80px" }}>
                    상태
                    <CIcon icon={cilSwapVertical} onClick={() => sortColumn("state")} />
                  </CTableHeaderCell>

                  <CTableHeaderCell scope="col" style={{ width: "120px" }}>
                    폴더 생성일
                    <CIcon icon={cilSwapVertical} onClick={() => sortColumn("create_dt")} />
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {brdVo.folderBeanList.map((folder, index) => (
                  <Draggable key={folder.folId} draggableId={folder.folId} index={index}>
                    {(provided) => (
                      <CTableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CTableDataCell style={{ width: "10px" }}>
                          <CFormCheck
                            checked={folder.selected || selectAll}
                            onChange={() => handleSelect(index)}
                          />
                        </CTableDataCell>
                        <CTableDataCell style={{ width: "40px" }}>{folder.odr}</CTableDataCell>
                        <CTableDataCell style={{ width: "60px" }}>{folder.folId}</CTableDataCell>
                        <CTableDataCell style={{ width: "120px" }}>{folder.folName}</CTableDataCell>
                        <CTableDataCell style={{ width: "100px" }}>{folder.memId}</CTableDataCell>
                        <CTableDataCell style={{ width: "100px" }}>{folder.boardCnt}</CTableDataCell>
                        <CTableDataCell style={{ width: "80px" }}>{folder.stateText}</CTableDataCell>
                        <CTableDataCell style={{ width: "120px" }}>{folder.createDt}</CTableDataCell>
                      </CTableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </CTableBody>
            </CTable>
          )}
        </Droppable>
      </DragDropContext>

      <Paging paging={brdVo.paging} onPageChange={handlePageChange} itemsPerPage={10} />
    </>
  );
}

export default FolderListTab;
