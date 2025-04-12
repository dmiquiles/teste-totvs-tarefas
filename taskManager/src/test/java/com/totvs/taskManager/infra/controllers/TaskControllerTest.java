package com.totvs.taskManager.infra.controllers;

import com.totvs.taskManager.application.TaskUseCase;
import com.totvs.taskManager.domain.Task;
import com.totvs.taskManager.infra.dtos.UpdateTaskRequest;
import com.totvs.taskManager.infra.dtos.TaskMapper;
import com.totvs.taskManager.infra.dtos.TaskRequest;
import com.totvs.taskManager.infra.dtos.TaskResponse;
import com.totvs.taskManager.infra.enums.Priority;
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

import java.time.LocalDate;
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

        TaskRequest request = new TaskRequest("Tarefa 1", LocalDate.now(), Priority.LOW);
        Task task = new Task(1L, "Tarefa 1", false, Priority.LOW, LocalDateTime.now(), null, LocalDateTime.now());
        TaskResponse response = new TaskResponse(1L, "Tarefa 1", false, Priority.LOW, LocalDateTime.now(), null, LocalDateTime.now());

        when(mapper.taskRequestToEntity(request)).thenReturn(task);
        when(taskUseCase.create(task)).thenReturn(task);
        when(mapper.toResponse(task)).thenReturn(response);

        ResponseEntity<TaskResponse> result = taskController.createTask(request);

        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        assertEquals(response, result.getBody());
        verify(taskUseCase, times(1)).create(task);
    }

    @Test
    void criarTask_DeveLancarException_QuandoRequestInvalido() {

        TaskRequest request = new TaskRequest(null, LocalDate.now(), Priority.LOW);

        doThrow(new ConstraintViolationException("Validação falhou", null))
                .when(mapper).taskRequestToEntity(request);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            taskController.createTask(request);
        });

        assertEquals("Validação falhou", exception.getMessage());
        verifyNoInteractions(taskUseCase);
    }

    @Test
    void criarTask_DeveLancarException_QuandoTaskUseCaseFalhar() {

        TaskRequest request = new TaskRequest("Tarefa 1", LocalDate.now(), Priority.LOW);
        Task task = new Task(1L, "Tarefa 1", false, Priority.LOW, LocalDateTime.now(), LocalDateTime.now(), null);

        when(mapper.taskRequestToEntity(request)).thenReturn(task);
        when(taskUseCase.create(task)).thenThrow(new RuntimeException("Erro ao criar task"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            taskController.createTask(request);
        });

        assertEquals("Erro ao criar task", exception.getMessage());
        verify(taskUseCase, times(1)).create(task);
    }

    @Test
    void listarTasks_DeveRetornarPageDeTasks_QuandoPaginaValida() {

        Pageable pageable = PageRequest.of(0, 10);
        List<Task> tasks = List.of(new Task(1L, "Tarefa 1", false, Priority.LOW, LocalDateTime.now(), LocalDateTime.now(), null));
        Page<Task> page = new PageImpl<>(tasks, pageable, 1);

        when(taskUseCase.findAll(pageable)).thenReturn(page);

        ResponseEntity<Page<Task>> response = taskController.findAllTasks(0, 10);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().getTotalElements());
        assertEquals("Tarefa 1", response.getBody().getContent().get(0).getTitle());
    }

    @Test
    void listarTasks_DeveRetornarPageVazia_QuandoNaoHouverTasks() {

        Pageable pageable = PageRequest.of(0, 10);
        Page<Task> page = new PageImpl<>(Collections.emptyList(), pageable, 0);

        when(taskUseCase.findAll(pageable)).thenReturn(page);

        ResponseEntity<Page<Task>> response = taskController.findAllTasks(0, 10);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isEmpty());
    }

    @Test
    void deletar_DeveRetornarNoContent_QuandoIdExistir() {

        Long id = 1L;
        doNothing().when(taskUseCase).delete(id);

        ResponseEntity<Void> response = taskController.deleteTask(id);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(taskUseCase, times(1)).delete(id);
    }

    @Test
    void deletar_DeveLancarException_QuandoIdNaoExistir() {

        Long id = 999L;
        doThrow(new RuntimeException("Task não encontrada")).when(taskUseCase).delete(id);


        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            taskController.deleteTask(id);
        });

        assertEquals("Task não encontrada", exception.getMessage());
        verify(taskUseCase, times(1)).delete(id);
    }

    @Test
    void buscarPorId_DeveRetornarTask_QuandoIdExistir() {

        Long id = 1L;
        Task task = new Task(id, "Tarefa 1", false, Priority.LOW, LocalDateTime.now(), LocalDateTime.now(), null);
        when(taskUseCase.findById(id)).thenReturn(task);

        ResponseEntity<Task> resposta = taskController.findTaskById(id);

        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        assertEquals(task, resposta.getBody());
        verify(taskUseCase, times(1)).findById(id);
    }

    @Test
    void buscarPorId_DeveLancarException_QuandoIdNaoExistir() {

        Long id = 999L;
        when(taskUseCase.findById(id)).thenThrow(new RuntimeException("Task não encontrada"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            taskController.findTaskById(id);
        });

        assertEquals("Task não encontrada", exception.getMessage());
        verify(taskUseCase, times(1)).findById(id);
    }

    @Test
    void editarTask_DeveRetornarTaskAtualizada_QuandoDadosValidos() {

        Long id = 1L;
        UpdateTaskRequest request = new UpdateTaskRequest("Tarefa Atualizada", Priority.LOW, LocalDate.now(), true);
        Task taskAtualizada = new Task(id, "Tarefa Atualizada", true, Priority.LOW, LocalDateTime.now(), LocalDateTime.now(), LocalDateTime.now());

        when(mapper.updateTaskRequestToEntity(request)).thenReturn(taskAtualizada);
        when(taskUseCase.update(id, taskAtualizada)).thenReturn(taskAtualizada);

        ResponseEntity<Task> resposta = taskController.updateTask(id, request);

        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        assertEquals(taskAtualizada, resposta.getBody());
        verify(taskUseCase, times(1)).update(id, taskAtualizada);
    }

    @Test
    void editarTask_DeveLancarException_QuandoIdInvalido() {

        Long id = -1L;
        UpdateTaskRequest request = new UpdateTaskRequest("Tarefa Atualizada", Priority.LOW, LocalDate.now(), true);

        when(mapper.updateTaskRequestToEntity(request)).thenThrow(new IllegalArgumentException("ID inválido: " + id));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            taskController.updateTask(id, request);
        });

        assertEquals("ID inválido: " + id, exception.getMessage());
        verifyNoInteractions(taskUseCase);
    }

    @Test
    void editarTask_DeveLancarException_QuandoDadosInvalidos() {

        Long id = 1L;
        UpdateTaskRequest request = new UpdateTaskRequest(null, Priority.LOW, LocalDate.now(), true);

        doThrow(new ValidationException("Título é obrigatório"))
                .when(mapper).updateTaskRequestToEntity(request);

        ValidationException exception = assertThrows(ValidationException.class, () -> {
            taskController.updateTask(id, request);
        });

        assertEquals("Título é obrigatório", exception.getMessage());
        verifyNoInteractions(taskUseCase);
    }
}