package com.ssafy.closer.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.closer.model.dto.MemberDto;

@Mapper
public interface UserMapper {
    Map<String, String> login(Map<String, String> user) throws SQLException;

    //	REST
    List<MemberDto> userList();
    MemberDto userInfo(String userId);
    int userRegister(MemberDto memberDto);
    int userModify(MemberDto memberDto);
    int userDelete(String userid);
    int userIdCheck(String userId);
    int userNicknameCheck(String nickname);
    Map<String, Object> userother(String userId);
}
