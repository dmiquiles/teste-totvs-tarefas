package com.totvs.taskManager.infra.controllers;

import com.totvs.taskManager.application.task.TaskUseCase;
import com.totvs.taskManager.domain.Task;
import com.totvs.taskManager.infra.dtos.task.TaskMapper;
import com.totvs.taskManager.infra.dtos.task.TaskRequest;
import com.totvs.taskManager.infra.dtos.task.TaskResponse;
import com.totvs.taskManager.infra.dtos.task.UpdateTaskRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/tasks")
@Tag(name = "Tasks", description = "API para gerenciamento de tarefas")
@RequiredArgsConstructor
public class TaskController {
    private final TaskUseCase taskUseCase;
    private final TaskMapper mapper;

    @PostMapping("/user/{userId}")
    @Operation(summary = "Cria uma task")
    public  ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest request, @PathVariable Long userId) {
        Task task = mapper.taskRequestToEntity(request);

        return ResponseEntity
                .created(URI.create("/tasks/" + task.getId()))
                .body(mapper.toResponse(taskUseCase.create(task, userId)));

    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Lista todas as tasks com paginação")
    public ResponseEntity<Page<TaskResponse>> findAllTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1000") int size,
            @PathVariable Long userId
    ) {

        Pageable pageable = PageRequest.of(page, size);

        Page<TaskResponse> taskResponses = taskUseCase.findAll(userId, pageable)
                .map(mapper::toResponse);
        return ResponseEntity.ok(taskResponses);
    }

    @DeleteMapping("/{id}/user/{userId}")
    @Operation(summary = "Deleta uma task por ID")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, @PathVariable Long userId) {
        taskUseCase.delete(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/user/{userId}")
    @Operation(
            summary = "Buscar task por ID",
            description = "Retorna uma task com base no ID fornecido"
    )
    public ResponseEntity<Task> findTaskById(
            @PathVariable Long id,
            @PathVariable Long userId
    ) {
        Task task = taskUseCase.findById(id, userId);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}/user/{userId}")
    @Operation(
            summary = "Editar task",
            description = "Edita as informações da task"
    )
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTaskRequest request
    ){
        Task updatedTask = mapper.updateTaskRequestToEntity(request);
        Task task = taskUseCase.update(id, updatedTask);
        return ResponseEntity.ok(mapper.toResponse(task));
    }

}
