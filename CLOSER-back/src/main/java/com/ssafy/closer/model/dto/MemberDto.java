package com.ssafy.closer.model.dto;

import lombok.*;

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
    private Integer homeAlone;
    private String intro;
    private String profileImg;
    private String phone;
}
