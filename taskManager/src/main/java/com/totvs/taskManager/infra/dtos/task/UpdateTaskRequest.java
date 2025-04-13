package com.totvs.taskManager.infra.dtos.task;

import com.totvs.taskManager.infra.enums.Priority;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTaskRequest {

    @NotBlank
    @Size(min = 3, max = 100)
    @Schema(description = "Título da task", example = "Implementar Swagger", required = true)
    private String title;

    @NotNull
    @Schema(description = "Prioridade da task", example = "LOW", required = true)
    private Priority priority;

    @NotNull
    @Schema(description = "Data de vencimento da task", example = "24/04/2025")
    private LocalDate date;

    @NotNull
    @Schema(description = "Status da task", example = "true")
    private boolean completed;
}
