package com.totvs.taskManager.infra.dtos.task;

import com.totvs.taskManager.infra.enums.Priority;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponse {

    private Long id;
    private String title;
    private boolean completed;
    private Priority priority;
    private LocalDateTime date;
    private LocalDateTime updateAt;
    private LocalDateTime createdAt;
}
