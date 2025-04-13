package com.totvs.taskManager.domain;

import com.totvs.taskManager.infra.enums.Priority;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class TaskTest {
    @Test
    void marcarComoFinalizado_DeveAlterarFinalizadoParaTrue_QuandoNaoFinalizado() {

        Task task = new Task(1L, "Título", false, Priority.LOW, LocalDateTime.now(), LocalDateTime.now(), null);

        task.toggleComplete();

        assertTrue(task.isCompleted());
    }

    @Test
    void marcarComoFinalizado_NaoDeveAlterarFinalizado_QuandoJaFinalizado() {

        Task task = new Task(1L, "Título", true, Priority.LOW, LocalDateTime.now(), LocalDateTime.now(), null);

        task.toggleComplete();

        assertTrue(task.isCompleted());
    }
}