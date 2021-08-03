package com.ssafy.closer.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    private String userId;
    private String nickname;
    private String password;
    private String email;
    private String addr;
    private int homeAlone;
    private String intro;
    private String profileImg;
    private String phone;
    private List<Integer> badge;
}
