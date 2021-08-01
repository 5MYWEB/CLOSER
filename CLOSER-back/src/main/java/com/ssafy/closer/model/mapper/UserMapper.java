package com.ssafy.closer.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.closer.model.dto.MemberDto;

@Mapper
public interface UserMapper {
//    public Map<String, String> login(Map<String, String> user) throws SQLException;
//
//    //	REST
//    public List<MemberDto> userList();
    MemberDto userInfo(String userId);
//    public int userRegister(MemberDto memberDto);
//    public int userModify(MemberDto memberDto);
//    public int userDelete(String userid);
//    public int userIdCheck(String userId);
//    public int userNicknameCheck(String nickname);
//    Map<String, Object> userother(String userId);
}
