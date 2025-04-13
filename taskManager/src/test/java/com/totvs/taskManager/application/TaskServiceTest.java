package com.totvs.taskManager.application;

import com.totvs.taskManager.application.task.TaskService;
import com.totvs.taskManager.domain.Task;
import com.totvs.taskManager.exceptions.TaskNotFoundException;
import com.totvs.taskManager.infra.enums.Priority;
import com.totvs.taskManager.ports.out.TaskRepositoryPort;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TaskServiceTest {
    @Mock
    private TaskRepositoryPort repository;

    @InjectMocks
    private TaskService taskService;

    public TaskServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void criarTask_DeveSalvarTask() {
        Task task = new Task(1L, "Título", false, Priority.LOW, LocalDateTime.now(), LocalDateTime.now(), null);
        when(repository.save(task)).thenReturn(task);

        Task result = taskService.create(task);

        assertNotNull(result);
        assertEquals(task.getTitle(), result.getTitle());
        verify(repository, times(1)).save(task);
    }

    @Test
    void buscarTodasTasks_DeveRetornarPaginaDeTasks() {
        PageRequest pageable = PageRequest.of(0, 10);
        List<Task> tasks = List.of(new Task(1L, "Título", false, Priority.LOW, LocalDateTime.now(), LocalDateTime.now(), null));
        Page<Task> page = new PageImpl<>(tasks);
        when(repository.findAll(pageable)).thenReturn(page);

        Page<Task> result = taskService.findAll(pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(repository, times(1)).findAll(pageable);
    }

    @Test
    void deletarTask_DeveLancarExcecao_QuandoIdNaoExistir() {
        Long id = 999L;
        when(repository.existsById(id)).thenReturn(false);

        assertThrows(TaskNotFoundException.class, () -> taskService.delete(id));
        verify(repository, times(1)).existsById(id);
    }

    @Test
    void buscarPorId_DeveRetornarTask_QuandoIdExistir() {
        Long id = 1L;
        Task task = new Task(id, "Título", false, Priority.LOW, LocalDateTime.now(), LocalDateTime.now(), null);
        when(repository.findById(id)).thenReturn(Optional.of(task));

        Task result = taskService.findById(id);

        assertNotNull(result);
        assertEquals(task.getTitle(), result.getTitle());
        verify(repository, times(1)).findById(id);
    }

    @Test
    void editarTask_DeveAtualizarTask() {
        Long id = 1L;
        Task existingTask = new Task(id, "Título Antigo", false, Priority.LOW, LocalDateTime.now(), LocalDateTime.now(), null);
        Task updatedTask = new Task(id, "Título Novo", true, Priority.LOW, LocalDateTime.now(), LocalDateTime.now(), null);
        when(repository.findById(id)).thenReturn(Optional.of(existingTask));
        when(repository.save(any(Task.class))).thenReturn(updatedTask);

        Task result = taskService.update(id, updatedTask);

        assertNotNull(result);
        assertEquals("Título Novo", result.getTitle());
        verify(repository, times(1)).findById(id);
        verify(repository, times(1)).save(existingTask);
    }

    @Test
    void editarTask_DeveLancarExcecao_QuandoTaskForNula() {
        Long id = 1L;
        when(repository.findById(id)).thenReturn(Optional.of(new Task()));

        assertThrows(IllegalArgumentException.class, () -> taskService.update(id, null));
    }

    @Test
    void validateTask_DeveLancarExcecao_QuandoTituloForNulo() {
        Task task = new Task(1L, null, false, Priority.LOW, LocalDateTime.now(), LocalDateTime.now(), null);

        assertThrows(TaskNotFoundException.class, () -> taskService.update(1L, task));
    }
}