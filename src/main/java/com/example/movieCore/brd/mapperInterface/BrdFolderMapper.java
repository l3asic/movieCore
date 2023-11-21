package com.example.movieCore.brd.mapperInterface;

import com.example.movieCore.brd.vo.BrdVo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BrdFolderMapper {

    public boolean createFolder(BrdVo vo);


}
