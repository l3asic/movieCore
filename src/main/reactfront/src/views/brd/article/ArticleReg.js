import React, { useEffect, useState } from 'react'
import {
  CFormInput, CForm, CFormLabel, CFormTextarea,
  CFormSelect,
  CCol, CButton
} from '@coreui/react'
import axios from "axios";
import {useLocation} from "react-router-dom";



const ArticleReg = () => {
  const location = useLocation();
  const { articleData } = location.state || {}; // 전달된 데이터

  const [brdVo, setBrdVo] = useState({
    folderBean : {},
    folderBeanList : [],
    boardBean : {},
    boardBeanList : [],
    articleBean : {}
  });


  const [articleBean, setArticleBean] = useState({
      atclId : '',
      brdId : '',
      memId : '',
      subject : '',
      content : ''
  });


  // 파일 상태
  const [file, setFile] = useState(null);

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };



  /** 전체 폴더와 게시판 조회 */
  useEffect(() => {
    selectAllFolderBoardList();
  }, [])




  // 폴더와 게시판 상태
  const [selectedFolder, setSelectedFolder] = useState(articleData && articleData.length > 0 ? articleData[0].folderBeanList[0].folId : null);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardOptions, setBoardOptions] = useState([]);


  // 폴더 선택 이벤트 핸들러
  const handleFolderChange = (event) => {
    const folderValue = event.target.value;
    // 폴더가 변경될 때마다 게시판 상태를 초기화하고 폴더 상태 업데이트
    setSelectedBoard(null);
    setSelectedFolder(folderValue);
  };

  // 게시판 선택 이벤트 핸들러
  const handleBoardChange = (event) => {
    const boardValue = event.target.value;
    // 게시판 상태 업데이트
    setSelectedBoard(boardValue);
    changeAtclBean(event);
  };


  // 선택된 폴더에 따라 게시판 옵션을 업데이트하는 효과
  useEffect(() => {
    if (selectedFolder) {
      // 여기서는 간단히 폴더에 대한 데이터를 가져온다고 가정
      const folderData = brdVo.folderBeanList.find((folder) => folder.folId === selectedFolder);
      if (folderData) {
        // 선택된 폴더에 해당하는 게시판 옵션 생성
        const newBoardOptions = folderData.boardBeanList.map((boardBean) => ({
          label: boardBean.brdName,
          value: boardBean.brdId,
        }));
        setBoardOptions(newBoardOptions);
      }
    } else {
      // 선택된 폴더가 없을 경우 게시판 옵션 초기화
      setBoardOptions([]);
    }
  }, [selectedFolder]);




  return (
    <>
      <h1 className="pb-lg-5"> 게시글 작성 창</h1>

      <CForm className="row g-3">

        <CCol md={3}>
          <CFormSelect
            label="폴더 선택"
            options={brdVo.folderBeanList.map(folderBean => ({
              label: folderBean.folName,
              value: folderBean.folId
            }))}
            name="folId"
            value={articleData && articleData.length > 0 ? articleData[0].folId : null}
            onChange={handleFolderChange}
          />
        </CCol>

        <CCol md={3}>
          <CFormSelect
            label="게시판 선택"
            options={boardOptions}
            name="brdId"
            onChange={handleBoardChange}
          />
        </CCol>


        <CCol md={3}>
          <CFormSelect
            label="만료 기한"
            options={[
              {label: '영구', value: 'N'},
              {label: '만료 기한 설정', value: 'Y'}
            ]}
            name="expireYn"
            onChange={changeAtclBean}
          />
        </CCol>


        <CCol md={3}>
          <CFormSelect
            label="게시 종료일자"
            options={[
              {label: '임시날짜 : 20991231', value: '20991231'},
              {label: '임시날짜 : 20231231', value: '20231231'}
            ]}
            name="expireDate"
            className="mb-3"
          />
        </CCol>



        <CCol md={9}>
          <div className="mb-1">
            <CFormLabel htmlFor="exampleFormControlInput1">제목</CFormLabel>
            <CFormInput type="" id="exampleFormControlInput1" placeholder="" name="subject" onChange={changeAtclBean}/>
          </div>

        </CCol>

        <CCol md={3}>
          <CFormSelect
            label="말머리?"
            options={[
              {label: '말머리1', value: '1'},
              {label: '말머리2', value: '2'}
            ]}
            name=""
            className="mb-1"
          />
        </CCol>


        <CCol md={12}>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlTextarea1">내용</CFormLabel>
            <CFormTextarea id="exampleFormControlTextarea1" rows={10} name="content" onChange={changeAtclBean}></CFormTextarea>
          </div>
        </CCol>


        <CCol md={12}>
          <div className="mb-3">
            <CFormLabel htmlFor="formFileMultiple">파일 첨부</CFormLabel>
            <CFormInput type="file" id="formFileMultiple" multiple onChange={handleFileChange} />
          </div>
        </CCol>



        {/* 불필요칸 주석 */}
        {/*<CCol md={6}>
          <CFormInput type="email" id="inputEmail4" label="Email"/>
        </CCol>
        <CCol md={6}>
          <CFormInput type="password" id="inputPassword4" label="Password"/>
        </CCol>
        <CCol xs={12}>
          <CFormInput id="inputAddress" label="Address" placeholder="1234 Main St"/>
        </CCol>
        <CCol xs={12}>
          <CFormInput id="inputAddress2" label="Address 2" placeholder="Apartment, studio, or floor"/>
        </CCol>
        <CCol md={6}>
          <CFormInput id="inputCity" label="City"/>
        </CCol>
        <CCol md={4}>
          <CFormSelect id="inputState" label="State">
            <option>Choose...</option>
            <option>...</option>
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CFormInput id="inputZip" label="Zip"/>
        </CCol>
        <CCol xs={12}>
          <CFormCheck type="checkbox" id="gridCheck" label="Check me out"/>
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Sign in</CButton>
        </CCol>*/}



        < div className = " d-grid gap-2 d-md-flex justify-content-md-end pb-3" >
          < CButton color = "dark" size="lg" > 임시 저장 </ CButton >
          < CButton  className = " me-md-2 " size="lg" onClick={submitArticle}> 게시글 등록 </ CButton >
        </ div >
      </CForm>




    </>
  ) //return



  /** 모든 폴더/게시판 리스트 조회 */
  function selectAllFolderBoardList(){
    axios({
      url: '/selectAllFolderBoardList',
      method: 'post',
      params:{
      }

    }).then(function (res){
      const fetchedFolderBeanList = res.data.brdVo.folderBeanList;

      /* 폴더/게시판 기본값 세팅 */
      // 상태에 folderBeanList 설정
      setBrdVo((prevBrdVo) => ({
        ...prevBrdVo,
        folderBeanList: fetchedFolderBeanList,
      }));

      // 검색된 데이터에 폴더가 있는지 확인
      if (fetchedFolderBeanList.length > 0) {
        const defaultFolder = fetchedFolderBeanList[0];
        setSelectedFolder(defaultFolder.folId);

        // 기본 폴더를 기반으로 게시판 옵션 설정
        const newBoardOptions = defaultFolder.boardBeanList.map((board) => ({
          label: board.brdName,
          value: board.brdId,
        }));
        setBoardOptions(newBoardOptions);

        // 기본 폴더를 기반으로 선택된 게시판 설정
        setSelectedBoard(newBoardOptions.length > 0 ? newBoardOptions[0].value : null);
      }

    }).catch(function (err){
      alert("등록 실패 (오류)");
    });

  }



  /** 게시글 정보 입력시 객체에 세팅 */
  function changeAtclBean(e){
    const { value, name } = e.target;
    setArticleBean({
      ...articleBean,
        [name] : value
    });
  }


  // 파일 업로드 함수
  function atclFileUpload(brdVo) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('brdVo', JSON.stringify(brdVo)); // brdVo 객체를 직접 FormData에 추가

    return axios.post('/atclFileUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        // 파일 업로드 성공 시 처리
        console.log('File uploaded:', res.data);
        return res;
      })
      .catch(error => {
        // 파일 업로드 실패 시 처리
        console.error('Error uploading file:', error);
        throw error;
      });
  }





  /** 게시글 최종 작성(등록) */
  function submitArticle (){

    brdVo.articleBean = articleBean;

    /** 테스트용 기본값 추가 세팅 */
    var memberBean = JSON.parse(localStorage.getItem('memberBean'));
    brdVo.articleBean.memId = memberBean.memId;
    // brdVo.articleBean.atclBean.expireDt =  new Date(); // 날짜 타입 컨트롤러 값 전송시 추가 확인 필요

    axios({
      url: '/atclRegistry', // 통신할 웹문서
      method: 'post', // 통신할 방식
      params:{
        brdId: brdVo.articleBean.brdId,
        memId: brdVo.articleBean.memId,
        subject: brdVo.articleBean.subject,
        content: brdVo.articleBean.content
        /*expireDt:  brdVo.articleBean.expireDt*/
      }

    }).then(function (res){
      if(res.data.succesResult){

        // 첨부파일 추가 처리
        if (file) {
          debugger;
          atclFileUpload(res.data.brdVo);
        }

      }else{
        alert("등록 그냥 실패?");
      }

    }).catch(function (err){
      alert("등록 실패 (오류)");
    });

  }






}

export default ArticleReg
