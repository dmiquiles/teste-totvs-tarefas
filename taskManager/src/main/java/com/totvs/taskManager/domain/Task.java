package com.totvs.taskManager.domain;

import com.totvs.taskManager.infra.enums.Priority;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private boolean completed = false;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private LocalDateTime date;
    private LocalDateTime updateAt = null;
    private LocalDateTime createdAt = LocalDateTime.now();

}

