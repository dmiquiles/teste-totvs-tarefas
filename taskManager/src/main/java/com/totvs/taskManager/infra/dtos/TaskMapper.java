package com.totvs.taskManager.infra.dtos;

import com.totvs.taskManager.domain.Task;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    TaskResponse toResponse(Task task);
    Task taskRequestToEntity(TaskRequest request);
    Task editarTaskRequestToEntity(EditarTaskRequest request);
}
