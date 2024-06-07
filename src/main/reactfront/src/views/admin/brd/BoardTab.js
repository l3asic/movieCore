import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import {
  CInputGroup,
  CInputGroupText,
  CForm,
  CFormInput,
  CCol,
  CFormSelect,
  CButton,
  CFormTextarea,
  CRow,
} from "@coreui/react";

function BoardTab() {
  const [brdVo, setBrdVo] = useState({
    folderBeanList: [],
  });

  const [boardBean, setBoardBean] = useState({
    folId: "",
    brdName: "",
    brdComment: "",
    memId: "",
    odr: 0,
    noticeYn: "N",
    imgUploadYn: "Y",
    fileLimit: "50",
    fileCntLimit: "5",
    replYn: "Y",
  });

  /** 모든 폴더 리스트 조회 */
  useEffect(() => {
    selectFolderList();
  }, []);

  /** 조회된 폴더 리스트의 첫번째 폴더로 기본 값 세팅 */
  useEffect(() => {
    if (brdVo.folderBeanList.length > 0) {
      const firstFolder = brdVo.folderBeanList[0];
      setBoardBean((prevBoardBean) => ({
        ...prevBoardBean,
        folId: firstFolder.folId,
      }));
    }
  }, [brdVo.folderBeanList]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>게시판 생성</h1>
      <CForm className="row g-3" style={styles.form}>
        <CRow className="g-3">
          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon1" style={styles.inputGroupText}>
                폴더 선택
              </CInputGroupText>
              <CFormSelect
                aria-label="폴더 선택"
                options={brdVo.folderBeanList.map((folderBean) => ({
                  label: folderBean.folName,
                  value: folderBean.folId,
                }))}
                name="folId"
                onChange={changeBoardBean}
                style={styles.input}
              />
            </CInputGroup>
          </CCol>

          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon1" style={styles.inputGroupText}>
                공지 게시판 여부
              </CInputGroupText>
              <CFormSelect
                defaultValue="N"
                options={[
                  { label: "공지 게시판", value: "Y" },
                  { label: "일반 게시판", value: "N" },
                ]}
                name="noticeYn"
                onChange={changeBoardBean}
                style={styles.input}
              />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow className="g-3">
          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon1" style={styles.inputGroupText}>
                이미지 첨부 사용
              </CInputGroupText>
              <CFormSelect
                defaultValue="Y"
                options={[
                  { label: "첨부 가능", value: "Y" },
                  { label: "첨부 불가능", value: "N" },
                ]}
                name="imgUploadYn"
                onChange={changeBoardBean}
                style={styles.input}
              />
            </CInputGroup>
          </CCol>

          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon1" style={styles.inputGroupText}>
                댓글 작성 여부
              </CInputGroupText>
              <CFormSelect
                defaultValue="Y"
                options={[
                  { label: "댓글 작성 가능", value: "Y" },
                  { label: "댓글 작성 제한", value: "N" },
                ]}
                name="replYn"
                onChange={changeBoardBean}
                style={styles.input}
              />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow className="g-3">
          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon1" style={styles.inputGroupText}>
                파일 갯수 제한
              </CInputGroupText>
              <CFormSelect
                defaultValue="5"
                options={[
                  { label: "0 개", value: "0" },
                  { label: "1 개", value: "1" },
                  { label: "2 개", value: "2" },
                  { label: "3 개", value: "3" },
                  { label: "4 개", value: "4" },
                  { label: "5 개", value: "5" },
                  { label: "6 개", value: "6" },
                  { label: "7 개", value: "7" },
                  { label: "8 개", value: "8" },
                  { label: "9 개", value: "9" },
                  { label: "10 개", value: "10" },
                  { label: "제한 없음", value: "N" },
                ]}
                name="fileCntLimit"
                onChange={changeBoardBean}
                style={styles.input}
              />
            </CInputGroup>
          </CCol>

          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon1" style={styles.inputGroupText}>
                파일 용량 제한
              </CInputGroupText>
              <CFormSelect
                defaultValue="50"
                options={[
                  { label: "10mb", value: "10" },
                  { label: "20mb", value: "20" },
                  { label: "30mb", value: "30" },
                  { label: "40mb", value: "40" },
                  { label: "50mb", value: "50" },
                  { label: "60mb", value: "60" },
                  { label: "70mb", value: "70" },
                  { label: "80mb", value: "80" },
                  { label: "90mb", value: "90" },
                  { label: "100mb", value: "100" },
                  { label: "제한 없음", value: "N" },
                ]}
                name="fileLimit"
                onChange={changeBoardBean}
                style={styles.input}
              />
            </CInputGroup>
          </CCol>
        </CRow>

        <CCol md={12}>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1" style={styles.inputGroupText}>
              게시판 이름
            </CInputGroupText>
            <CFormInput
              placeholder="게시판 이름을 입력하세요"
              aria-describedby="basic-addon1"
              name="brdName"
              onChange={changeBoardBean}
              style={styles.input}
            />
          </CInputGroup>
        </CCol>

        <CCol md={12}>
          <CInputGroup>
            <CInputGroupText style={styles.inputGroupText}>
              게시판 설명
            </CInputGroupText>
            <CFormTextarea
              floatingLabel="게시판 설명을 입력하세요"
              style={{ height: "100px", ...styles.input }}
              name="brdComment"
              onChange={changeBoardBean}
            ></CFormTextarea>
          </CInputGroup>
        </CCol>

        <CCol md={12} className="d-flex justify-content-end">
          <CButton
            color="primary"
            onClick={createBoard}
            style={styles.button}
          >
            게시판 생성
          </CButton>
        </CCol>
      </CForm>
    </div>
  );

  /** 모든 폴더 리스트 조회 */
  function selectFolderList() {
    axios({
      url: "/selectAllFolderList",
      method: "post",
      params: {},
    })
      .then(function (res) {
        setBrdVo((prevBrdVo) => ({
          ...prevBrdVo,
          folderBeanList: res.data.brdVo.folderBeanList,
        }));
      })
      .catch(function (err) {
        alert("조회실패 (오류)");
      });
  }

  /** 게시판 정보 입력시 객체에 세팅 */
  function changeBoardBean(e) {
    const { value, name } = e.target;
    setBoardBean({
      ...boardBean,
      [name]: value,
    });
  }

  /** 게시판 최종 생성 */
  function createBoard() {
    axios({
      url: "/createBoard",
      method: "post",
      params: {
        folId: boardBean.folId,
        brdName: boardBean.brdName,
        brdComment: boardBean.brdComment,
        memId: boardBean.memId,
        odr: boardBean.odr,
        noticeYn: boardBean.noticeYn,
        imgUploadYn: boardBean.imgUploadYn,
        fileLimit: boardBean.fileLimit,
        fileCntLimit: boardBean.fileCntLimit,
        replYn: boardBean.replYn,
      },
    })
      .then(function (res) {
        if (res.data.succesResult) {
          alert("등록 성공");
        } else {
          alert("등록 그냥 실패?");
        }
      })
      .catch(function (err) {
        alert("등록 실패 (오류)");
      });
  }
}

// 스타일 정의
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroupText: {
    backgroundColor: "#6c757d", // 중립적인 색상
    color: "#fff",
    border: "none",
  },
  input: {
    border: "1px solid #ced4da",
    borderRadius: "4px",
  },
  button: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    color: "#fff",
  },
};

export default BoardTab;
