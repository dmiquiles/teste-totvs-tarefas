package com.totvs.taskManager.infra.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {
    @NotBlank
    @Size(min = 3, max = 100)
    @Schema(description = "Título da task", example = "Implementar Swagger", required = true)
    private String titulo;

    @Size(max = 500)
    @Schema(description = "Descrição detalhada", example = "Documentar a API com Swagger")
    private String descricao;
}
