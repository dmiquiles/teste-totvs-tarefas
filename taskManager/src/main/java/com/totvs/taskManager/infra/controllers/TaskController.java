package com.totvs.taskManager.infra.controllers;

import com.totvs.taskManager.application.TaskUseCase;
import com.totvs.taskManager.domain.Task;
import com.totvs.taskManager.infra.dtos.TaskMapper;
import com.totvs.taskManager.infra.dtos.TaskRequest;
import com.totvs.taskManager.infra.dtos.TaskResponse;
import com.totvs.taskManager.infra.dtos.UpdateTaskRequest;
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

    @PostMapping
    @Operation(summary = "Cria uma task")
    public  ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest request) {
        Task task = mapper.taskRequestToEntity(request);

        return ResponseEntity
                .created(URI.create("/tasks/" + task.getId()))
                .body(mapper.toResponse(taskUseCase.create(task)));

    }

    @GetMapping
    @Operation(summary = "Lista todas as tasks com paginação")
    public ResponseEntity<Page<Task>> findAllTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Task> tasks = taskUseCase.findAll(pageable);
        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta uma task por ID")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskUseCase.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Buscar task por ID",
            description = "Retorna uma task com base no ID fornecido"
    )
    public ResponseEntity<Task> findTaskById(@PathVariable Long id) {
        Task task = taskUseCase.findById(id);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Editar task",
            description = "Edita as informações da task"
    )
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody UpdateTaskRequest request){
        Task updatedTask = mapper.updateTaskRequestToEntity(request);
        Task task = taskUseCase.update(id, updatedTask);
        return ResponseEntity.ok(task);
    }

}
