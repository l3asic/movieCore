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
  CCardImage,
} from "@coreui/react";
import {
  cilLoopCircular,
  cilTrash,
  cilSwapVertical,
  cilMagnifyingGlass,
  cilRecycle,
  cilClipboard,
  cilFolder,
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
  const [showDragInfo, setShowDragInfo] = useState(true);
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

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
      const sortOdr =
        prevState.searchBean.sortKey === key && prevState.searchBean.sortOdr === "asc"
          ? "desc"
          : "asc";
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
    updatedList[folderIndex].boardBeanList[boardIndex].selected =
      !updatedList[folderIndex].boardBeanList[boardIndex].selected;
    setBrdVo((prevState) => ({
      ...prevState,
      folderBeanList: updatedList,
    }));
    setSelectAll(
      updatedList.every((folder) => folder.boardBeanList.every((board) => board.selected))
    );
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
    const selectedBoards = brdVo.folderBeanList
      .flatMap((folder) =>
        folder.boardBeanList.filter((board) => board.selected).map((board) => ({
          ...board,
          createDt: board.createDt
            ? new Date(board.createDt.replace(/\./g, "-")).toISOString()
            : null, // ISO 형식으로 변환
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
        alert("실패(오류)");
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
              const formattedDate = date
                .toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\.$/, "");

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

    const sourceFolderIndex = parseInt(result.source.droppableId);
    const destinationFolderIndex = parseInt(result.destination.droppableId);

    if (sourceFolderIndex === destinationFolderIndex) {
      const items = Array.from(brdVo.folderBeanList[sourceFolderIndex].boardBeanList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      const updatedList = [...brdVo.folderBeanList];
      updatedList[sourceFolderIndex].boardBeanList = items;

      setBrdVo((prevState) => ({
        ...prevState,
        folderBeanList: updatedList,
      }));
    } else {
      const sourceItems = Array.from(brdVo.folderBeanList[sourceFolderIndex].boardBeanList);
      const [reorderedItem] = sourceItems.splice(result.source.index, 1);

      const destinationItems = Array.from(
        brdVo.folderBeanList[destinationFolderIndex].boardBeanList
      );
      destinationItems.splice(result.destination.index, 0, reorderedItem);

      const updatedList = [...brdVo.folderBeanList];
      updatedList[sourceFolderIndex].boardBeanList = sourceItems;
      updatedList[destinationFolderIndex].boardBeanList = destinationItems;

      updatedList[destinationFolderIndex].boardBeanList[
        result.destination.index
        ].folId = updatedList[destinationFolderIndex].folId;

      setBrdVo((prevState) => ({
        ...prevState,
        folderBeanList: updatedList,
      }));
    }

    setIsEditingOrder(true);
    setShowDragInfo(false);
  };

  /** 게시판 순서 변경 저장 */
  const handleSaveOrder = () => {
    const reorderedBoards = brdVo.folderBeanList.flatMap((folder) =>
      folder.boardBeanList.map((board, boardIndex) => ({
        ...board,
        odr: boardIndex + 1, // 새로운 순서 지정
        folId: folder.folId, // 폴더 ID 포함
        createDt: board.createDt
          ? new Date(board.createDt.replace(/\./g, "-")).toISOString()
          : null, // ISO 형식으로 변환
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
          alert("순서 및 소속 폴더 저장 완료");
        } else {
          alert("순서 및 소속 폴더 저장 실패");
        }
        setIsEditingOrder(false);
        setShowDragInfo(true);
        selectBoardListAdmin();
      })
      .catch((err) => {
        alert("실패 (오류)");
      });
  };


  const handleCancelOrder = () => {
    setIsEditingOrder(false);
    setShowDragInfo(true);
    selectBoardListAdmin(); // 변경 사항 취소
  };

  const handleBoardClick = (board, event) => {
    if (event.target.type === "checkbox") return;
    setSelectedBoard(board);
    setBannerPreview(board.fileBean ? board.fileBean.src : null); // 배너 이미지 미리보기 설정
    setVisible(true);
  };

  const handleBoardChange = (event) => {
    const { name, value } = event.target;
    setSelectedBoard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  /** 게시판 수정 (저장) */
  const handleBoardSave = () => {
    const updatedBoard = {
      ...selectedBoard,
      createDt: selectedBoard.createDt
        ? new Date(selectedBoard.createDt.replace(/\./g, "-")).toISOString()
        : null,
    };

    // selected 및 stateText 필드를 제거한 객체를 생성
    const { selected, stateText, ...boardBeanWithoutSelectedAndStateText } = updatedBoard;

    const formData = new FormData();
    const brdVoJson = JSON.stringify({ boardBean: boardBeanWithoutSelectedAndStateText }); // brdVo 객체를 JSON 문자열로 변환
    formData.append("brdVo", brdVoJson);
    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }

    axios({
      url: "/updateBoard",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        alert("수정 완료");
        setVisible(false);
        selectBoardListAdmin();
      })
      .catch((err) => {
        alert("수정 실패");
      });
  };




  const handleModalClose = () => {
    setVisible(false);
  };

  const handleBannerImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerImage(file);
      setBannerPreview(URL.createObjectURL(file));
    } else {
      setBannerImage(null);
      setBannerPreview(null);
    }
  };

  const generateOptions = (start, end, step, unit, includeUnlimited = false) => {
    const options = [];
    for (let i = start; i <= end; i += step) {
      options.push(
        <option key={i} value={i}>
          {i}
          {unit}
        </option>
      );
    }
    if (includeUnlimited) {
      options.push(
        <option key="unlimited" value="unlimited">
          제한없음
        </option>
      );
    }
    return options;
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

            <CNavbarBrand className="ms-3">
              Total : {brdVo.folderBeanList.reduce((acc, folder) => acc + folder.boardBeanList.length, 0)}
              {showDragInfo && (
                <span style={{ fontSize: "0.8rem", color: "gray", marginLeft: "10px" }}>
                  게시판을 끌어다 놓으면 순서 및 소속 폴더를 변경할 수 있습니다.
                </span>
              )}
            </CNavbarBrand>

            {isEditingOrder && (
              <div className="ms-auto d-flex">
                <CButton color="dark" onClick={handleSaveOrder} className="me-2">
                  순서 및 소속 폴더 저장
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
                { label: "생성자 명", value: "mem_name" },
                { label: "폴더 명", value: "fol_name" },
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

      <DragDropContext onDragEnd={handleDragEnd}>
        {brdVo.folderBeanList.map((folder, folderIndex) => (
          <Droppable key={folder.folId} droppableId={folderIndex.toString()}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} style={{ marginTop: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f8f9fa",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "0",
                    border: "1px solid #dee2e6",
                    color: "#495057",
                  }}
                >
                  <CIcon icon={cilFolder} style={{ marginRight: "10px" }} />
                  <h5 style={{ margin: 0 }}>{folder.folName}</h5>
                </div>
                <CTable color="dark" striped className="mt-3 mb-lg-5">
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
                            onClick={(e) => handleBoardClick(board, e)}
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
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>

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
                <CFormInput label="생성자 명" name="memId" value={selectedBoard.memName} readOnly />
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
                  label="공지 게시판 여부"
                  name="noticeYn"
                  value={selectedBoard.noticeYn}
                  onChange={handleBoardChange}
                >
                  <option value="Y">공지 게시판</option>
                  <option value="N">일반 게시판</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormInput label="게시글 수" name="atclCnt" value={selectedBoard.atclCnt} readOnly />
              </div>
              <div className="mb-3">
                <CFormSelect
                  label="파일 용량 제한"
                  name="fileLimit"
                  value={selectedBoard.fileLimit}
                  onChange={handleBoardChange}
                >
                  {generateOptions(10, 100, 10, "MB", true)}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormSelect
                  label="파일 개수 제한"
                  name="fileCntLimit"
                  value={selectedBoard.fileCntLimit}
                  onChange={handleBoardChange}
                >
                  {generateOptions(0, 10, 1, "개", true)}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormSelect
                  label="댓글 작성 여부"
                  name="replYn"
                  value={selectedBoard.replYn}
                  onChange={handleBoardChange}
                >
                  <option value="Y">댓글 작성가능</option>
                  <option value="N">댓글 작성 제한</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormSelect
                  label="이미지 업로드 여부"
                  name="imgUploadYn"
                  value={selectedBoard.imgUploadYn}
                  onChange={handleBoardChange}
                >
                  <option value="Y">예</option>
                  <option value="N">아니오</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                {bannerPreview && (
                  <CCardImage
                    src={bannerPreview}
                    style={{ height: "200px", marginBottom: "20px" }}
                  />
                )}
                <CFormInput
                  type="file"
                  label="게시판 배너"
                  name="bannerImage"
                  onChange={handleBannerImageChange}
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
