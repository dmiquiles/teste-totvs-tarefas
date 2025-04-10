package com.totvs.taskManager.infra.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponse {
    private Long id;
    private String titulo;
    private String descricao;
    private boolean finalizado;
}
