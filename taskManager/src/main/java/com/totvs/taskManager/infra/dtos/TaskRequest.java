package com.totvs.taskManager.infra.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.totvs.taskManager.infra.enums.Priority;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {
    @NotBlank
    @Size(min = 3, max = 100)
    @Schema(description = "Título da task", example = "Implementar Swagger", required = true)
    private String title;

    @NotNull
    @Schema(description = "Data de conclusão", example = "2023-10-01")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @NotNull
    @Schema(description = "Prioridade da tarefa", example = "MEDIUM")
    private Priority priority;
}
