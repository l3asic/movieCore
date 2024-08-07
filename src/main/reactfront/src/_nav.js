import React, {useEffect} from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAvTimer,
  cilBell, cilBraille, cilBug,
  cilCalculator, cilCalendarCheck,
  cilChartPie, cilClipboard, cilCloudDownload, cilCoffee,
  cilCursor,
  cilDescription,
  cilDrop, cilLightbulb, cilMovie,
  cilNotes,
  cilPencil, cilPlus,
  cilPuzzle, cilRunning,
  cilStar, cilUser, cilVideo,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import axios from "axios";

let brdVo = {};


const _nav = [
  /*{
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },*/

  /** 커스텀 관리자 모듈  */
  {
    component: CNavTitle,
    name: '관리자',
  },

  {
    component: CNavGroup,
    name: '관리자',
    to: '/base',
    icon: <CIcon icon={cilBug} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '회원 관리',
        to: '/admin/memberManage',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" style={{ paddingLeft : "15px", marginRight : "10px" }} />,
      },


      {
        component: CNavGroup,
        name: '영화 관리',
        to: '/admin/MovieMigManage',
        icon: <CIcon icon={cilMovie} customClassName="nav-icon" style={{ paddingLeft : "15px", marginRight : "10px" }} />,
        items: [
          {
            component: CNavItem,
            name: '이관 및 API 관리',
            icon: <CIcon icon={cilCloudDownload} customClassName="nav-icon" style={{ paddingLeft : "30px", marginRight : "10px" }} />,
            to: '/admin/MovieMigManage',
          },
          {
            component: CNavItem,
            name: '영화 목록 관리',
            icon: <CIcon icon={cilBraille} customClassName="nav-icon" style={{ paddingLeft : "30px", marginRight : "10px" }} />,
            to: '/admin/MovieListManage',
          },
        ],
      },


      {
        component: CNavGroup,
        name: '게시판 관리',
        to: '/admin/boardManage',
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" style={{ paddingLeft : "15px", marginRight : "10px" }} />,
        items: [
          {
            component: CNavItem,
            name: '폴더/게시판 생성',
            icon: <CIcon icon={cilPlus} customClassName="nav-icon" style={{ paddingLeft : "30px", marginRight : "10px" }} />,
            to: '/admin/CreateFolderBoard',
          },
          {
            component: CNavItem,
            name: '폴더/게시판 관리',
            icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" style={{ paddingLeft : "30px", marginRight : "10px" }} />,
            to: '/admin/FolderBoardList',
          },
          {
            component: CNavItem,
            name: '게시글 관리',
            icon: <CIcon icon={cilNotes} customClassName="nav-icon" style={{ paddingLeft : "30px", marginRight : "10px" }} />,
            to: '/admin/ArticleListManage'

          }

        ],
      },


      {
        component: CNavItem,
        name: '배치 관리',
        to: '/admin/BatchManage',
        icon: <CIcon icon={cilAvTimer} customClassName="nav-icon" style={{ paddingLeft : "15px", marginRight : "10px" }} />,
      },



    ],
  },


  /** 커스텀 영화 모듈  */
  {
    component: CNavTitle,
    name: '영화',
  },

  {
    component: CNavGroup,
    name: '영화',
    to: '/base',
    icon: <CIcon icon={cilMovie} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '영화 목록',
        icon: <CIcon icon={cilVideo} customClassName="nav-icon" style={{ paddingLeft : "30px", marginRight : "10px" }} />,
        to: '/movie/MovieList',
      },

      {
        component: CNavItem,
        name: '박스 오피스',
        icon: <CIcon icon={cilCoffee} customClassName="nav-icon" style={{ paddingLeft : "30px", marginRight : "10px" }} />,
        to: '/movie/BoxOffice',
      },

      {
        component: CNavItem,
        name: 'MovieCore 추천 영화',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" style={{ paddingLeft : "30px", marginRight : "10px" }} />,
        to: '/movie/MovieRecommend',
      },



    ],
  },













  /** 커스텀 게시판 모듈  */
  {
    component: CNavTitle,
    name: '게시판',
  },
  {
    component: CNavItem,
    name: '게시글 작성',
    to: '/brd/articleReg',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },

  /** 폴더/게시판리스트 렌더링 영역 */



  /** 커스텀 QnA 모듈  */
  /*{
    component: CNavTitle,
    name: 'QnA',
  },

  {
    component: CNavGroup,
    name: 'QnA',
    icon: <CIcon icon={cilLightbulb} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '시스템 공지사항',
        to: '/qna/SystemNotice',
      },
      {
        component: CNavItem,
        name: '자주 묻는 질문',
        to: '/qna/FreqQuestion',
      },
      {
        component: CNavItem,
        name: '채팅 상담',
        to: '/qna/ChattingCounseling',
      },
      {
        component: CNavItem,
        name: '패치노트',
        to: '/qna/PatchNotes',
      },

    ],
  },*/







  /** 사이드바 템플릿 컴포넌트 */
  /*{
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },


  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },*/




]





export default _nav
