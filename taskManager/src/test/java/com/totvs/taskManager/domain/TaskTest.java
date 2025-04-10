package com.totvs.taskManager.domain;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class TaskTest {
    @Test
    void marcarComoFinalizado_DeveAlterarFinalizadoParaTrue_QuandoNaoFinalizado() {

        Task task = new Task(1L, "Título", "Descrição", false, LocalDateTime.now(), null);

        task.marcarComoFinalizado();

        assertTrue(task.isFinalizado());
    }

    @Test
    void marcarComoFinalizado_NaoDeveAlterarFinalizado_QuandoJaFinalizado() {

        Task task = new Task(1L, "Título", "Descrição", true, LocalDateTime.now(), null);

        task.marcarComoFinalizado();

        assertTrue(task.isFinalizado());
    }
}