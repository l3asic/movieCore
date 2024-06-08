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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
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
import GrayLine from "../../uitils/GrayLine";

function BoardListTab() {
  const [brdVo, setBrdVo] = useState({
    folderBeanList: [],
    searchBean: {
      searchFilter: "brd_name",
      searchText: "",
      sortKey: "",
      sortOdr: "",
    },
  });

  const [selectAll, setSelectAll] = useState(false);
  const [isEditingOrder, setIsEditingOrder] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    selectBoardListAdmin();
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
      const sortOdr = prevState.searchBean.sortKey === key && prevState.searchBean.sortOdr === "asc" ? "desc" : "asc";
      return {
        ...prevState,
        searchBean: { ...prevState.searchBean, sortKey: key, sortOdr: sortOdr },
      };
    });
    selectBoardListAdmin();
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedList = brdVo.folderBeanList.map((folder) => ({
      ...folder,
      boardBeanList: folder.boardBeanList.map((board) => ({
        ...board,
        selected: !selectAll,
      })),
    }));
    setBrdVo((prevState) => ({
      ...prevState,
      folderBeanList: updatedList,
    }));
  };

  const handleSelect = (folderIndex, boardIndex) => {
    const updatedList = [...brdVo.folderBeanList];
    updatedList[folderIndex].boardBeanList[boardIndex].selected = !updatedList[folderIndex].boardBeanList[boardIndex].selected;
    setBrdVo((prevState) => ({
      ...prevState,
      folderBeanList: updatedList,
    }));
    setSelectAll(updatedList.every((folder) => folder.boardBeanList.every((board) => board.selected)));
  };

  const searchBoardList = () => {
    selectBoardListAdmin();
  };

  const refreshFilterSearch = () => {
    setBrdVo((prevState) => ({
      ...prevState,
      searchBean: { searchFilter: "", searchText: "", sortKey: "", sortOdr: "" },
    }));
    selectBoardListAdmin();
  };

  const updateBoardStateAdmin = (mode) => {
    const selectedBoards = brdVo.folderBeanList.flatMap((folder) =>
      folder.boardBeanList.filter((board) => board.selected).map((board) => ({
        ...board,
        createDt: board.createDt ? new Date(board.createDt.replace(/\./g, '-')).toISOString() : null, // ISO 형식으로 변환
      }))
    );

    axios({
      url: "/updateBoardStateAdmin",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        boardBeanList: selectedBoards,
        mode: mode,
      }),
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
      data: {
        searchBean: brdVo.searchBean,
      },
    })
      .then((res) => {
        const folderBeanList = res.data.brdVo.folderBeanList.map((folder) => {
          return {
            ...folder,
            boardBeanList: folder.boardBeanList.map((board) => {
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
            }),
          };
        });

        setBrdVo((prevState) => ({
          ...prevState,
          folderBeanList: folderBeanList,
        }));
      })
      .catch((err) => {
        alert("조회 실패 (오류)");
      });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const folderIndex = result.source.droppableId;
    const items = Array.from(brdVo.folderBeanList[folderIndex].boardBeanList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedList = [...brdVo.folderBeanList];
    updatedList[folderIndex].boardBeanList = items;

    setBrdVo((prevState) => ({
      ...prevState,
      folderBeanList: updatedList,
    }));
    setIsEditingOrder(true);
  };

  /** 게시판 순서 변경 저장 */
  const handleSaveOrder = () => {
    const reorderedBoards = brdVo.folderBeanList.flatMap((folder, folderIndex) =>
      folder.boardBeanList.map((board, boardIndex) => ({
        ...board,
        odr: boardIndex + 1, // 새로운 순서 지정
        createDt: board.createDt ? new Date(board.createDt.replace(/\./g, '-')).toISOString() : null, // ISO 형식으로 변환
      }))
    );

    axios({
      url: "/updateBoardOrderAdmin",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        boardBeanList: reorderedBoards,
      }),
    })
      .then((res) => {
        if (res.data.successResult) {
          alert('순서 변경 완료');
        } else {
          alert('순서 변경 실패');
        }
        setIsEditingOrder(false);
        selectBoardListAdmin();
      })
      .catch((err) => {
        alert('실패 (오류)');
      });
  };

  const handleCancelOrder = () => {
    setIsEditingOrder(false);
    selectBoardListAdmin(); // 변경 사항 취소
  };

  const handleBoardClick = (board) => {
    setSelectedBoard(board);
    setVisible(true);
  };

  const handleBoardChange = (event) => {
    const { name, value } = event.target;
    setSelectedBoard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBoardSave = () => {
    axios({
      url: "/updateBoard",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(selectedBoard),
    })
      .then((res) => {
        alert('수정 완료');
        setVisible(false);
        selectBoardListAdmin();
      })
      .catch((err) => {
        alert('수정 실패');
      });
  };

  const handleModalClose = () => {
    setVisible(false);
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

            <CNavbarBrand className="ms-3">Total : {brdVo.folderBeanList.reduce((acc, folder) => acc + folder.boardBeanList.length, 0)}</CNavbarBrand>
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
                { label: "게시판 명", value: "brd_name" },
                { label: "게시판 고유번호", value: "brd_id" },
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

      {brdVo.folderBeanList.map((folder, folderIndex) => (
        <div key={folder.folId} style={{ marginTop: "20px" }}>
          <h5>{folder.folName}</h5>
          <DragDropContext onDragEnd={(result) => handleDragEnd({ ...result, source: { ...result.source, droppableId: folderIndex.toString() }, destination: { ...result.destination, droppableId: folderIndex.toString() } })}>
            <Droppable droppableId={folderIndex.toString()}>
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
                      <CTableHeaderCell scope="col" style={{ width: "60px" }}>
                        순서
                        <CIcon icon={cilSwapVertical} onClick={() => sortColumn("odr")} />
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: "60px" }}>
                        고유번호
                        <CIcon icon={cilSwapVertical} onClick={() => sortColumn("brd_id")} />
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: "140px" }}>
                        게시판 명
                        <CIcon icon={cilSwapVertical} onClick={() => sortColumn("brd_name")} />
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: "200px" }}>
                        설명
                        <CIcon icon={cilSwapVertical} onClick={() => sortColumn("brd_comment")} />
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: "100px" }}>
                        상태
                        <CIcon icon={cilSwapVertical} onClick={() => sortColumn("state")} />
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: "80px" }}>
                        공지 여부
                        <CIcon icon={cilSwapVertical} onClick={() => sortColumn("notice_yn")} />
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: "100px" }}>
                        게시글 갯수
                        <CIcon icon={cilSwapVertical} onClick={() => sortColumn("atcl_cnt")} />
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {folder.boardBeanList.map((board, boardIndex) => (
                      <Draggable key={board.brdId} draggableId={board.brdId} index={boardIndex}>
                        {(provided) => (
                          <CTableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleBoardClick(board)}
                          >
                            <CTableDataCell style={{ width: "10px" }}>
                              <CFormCheck
                                checked={board.selected || selectAll}
                                onChange={() => handleSelect(folderIndex, boardIndex)}
                              />
                            </CTableDataCell>
                            <CTableDataCell style={{ width: "60px" }}>{board.odr}</CTableDataCell>
                            <CTableDataCell style={{ width: "60px" }}>{board.brdId}</CTableDataCell>
                            <CTableDataCell style={{ width: "140px" }}>{board.brdName}</CTableDataCell>
                            <CTableDataCell style={{ width: "200px" }}>{board.brdComment}</CTableDataCell>
                            <CTableDataCell style={{ width: "100px" }}>{board.stateText}</CTableDataCell>
                            <CTableDataCell style={{ width: "80px" }}>{board.noticeYn}</CTableDataCell>
                            <CTableDataCell style={{ width: "100px" }}>{board.atclCnt}</CTableDataCell>
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
        </div>
      ))}

      <CModal visible={visible} onClose={handleModalClose}>
        <CModalHeader>
          <CModalTitle>게시판 상세 정보</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedBoard && (
            <CForm>
              <div className="mb-3">
                <CFormInput
                  label="게시판 명"
                  name="brdName"
                  value={selectedBoard.brdName}
                  onChange={handleBoardChange}
                />
              </div>
              <div className="mb-3">
                <CFormInput
                  label="게시판 설명"
                  name="brdComment"
                  value={selectedBoard.brdComment}
                  onChange={handleBoardChange}
                />
              </div>
              <div className="mb-3">
                <CFormSelect
                  label="상태"
                  name="state"
                  value={selectedBoard.state}
                  onChange={handleBoardChange}
                >
                  <option value="B">정상</option>
                  <option value="D">삭제</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormSelect
                  label="공지 여부"
                  name="noticeYn"
                  value={selectedBoard.noticeYn}
                  onChange={handleBoardChange}
                >
                  <option value="Y">예</option>
                  <option value="N">아니오</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormInput
                  label="게시글 수"
                  name="atclCnt"
                  value={selectedBoard.atclCnt}
                  readOnly
                />
              </div>
            </CForm>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleModalClose}>
            취소
          </CButton>
          <CButton color="primary" onClick={handleBoardSave}>
            수정
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default BoardListTab;
