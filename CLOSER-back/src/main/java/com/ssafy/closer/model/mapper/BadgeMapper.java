package com.ssafy.closer.model.mapper;

import com.ssafy.closer.model.dto.AlarmDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BadgeMapper {
    void deleteBadge();
    void insertBadge1();
    void insertBadge2();
    void insertBadge3();
    void updateauto();
}
