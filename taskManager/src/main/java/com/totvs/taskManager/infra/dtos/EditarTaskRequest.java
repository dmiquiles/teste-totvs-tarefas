package com.totvs.taskManager.infra.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EditarTaskRequest {

    @NotBlank
    @Size(min = 3, max = 100)
    @Schema(description = "Título da task", example = "Implementar Swagger", required = true)
    private String titulo;

    @Size(max = 500)
    @Schema(description = "Descrição detalhada", example = "Documentar a API com Swagger")
    private String descricao;

    @NotNull
    @Schema(description = "Status da task", example = "Documentar a API com Swagger")
    private boolean finalizado;
}
