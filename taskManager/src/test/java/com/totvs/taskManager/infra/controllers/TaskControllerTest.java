package com.totvs.taskManager.infra.controllers;

import com.totvs.taskManager.application.TaskUseCase;
import com.totvs.taskManager.domain.Task;
import com.totvs.taskManager.infra.dtos.EditarTaskRequest;
import com.totvs.taskManager.infra.dtos.TaskMapper;
import com.totvs.taskManager.infra.dtos.TaskRequest;
import com.totvs.taskManager.infra.dtos.TaskResponse;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.ValidationException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskControllerTest {

    @Mock
    private TaskUseCase taskUseCase;

    @Mock
    private TaskMapper mapper;

    @InjectMocks
    private TaskController taskController;

    @Test
    void criarTask_DeveRetornarTaskResponse_QuandoRequestValido() {

        TaskRequest request = new TaskRequest("Tarefa 1", "Descrição");
        Task task = new Task(1L, "Tarefa 1", "Descrição", false, LocalDateTime.now(), null);
        TaskResponse response = new TaskResponse(1L, "Tarefa 1", "Descrição", false);

        when(mapper.taskRequestToEntity(request)).thenReturn(task);
        when(taskUseCase.criarTask(task)).thenReturn(task);
        when(mapper.toResponse(task)).thenReturn(response);

        TaskResponse resultado = taskController.criarTask(request);

        assertEquals(response, resultado);
        verify(taskUseCase, times(1)).criarTask(task);
    }

    @Test
    void criarTask_DeveLancarException_QuandoRequestInvalido() {

        TaskRequest request = new TaskRequest(null, "Descrição"); // Nome nulo, inválido

        doThrow(new ConstraintViolationException("Validação falhou", null))
                .when(mapper).taskRequestToEntity(request);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            taskController.criarTask(request);
        });

        assertEquals("Validação falhou", exception.getMessage());
        verifyNoInteractions(taskUseCase);

    }

    @Test
    void criarTask_DeveLancarException_QuandoTaskUseCaseFalhar() {

        TaskRequest request = new TaskRequest("Tarefa 1", "Descrição");
        Task task = new Task(1L, "Tarefa 1", "Descrição", false, LocalDateTime.now(), null);

        when(mapper.taskRequestToEntity(request)).thenReturn(task);
        when(taskUseCase.criarTask(task)).thenThrow(new RuntimeException("Erro ao criar task"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            taskController.criarTask(request);
        });

        assertEquals("Erro ao criar task", exception.getMessage());
        verify(taskUseCase, times(1)).criarTask(task);
    }

    @Test
    void listarTasks_DeveRetornarPageDeTasks_QuandoPaginaValida() {

        Pageable pageable = PageRequest.of(0, 10);
        List<Task> tasks = List.of(new Task(1L, "Tarefa 1", "Descrição", false, LocalDateTime.now(), null));
        Page<Task> page = new PageImpl<>(tasks, pageable, 1);

        when(taskUseCase.buscarTodasTasks(pageable)).thenReturn(page);

        ResponseEntity<Page<Task>> resposta = taskController.listarTasks(0, 10);

        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        assertEquals(1, resposta.getBody().getTotalElements());
        assertEquals("Tarefa 1", resposta.getBody().getContent().get(0).getTitulo());
    }

    @Test
    void listarTasks_DeveRetornarPageVazia_QuandoNaoHouverTasks() {

        Pageable pageable = PageRequest.of(0, 10);
        Page<Task> page = new PageImpl<>(Collections.emptyList(), pageable, 0);

        when(taskUseCase.buscarTodasTasks(pageable)).thenReturn(page);

        ResponseEntity<Page<Task>> resposta = taskController.listarTasks(0, 10);

        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        assertTrue(resposta.getBody().isEmpty());
    }

    @Test
    void deletar_DeveRetornarNoContent_QuandoIdExistir() {

        Long id = 1L;
        doNothing().when(taskUseCase).deletarTask(id);

        ResponseEntity<Void> resposta = taskController.deletar(id);

        assertEquals(HttpStatus.NO_CONTENT, resposta.getStatusCode());
        verify(taskUseCase, times(1)).deletarTask(id);
    }

    @Test
    void deletar_DeveLancarException_QuandoIdNaoExistir() {

        Long id = 999L;
        doThrow(new RuntimeException("Task não encontrada")).when(taskUseCase).deletarTask(id);


        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            taskController.deletar(id);
        });

        assertEquals("Task não encontrada", exception.getMessage());
        verify(taskUseCase, times(1)).deletarTask(id);
    }

    @Test
    void buscarPorId_DeveRetornarTask_QuandoIdExistir() {

        Long id = 1L;
        Task task = new Task(id, "Tarefa 1", "Descrição", false, LocalDateTime.now(), null);
        when(taskUseCase.buscarPorId(id)).thenReturn(task);


        ResponseEntity<Task> resposta = taskController.buscarPorId(id);


        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        assertEquals(task, resposta.getBody());
        verify(taskUseCase, times(1)).buscarPorId(id);
    }

    @Test
    void buscarPorId_DeveLancarException_QuandoIdNaoExistir() {

        Long id = 999L;
        when(taskUseCase.buscarPorId(id)).thenThrow(new RuntimeException("Task não encontrada"));


        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            taskController.buscarPorId(id);
        });

        assertEquals("Task não encontrada", exception.getMessage());
        verify(taskUseCase, times(1)).buscarPorId(id);
    }

    @Test
    void editarTask_DeveRetornarTaskAtualizada_QuandoDadosValidos() {

        Long id = 1L;
        EditarTaskRequest request = new EditarTaskRequest("Tarefa Atualizada", "Nova Descrição", true);
        Task taskAtualizada = new Task(id, "Tarefa Atualizada", "Nova Descrição", true, LocalDateTime.now(), LocalDateTime.now());

        when(mapper.editarTaskRequestToEntity(request)).thenReturn(taskAtualizada);
        when(taskUseCase.editarTask(id, taskAtualizada)).thenReturn(taskAtualizada);

        ResponseEntity<Task> resposta = taskController.editarTask(id, request);

        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        assertEquals(taskAtualizada, resposta.getBody());
        verify(taskUseCase, times(1)).editarTask(id, taskAtualizada);
    }

    @Test
    void editarTask_DeveLancarException_QuandoIdInvalido() {

        Long id = -1L;
        EditarTaskRequest request = new EditarTaskRequest("Tarefa Atualizada", "Nova Descrição", true);

        when(mapper.editarTaskRequestToEntity(request)).thenThrow(new IllegalArgumentException("ID inválido: " + id));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            taskController.editarTask(id, request);
        });

        assertEquals("ID inválido: " + id, exception.getMessage());
        verifyNoInteractions(taskUseCase);
    }

    @Test
    void editarTask_DeveLancarException_QuandoDadosInvalidos() {

        Long id = 1L;
        EditarTaskRequest request = new EditarTaskRequest(null, "", true);

        doThrow(new ValidationException("Título é obrigatório"))
                .when(mapper).editarTaskRequestToEntity(request);

        ValidationException exception = assertThrows(ValidationException.class, () -> {
            taskController.editarTask(id, request);
        });

        assertEquals("Título é obrigatório", exception.getMessage());
        verifyNoInteractions(taskUseCase);
    }
}