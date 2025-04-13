package com.totvs.taskManager.infra.dtos.user;

import com.totvs.taskManager.domain.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserResponse toResponse(User user);
    User userRequestToEntity(UserRequest request);
}
