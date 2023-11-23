import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import {
  CFormInput, CForm, CFormLabel, CFormTextarea,
  CFormSelect,
  CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider,
  CCol, CFormCheck, CButton
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import {right} from "core-js/internals/array-reduce";




const ArticleReg = () => {
  return (
    <>
      <h1 className="pb-lg-5"> 게시글 작성 창</h1>

      <CForm className="row g-3">

        <CCol md={3}>
          <CFormSelect
            label="폴더 선택"
            options={[
              {label: '임시 테스트 폴더 001', value: 'BF2311713518'},
              {label: '임시 테스트 폴더 002', value: 'BF4258826302'},
              {label: '임시 테스트 폴더 003', value: 'BF4258826303'}
            ]}
            name="folId"
          />
        </CCol>

        <CCol md={3}>
          <CFormSelect
            label="게시판 선택"
            options={[
              {label: '임시 그냥게시판', value: 'BB2115411073'},
              {label: '테스트 게시판 001', value: 'BB4265418620'}
            ]}
            name="brdId"
          />
        </CCol>


        <CCol md={3}>
          <CFormSelect
            label="만료 기한"
            options={[
              {label: '영구', value: 'N'},
              {label: '만료 기한 설정', value: 'Y'}
            ]}
            name=""
          />
        </CCol>


        <CCol md={3}>
          <CFormSelect
            label="게시 종료일자"
            options={[
              {label: '임시날짜 : 20991231', value: '20991231'},
              {label: '임시날짜 : 20231231', value: '20231231'}
            ]}
            name=""
            className="mb-3"
          />
        </CCol>


        <CCol md={9}>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">제목</CFormLabel>
            <CFormInput type="" id="exampleFormControlInput1" placeholder=""/>
          </div>
        </CCol>

        <CCol md={12}>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlTextarea1">내용</CFormLabel>
            <CFormTextarea id="exampleFormControlTextarea1" rows={12}></CFormTextarea>
          </div>
        </CCol>









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



        < div className = " d-grid gap-2 d-md-flex justify-content-md-end " >
          < CButton color = "dark" size="lg" > 임시 저장 </ CButton >
          < CButton  className = " me-md-2 " size="lg" > 게시글 등록 </ CButton >
        </ div >
      </CForm>




    </>
  )
}

export default ArticleReg
