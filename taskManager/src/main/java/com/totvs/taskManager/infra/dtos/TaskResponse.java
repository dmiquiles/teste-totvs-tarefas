package com.totvs.taskManager.infra.dtos;

import com.totvs.taskManager.infra.enums.Priority;
import jakarta.persistence.*;
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
