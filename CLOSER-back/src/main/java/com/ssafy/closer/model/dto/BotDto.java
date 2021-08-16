package com.ssafy.closer.model.dto;

public class BotDto {
    private int bot_pk; // 봇 알림 pk
    private String userId; // 알림 받는 유저 id = 현재 로그인 한 유저
    private String content; // 유저가 작성한 알림 주제 내용
    private String day; // 요일 (월 - 금) 입력 시
    private String date; // 날짜 ( 1 - 30,31) 입력 시 - 우선 2월은 생각 안 함 ..
}
