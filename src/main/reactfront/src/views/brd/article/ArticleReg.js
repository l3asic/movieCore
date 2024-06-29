import React, { useEffect, useState } from 'react';
import {
  CFormInput, CForm, CFormLabel,
  CCol, CButton, CFormSelect
} from '@coreui/react';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import GrayLine from "../../uitils/GrayLine";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const ArticleReg = () => {
  const location = useLocation();
  const { articleData } = location.state || {}; // 전달된 데이터

  const [brdVo, setBrdVo] = useState({
    folderBean: {},
    folderBeanList: [],
    boardBean: {},
    boardBeanList: [],
    articleBean: {}
  });

  const [articleBean, setArticleBean] = useState({
    atclId: '',
    brdId: '',
    memId: '',
    subject: '',
    content: ''
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [files, setFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(articleData && articleData.length > 0 ? articleData[0].folderBeanList[0].folId : '');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [boardOptions, setBoardOptions] = useState([]);
  const [isPermanent, setIsPermanent] = useState('N');
  const [expireYn, setExpireYn] = useState('N');
  const [expireDt, setExpireDt] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    selectAllFolderBoardList();
  }, []);

  useEffect(() => {
    if (selectedFolder) {
      const folderData = brdVo.folderBeanList.find((folder) => folder.folId === selectedFolder);
      if (folderData) {
        const newBoardOptions = folderData.boardBeanList.map((boardBean) => ({
          label: boardBean.brdName,
          value: boardBean.brdId,
        }));
        setBoardOptions(newBoardOptions);
        setArticleBean((prev) => ({ ...prev, brdId: newBoardOptions[0] ? newBoardOptions[0].value : '' }));
      }
    } else {
      setBoardOptions([]);
    }
  }, [selectedFolder]);

  const handleFileChange = (event) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...Array.from(event.target.files)
    ]);
  };

  const handleFolderChange = (event) => {
    const folderValue = event.target.value;
    setSelectedBoard('');
    setSelectedFolder(folderValue);
  };

  const handleBoardChange = (event) => {
    const boardValue = event.target.value;
    setSelectedBoard(boardValue);
    changeAtclBean(event);
  };

  const changeAtclBean = (e) => {
    const { value, name } = e.target;
    setArticleBean((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIsPermanentChange = (event) => {
    setIsPermanent(event.target.value);
  };

  const calculateExpireYn = () => {
    if (expireDt && new Date() > new Date(expireDt)) {
      return 'Y';
    }
    return 'N';
  };

  const submitArticle = () => {
    brdVo.articleBean = { ...articleBean, content: draftToHtml(convertToRaw(editorState.getCurrentContent())) }; // articleBean을 직접 복사
    const memberBean = JSON.parse(localStorage.getItem('memberBean'));
    brdVo.articleBean.memId = memberBean.memId;

    if (isPermanent === 'N') {
      brdVo.articleBean.expireDt = null;
    } else {
      brdVo.articleBean.expireDt = expireDt;
    }
    brdVo.articleBean.expireYn = calculateExpireYn();

    axios.post('/atclRegistry', brdVo)
      .then((res) => {
        if (res.data.succesResult) {
          if (files.length > 0) {
            atclFileUpload(res.data.brdVo);
          }
        } else {
          alert("등록 실패");
        }
        MoveToArticleListView();
      }).catch(() => {
      alert("등록 실패 (오류)");
    });
  };


  const atclFileUpload = (brdVo) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('brdVo', JSON.stringify(brdVo));

    return axios.post('/atclFileUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      alert("성공");
    }).catch(() => {
      alert("파일 업로드 실패");
    });
  };

  const selectAllFolderBoardList = () => {
    axios.post('/selectAllFolderBoardList').then((res) => {
      const fetchedFolderBeanList = res.data.brdVo.folderBeanList;

      setBrdVo((prevBrdVo) => ({
        ...prevBrdVo,
        folderBeanList: fetchedFolderBeanList,
      }));

      if (fetchedFolderBeanList.length > 0) {
        const defaultFolder = fetchedFolderBeanList[0];
        setSelectedFolder(defaultFolder.folId);

        const newBoardOptions = defaultFolder.boardBeanList.map((board) => ({
          label: board.brdName,
          value: board.brdId,
        }));
        setBoardOptions(newBoardOptions);
        setSelectedBoard(newBoardOptions.length > 0 ? newBoardOptions[0].value : '');
      }
    }).catch(() => {
      alert("등록 실패 (오류)");
    });
  };

  const MoveToArticleListView = () => {
    navigate('/brd/ArticleListView?brdId=' + brdVo.articleBean.brdId);
  };

  return (
    <>
      <h4 className="pb-lg-2">게시글 작성</h4>
      <GrayLine marginBottom="20px" marginTop="0px" />

      <CForm className="row g-3">
        <CCol md={3}>
          <CFormSelect
            label="폴더 선택"
            options={brdVo.folderBeanList.map(folderBean => ({
              label: folderBean.folName,
              value: folderBean.folId
            }))}
            name="folId"
            value={selectedFolder || ''}
            onChange={handleFolderChange}
          />
        </CCol>

        <CCol md={3}>
          <CFormSelect
            label="게시판 선택"
            options={boardOptions}
            name="brdId"
            value={selectedBoard || ''}
            onChange={handleBoardChange}
          />
        </CCol>

        <CCol md={3}>
          <CFormSelect
            label="만료 기한"
            options={[
              { label: '영구', value: 'N' },
              { label: '만료 기한 설정', value: 'Y' }
            ]}
            name="isPermanent"
            value={isPermanent}
            onChange={handleIsPermanentChange}
          />
        </CCol>

        {isPermanent === 'Y' && (
          <CCol md={3}>
            <CFormLabel>게시 종료일자</CFormLabel>
            <DatePicker
              selected={expireDt}
              onChange={(date) => setExpireDt(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </CCol>
        )}

        <CCol md={9}>
          <div className="mb-1">
            <CFormLabel htmlFor="exampleFormControlInput1">제목</CFormLabel>
            <CFormInput
              id="exampleFormControlInput1"
              placeholder=""
              name="subject"
              onChange={changeAtclBean}
            />
          </div>
        </CCol>

        <CCol md={3}>
          <div className="mb-1">
            <CFormLabel htmlFor="exampleFormControlInput1">작성자</CFormLabel>
            <CFormInput
              id="memName"
              placeholder=""
              value={JSON.parse(localStorage.getItem('memberBean')).memName}
              disabled
            />
          </div>
        </CCol>

        <CCol md={12}>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlTextarea1">내용</CFormLabel>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={{
                image: {
                  uploadCallback: async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);

                    const res = await axios.post('/uploadImage', formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                    });

                    return { data: { link: res.data.imageUrl } };
                  },
                  previewImage: true,
                  alt: { present: true, mandatory: false },
                },
              }}
              editorStyle={{ height: '500px', backgroundColor: '#f5f5f5', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />

          </div>
        </CCol>

        <CCol md={12}>
          <div className="mb-3">
            <CFormLabel>파일 첨부</CFormLabel>
            <CFormInput type="file" id="formFileMultiple" multiple onChange={handleFileChange} />
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </CCol>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-3">
          <CButton color="dark" >임시 저장</CButton>
          <CButton className="me-md-2" onClick={submitArticle}>게시글 등록</CButton>
        </div>
      </CForm>
    </>
  );
};

export default ArticleReg;
