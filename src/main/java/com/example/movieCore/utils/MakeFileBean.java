package com.example.movieCore.utils;


import com.example.movieCore.cmm.FileBean;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.io.IOException;


public class MakeFileBean {


    private final String UPLOAD_DIR = "/movieCore/src/main/reactfront/public/uploadFiles"; // 파일 업로드 기본 경로

    private final String SHORT_FILE_PATH = "uploadFiles"; // 짧은 파일 경로


    /** 
     * 파일 업로드 및 FileBean 값 생성
     * */
    public FileBean makingFileBean(String moduleName, MultipartFile file) throws IOException {

        FileBean fileBean = new FileBean();

        // 상세 폴더 경로 추가
        String fullPath = "";

        // 상세경로를 날짜로 포멧팅
        LocalDate today = LocalDate.now();
        String formattedToday = today.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));

        // 파일 경로 : 기본 업로드 경로 + /모둘명 + /업로드 날짜
        fullPath = UPLOAD_DIR + "/" + moduleName + "/"+  formattedToday;

        // 파일이 비어있지 않은 경우에만 업로드를 진행합니다.
        if (!file.isEmpty()) {
            
            /** 물리적 파일 업로드 */
            // 업로드할 디렉토리가 없다면 생성합니다.
            Path uploadPath = Paths.get(fullPath);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 파일을 지정된 경로에 저장합니다.
            String originalFileName = file.getOriginalFilename();
            Path filePath = uploadPath.resolve(file.getOriginalFilename());

            // 파일 이름 중복 처리
            int count = 1;
            while (Files.exists(filePath)) {
                count++;
                // 파일이 이미 존재하는 경우에는 숫자를 더해 파일 이름을 변경합니다. ex: 이미지명(2).jpg
                int lastIndex = originalFileName.lastIndexOf('.');
                String fileName = originalFileName.substring(0, lastIndex) + "(" + count + ")"; // 파일 이름에 숫자 추가
                String fileExt = originalFileName.substring(lastIndex + 1); // 확장자 추출
                filePath = uploadPath.resolve(fileName + "." + fileExt);
            }


            Files.copy(file.getInputStream(), filePath);


            /** FileBean 값 할당 */
            // 파일 경로 할당
            fileBean.setUrl(fullPath);

            // 파일 id 생성 및 할당
            MakeUUID makeUUID = new MakeUUID();
            String fileId = makeUUID.makeShortUUID("CF");   // Common File
            fileBean.setFileId(fileId);

            // 모듈 명 할당
            fileBean.setModule(moduleName);

            // 로컬 파일 명, 파일 명, 확장자 할당
            int lastIndex = originalFileName.lastIndexOf('.');
            String fileName = originalFileName.substring(0, lastIndex); // 파일 이름 추출
            if(count>1){
                fileName += "("+ count + ")";
            }
            String fileExt = originalFileName.substring(lastIndex + 1); // 확장자 추출
            fileBean.setLocalName(fileName + "." +fileExt);
            fileBean.setFileName(fileName);
            fileBean.setFileExt(fileExt);

            // 파일 용량
            String fileSize = String.format("%.2f", file.getSize() / (1024.0 * 1024.0));
            fileBean.setVolume(fileSize);

            // 파일 날짜
            fileBean.setCreateDt(java.sql.Date.valueOf(today));


            // 짧은 파일 경로 (업로드파일즈/모듈명/날짜/파일이름.확장자)
            fileBean.setSrc(SHORT_FILE_PATH + "/" + moduleName + "/"+  formattedToday + "/" + fileBean.getLocalName());



        }

        return fileBean;

    }




}
