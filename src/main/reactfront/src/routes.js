import React from 'react'


/** 커스텀 루트 주소 */
// 관리자
// - 회원 관리
const MemberManage = React.lazy(() => import('./views/admin/mem/MemberManage'))

// - 영화 이관 관리
const MovieMigManage = React.lazy(() => import('./views/admin/movie/MovieMigManage'))
// - 박스오피스 배치 관리
const BatchManage = React.lazy(() => import('./views/admin/movie/BatchManage'))
// - 영화 리스트 관리
const MovieListManage = React.lazy(() => import('./views/admin/movie/MovieListManage'))
//    - 영화 상세정보 관리
const MovieInfoManage = React.lazy(() => import('./views/admin/movie/MovieInfoManage'))

// - 폴더/게시판 생성
const CreateFolderBoard = React.lazy(() => import('./views/admin/brd/CreateFolderBoard'))
// - 폴더/게시판 관리
const FolderBoardList = React.lazy(() => import('./views/admin/brd/FolderBoardList'))
// - 게시글 관리
const ArticleListManage = React.lazy(() => import('./views/admin/brd/ArticleListManage'))


// 로그인
// - 로그인 페이지
const Login = React.lazy(() => import('./views/login/Login'))
// - 회원가입
const Register = React.lazy(() => import('./views/login/Register'))
// - 이메일 인증 페이지
const EmailCert = React.lazy(() => import('./views/login/EmailCert'))
// - 계정 찾기 선택
const SelectFindIdPw = React.lazy(() => import('./views/login/SelectFindIdPw'))
// - id 찾기
const FindId = React.lazy(() => import('./views/login/FindId'))
// - pw 찾기
const FindPassword = React.lazy(() => import('./views/login/FindPassword'))


// 영화
// - 영화 리스트
const MovieList = React.lazy(() => import('./views/movie/MovieList'))
// - 영화 박스 오피스
const BoxOffice = React.lazy(() => import('./views/movie/BoxOffice'))
// - 영화 상세정보
const MovieInfo = React.lazy(() => import('./views/movie/MovieInfo'))
// - 무비코어 추천 영화
const MovieRecommend = React.lazy(() => import('./views/movie/MovieRecommend'))



// 게시판
// - 게시글 작성
const ArticleReg = React.lazy(() => import('./views/brd/article/ArticleReg'))
// - 게시글 리스트
const ArticleListView = React.lazy(() => import('./views/brd/article/ArticleListView'))
// - 게시글 상세정보
const ArticleDetail = React.lazy(() => import('./views/brd/article/ArticleDetail'))
// - 게시글 수정
const ArticleUpdate = React.lazy(() => import('./views/brd/article/ArticleUpdate'))


// 마이페이지
// - 비밀번호 확인
const CheckPassword = React.lazy(() => import('./views/member/myInformation/CheckPassword'))
// - 내 정보 관리
const Profile = React.lazy(() => import('./views/member/myInformation/Profile'))
// - 내가 찜한 영화
const MyFavMovie = React.lazy(() => import('./views/member/favMov/MyFavMovie'))



// QnA
// - 시스템 공지사항
const SystemNotice = React.lazy(() => import('./views/qna/systemNotice/SystemNotice'))
// - 자주 묻는 질문
const FreqQuestion = React.lazy(() => import('./views/qna/freqQuestion/FreqQuestion'))
// - 채팅 상담
const ChattingCounseling = React.lazy(() => import('./views/qna/chattingCounseling/ChattingCounseling'))
// - 패치 노트
const PatchNotes = React.lazy(() => import('./views/qna/patchNotes/PatchNotes'))




/** 템플릿 루트 주소 */
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [



  /** 커스텀 루트 배열  */

  // 관리자
  // - 회원 관리
  { path: '/admin/MemberManage', name: 'MemberManage', element: MemberManage },


  // 로그인
  // - 로그인 페이지
  { path: '/login/Login', name: 'Login', element: Login },
  // - 회원 가입
  { path: '/login/Register', name: 'Register', element: Register },
  // - 이메일 인증 페이지
  { path: '/login/EmailCert', name: 'EmailCert', element: EmailCert },
  // - 계정 찾기 선택
  { path: '/login/SelectFindIdPw', name: 'SelectFindIdPw', element: SelectFindIdPw },
  // - id 찾기
  { path: '/login/FindId', name: 'FindId', element: FindId },
  // - 비밀번호 찾기
  { path: '/login/FindPassword', name: 'FindPassword', element: FindPassword },


  // - 영화 이관 관리
  { path: '/admin/MovieMigManage', name: 'MovieMigManage', element: MovieMigManage },
  // - 박스오피스 배치 관리
  { path: '/admin/BatchManage', name: 'BatchManage', element: BatchManage },
  // - 영화 리스트 관리
  { path: '/admin/MovieListManage', name: 'MovieListManage', element: MovieListManage },
  //    - 영화 상세정보 관리
  { path: '/admin/MovieInfoManage', name: 'MovieInfoManage', element: MovieInfoManage },


  // - 폴더/게시판 생성
  { path: '/admin/CreateFolderBoard', name: 'CreateFolderBoard', element: CreateFolderBoard },
  // - 폴더/게시판 관리
  { path: '/admin/FolderBoardList', name: 'FolderBoardList', element: FolderBoardList },
  // - 게시글 관리
  { path: '/admin/ArticleListManage', name: 'ArticleListManage', element: ArticleListManage },


  // 영화
  // - 영화 리스트
  { path: '/movie/MovieList', name: 'MovieList', element: MovieList },
  // - 영화 박스 오피스
  { path: '/movie/BoxOffice', name: 'BoxOffice', element: BoxOffice },
  // - 영화 상세정보
  { path: '/movie/MovieInfo', name: 'MovieInfo', element: MovieInfo },
  // - 무비코어 추천 영화
  { path: '/movie/MovieRecommend', name: 'MovieRecommend', element: MovieRecommend },


  // 게시판
  // - 게시글 작성
  { path: '/brd/ArticleReg', name: 'ArticleReg', element: ArticleReg },
  // - 게시글 리스트 화면
  { path: '/brd/ArticleListView', name: 'ArticleListView', element: ArticleListView },
  // - 게시글 상세화면
  { path: '/brd/ArticleDetail', name: 'ArticleDetail', element: ArticleDetail },
  // - 게시글 수정화면
  { path: '/brd/ArticleUpdate', name: 'ArticleUpdate', element: ArticleUpdate },


  // 마이페이지
  // - 비밀번호 확인
  { path: '/member/myInformation/CheckPassword', name: 'CheckPassword', element: CheckPassword },
  // - 내 정보 관리
  { path: '/member/myInformation/Profile', name: 'Profile', element: Profile },
  // - 내가 찜한 영화
  { path: '/member/favMov/MyFavMovie', name: 'MyFavMovie', element: MyFavMovie },


  // QnA
  // - 시스템 공지사항
  { path: '/qna/SystemNotice', name: 'SystemNotice', element: SystemNotice },
  // - 자주 묻는 질문
  { path: '/qna/FreqQuestion', name: 'FreqQuestion', element: FreqQuestion },
  // - 채팅 상담
  { path: '/qna/ChattingCounseling', name: 'ChattingCounseling', element: ChattingCounseling },
  // - 패치 노트
  { path: '/qna/PatchNotes', name: 'PatchNotes', element: PatchNotes },





  /** 템플릿 루트 배열 */
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
