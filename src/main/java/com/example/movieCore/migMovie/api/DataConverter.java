package com.example.movieCore.migMovie.api;

import com.example.movieCore.migMovie.bean.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class DataConverter {
    public ArrayList<MigMovieBean> convertToMovieBeanList(List<LinkedHashMap<String, Object>> linkedHashMapList) {
        ArrayList<MigMovieBean> migMovieBeanList = new ArrayList<>();

        for (LinkedHashMap<String, Object> linkedHashMap : linkedHashMapList) {
            MigMovieBean migMovieBean = convertToMovieBean(linkedHashMap);
            migMovieBeanList.add(migMovieBean);
        }

        return migMovieBeanList;
    }

    private MigMovieBean convertToMovieBean(LinkedHashMap<String, Object> linkedHashMap) {
        MigMovieBean migMovieBean = new MigMovieBean();
        migMovieBean.setMovieCd((String) linkedHashMap.get("movieCd"));
        migMovieBean.setMovieNm((String) linkedHashMap.get("movieNm"));
        migMovieBean.setMovieNmEn((String) linkedHashMap.get("movieNmEn"));
        migMovieBean.setPrdtYear((String) linkedHashMap.get("prdtYear"));
        migMovieBean.setOpenDt((String) linkedHashMap.get("openDt"));
        migMovieBean.setTypeNm((String) linkedHashMap.get("typeNm"));
        migMovieBean.setPrdtStatNm((String) linkedHashMap.get("prdtStatNm"));
        migMovieBean.setNationAlt((String) linkedHashMap.get("nationAlt"));
        migMovieBean.setGenreAlt((String) linkedHashMap.get("genreAlt"));
        migMovieBean.setRepNationNm((String) linkedHashMap.get("repNationNm"));
        migMovieBean.setRepGenreNm((String) linkedHashMap.get("repGenreNm"));

        List<String> directors = (List<String>) linkedHashMap.get("directors");

        List<LinkedHashMap<String, Object>> companys = (List<LinkedHashMap<String, Object>>) linkedHashMap.get("companys");

        migMovieBean.setDirectors(directors != null ? new ArrayList<>(directors) : new ArrayList<>());
        migMovieBean.setCompanys(companys != null ? new ArrayList<>(companys) : new ArrayList<>());

        return migMovieBean;
    }




    /** 영화 상세 정보 데이터 변환 */
    public MigMovieInfoBean extractMovieInfoBean(Map<String, Object> jsonMap) {
        MigMovieInfoBean migMovieInfoBean = new MigMovieInfoBean();

        if (jsonMap.containsKey("movieInfoResult")) {
            Object movieInfoResultObject = jsonMap.get("movieInfoResult");

            if (movieInfoResultObject instanceof LinkedHashMap<?, ?>) {
                LinkedHashMap<?, ?> movieInfoResult = (LinkedHashMap<?, ?>) movieInfoResultObject;

                if (movieInfoResult.containsKey("movieInfo")) {
                    Object movieInfoObject = movieInfoResult.get("movieInfo");

                    if (movieInfoObject instanceof LinkedHashMap<?, ?>) {
                        LinkedHashMap<?, ?> movieInfo = (LinkedHashMap<?, ?>) movieInfoObject;

                        // Now, extract values from movieInfo and set them to the MovieInfoBean
                        migMovieInfoBean.setMovieCd(getStringFromMap(movieInfo, "movieCd"));
                        migMovieInfoBean.setMovieNm(getStringFromMap(movieInfo, "movieNm"));
                        migMovieInfoBean.setMovieNmEn(getStringFromMap(movieInfo, "movieNmEn"));
                        migMovieInfoBean.setMovieNmOg(getStringFromMap(movieInfo, "movieNmOg"));
                        migMovieInfoBean.setShowTm(getStringFromMap(movieInfo, "showTm"));
                        migMovieInfoBean.setPrdtYear(getStringFromMap(movieInfo, "prdtYear"));
                        migMovieInfoBean.setOpenDt(getStringFromMap(movieInfo, "openDt"));
                        migMovieInfoBean.setPrdtStatNm(getStringFromMap(movieInfo, "prdtStatNm"));
                        migMovieInfoBean.setTypeNm(getStringFromMap(movieInfo, "typeNm"));
                        migMovieInfoBean.setNations(getListFromMap(movieInfo, "nations"));
                        migMovieInfoBean.setGenres(getListFromMap(movieInfo, "genres"));
                        migMovieInfoBean.setDirectors(getListFromMap(movieInfo, "directors"));
                        migMovieInfoBean.setActors(getListFromMap(movieInfo, "actors"));
                        migMovieInfoBean.setShowTypes(getListFromMap(movieInfo, "showTypes"));
                        migMovieInfoBean.setCompanys(getListFromMap(movieInfo, "companys"));
                        migMovieInfoBean.setAudits(getListFromMap(movieInfo, "audits"));
                        migMovieInfoBean.setStaffs(getListFromMap(movieInfo, "staffs"));
                        migMovieInfoBean.setSource(getStringFromMap(movieInfo, "source"));
                    }
                }
            }
        }

        return migMovieInfoBean;
    }

    private String getStringFromMap(LinkedHashMap<?, ?> map, String key) {
        if (map.containsKey(key)) {
            Object value = map.get(key);
            return (value != null) ? value.toString() : null;
        }
        return null;
    }


    private List<Map<String, Object>> getListFromMap(LinkedHashMap<?, ?> map, String key) {
        if (map.containsKey(key)) {
            Object value = map.get(key);
            if (value instanceof List<?>) {
                //noinspection unchecked
                return (List<Map<String, Object>>) value;
            }
        }
        return null;
    }




    /** 영화 회사 데이터 변환 */
    public ArrayList<MigMovieCompanyBean> convertToMovieCompanyBeanList(Object jsonMap) {
        ArrayList<MigMovieCompanyBean> migMovieCompanyBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("companyListResult")) {
                LinkedHashMap<String, Object> companyListResult = (LinkedHashMap<String, Object>) topLevelMap.get("companyListResult");

                if (companyListResult.containsKey("companyList")) {
                    ArrayList<LinkedHashMap<String, Object>> companyList = (ArrayList<LinkedHashMap<String, Object>>) companyListResult.get("companyList");

                    for (LinkedHashMap<String, Object> companyMap : companyList) {
                        migMovieCompanyBeanList.add(convertToMovieCompanyBean(companyMap));
                    }
                }
            }
        }

        return migMovieCompanyBeanList;
    }

    private MigMovieCompanyBean convertToMovieCompanyBean(LinkedHashMap<String, Object> linkedHashMap) {
        MigMovieCompanyBean migMovieCompanyBean = new MigMovieCompanyBean();
        migMovieCompanyBean.setCompanyCd((String) linkedHashMap.get("companyCd"));
        migMovieCompanyBean.setCompanyNm((String) linkedHashMap.get("companyNm"));
        migMovieCompanyBean.setCompanyNmEn((String) linkedHashMap.get("companyNmEn"));
        migMovieCompanyBean.setCompanyPartNames((String) linkedHashMap.get("companyPartNames"));
        migMovieCompanyBean.setCeoNm((String) linkedHashMap.get("ceoNm"));
        migMovieCompanyBean.setFilmoNames((String) linkedHashMap.get("filmoNames"));

        return migMovieCompanyBean;
    }




    /** 영화 인 데이터 형 변환 */
    public ArrayList<MigMoviePeopleBean> convertToMoviePeopleBeanList(Object jsonMap) {
        ArrayList<MigMoviePeopleBean> migMoviePeopleBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("peopleListResult")) {
                LinkedHashMap<String, Object> peopleListResult = (LinkedHashMap<String, Object>) topLevelMap.get("peopleListResult");

                if (peopleListResult.containsKey("peopleList")) {
                    ArrayList<LinkedHashMap<String, Object>> peopleList = (ArrayList<LinkedHashMap<String, Object>>) peopleListResult.get("peopleList");

                    for (LinkedHashMap<String, Object> peopleMap : peopleList) {
                        migMoviePeopleBeanList.add(convertToMoviePeopleBean(peopleMap));
                    }
                }
            }
        }

        return migMoviePeopleBeanList;
    }

    private MigMoviePeopleBean convertToMoviePeopleBean(LinkedHashMap<String, Object> people) {
        MigMoviePeopleBean migMoviePeopleBean = new MigMoviePeopleBean();
        migMoviePeopleBean.setPeopleCd((String) people.get("peopleCd"));
        migMoviePeopleBean.setPeopleNm((String) people.get("peopleNm"));
        migMoviePeopleBean.setPeopleNmEn((String) people.get("peopleNmEn"));
        migMoviePeopleBean.setRepRoleNm((String) people.get("repRoleNm"));
        migMoviePeopleBean.setFilmoNames((String) people.get("filmoNames"));

        return migMoviePeopleBean;
    }


    public ArrayList<MigMoviePeopleInfoBean> convertToMoviePeopleInfoBeanList(Object jsonMap) {
        ArrayList<MigMoviePeopleInfoBean> migMoviePeopleInfoBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("peopleInfoResult")) {
                LinkedHashMap<String, Object> peopleInfoResult = (LinkedHashMap<String, Object>) topLevelMap.get("peopleInfoResult");

                if (peopleInfoResult.containsKey("peopleInfo")) {
                    LinkedHashMap<String, Object> peopleInfo = (LinkedHashMap<String, Object>) peopleInfoResult.get("peopleInfo");

                    MigMoviePeopleInfoBean migMoviePeopleInfoBean = convertToMoviePeopleInfoBean(peopleInfo);
                    migMoviePeopleInfoBeanList.add(migMoviePeopleInfoBean);
                }
            }
        }

        return migMoviePeopleInfoBeanList;
    }

    private MigMoviePeopleInfoBean convertToMoviePeopleInfoBean(LinkedHashMap<String, Object> linkedHashMap) {
        MigMoviePeopleInfoBean migMoviePeopleInfoBean = new MigMoviePeopleInfoBean();
        migMoviePeopleInfoBean.setPeopleCd((String) linkedHashMap.get("peopleCd"));
        migMoviePeopleInfoBean.setPeopleNm((String) linkedHashMap.get("peopleNm"));
        migMoviePeopleInfoBean.setPeopleNmEn((String) linkedHashMap.get("peopleNmEn"));
        migMoviePeopleInfoBean.setSex((String) linkedHashMap.get("sex"));
        migMoviePeopleInfoBean.setRepRoleNm((String) linkedHashMap.get("repRoleNm"));


        List<LinkedHashMap<String, Object>> filmoList = (List<LinkedHashMap<String, Object>>) linkedHashMap.get("filmos");

        if (filmoList != null && !filmoList.isEmpty()) {
            List<String> movieNmList = new ArrayList<>();

            int filmoCnt = 0;

            for (LinkedHashMap<String, Object> filmoMap : filmoList) {
                // 필모 너무 길면 스톱
                if(filmoCnt > 30){
                    break;
                }
                String movieNm = (String) filmoMap.get("movieNm");

                if (movieNm != null && !movieNm.isEmpty()) {
                    movieNmList.add(movieNm);
                }
                filmoCnt++;
            }

            String filmos = String.join(", ", movieNmList);
            migMoviePeopleInfoBean.setFilmos(filmos);
        } else {
            migMoviePeopleInfoBean.setFilmos(""); // 빈 문자열로 설정 또는 null로 설정하셔도 됩니다.
        }

        return migMoviePeopleInfoBean;
    }


    public ArrayList<MigMovieNationBean> convertToMovieNationBeanList(Object jsonMap) {
        ArrayList<MigMovieNationBean> migMovieNationBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("codes")) {
                ArrayList<LinkedHashMap<String, Object>> codesList = (ArrayList<LinkedHashMap<String, Object>>) topLevelMap.get("codes");

                for (LinkedHashMap<String, Object> codeMap : codesList) {
                    migMovieNationBeanList.add(convertToMovieNationBean(codeMap));
                }
            }
        }

        return migMovieNationBeanList;
    }

    private MigMovieNationBean convertToMovieNationBean(LinkedHashMap<String, Object> linkedHashMap) {
        MigMovieNationBean migMovieNationBean = new MigMovieNationBean();
        migMovieNationBean.setNationCd((String) linkedHashMap.get("fullCd"));
        migMovieNationBean.setKorNm((String) linkedHashMap.get("korNm"));
        migMovieNationBean.setEngNm((String) linkedHashMap.get("engNm"));

        return migMovieNationBean;
    }






}
