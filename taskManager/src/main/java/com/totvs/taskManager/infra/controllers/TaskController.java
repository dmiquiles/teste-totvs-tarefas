package com.totvs.taskManager.infra.controllers;

import com.totvs.taskManager.application.TaskUseCase;
import com.totvs.taskManager.domain.Task;
import com.totvs.taskManager.infra.dtos.EditarTaskRequest;
import com.totvs.taskManager.infra.dtos.TaskMapper;
import com.totvs.taskManager.infra.dtos.TaskRequest;
import com.totvs.taskManager.infra.dtos.TaskResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
@Tag(name = "Tasks", description = "API para gerenciamento de tarefas")
@RequiredArgsConstructor
public class TaskController {
    private final TaskUseCase taskUseCase;
    private final TaskMapper mapper;

    @PostMapping
    @Operation(summary = "Cria uma task")
    public TaskResponse criarTask(@Valid @RequestBody TaskRequest request) {
        Task task = mapper.taskRequestToEntity(request);
        return mapper.toResponse(taskUseCase.criarTask(task));
    }

    @GetMapping
    @Operation(summary = "Lista todas as tasks com paginação")
    public ResponseEntity<Page<Task>> listarTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Task> tasks = taskUseCase.buscarTodasTasks(pageable);
        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta uma task por ID")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        taskUseCase.deletarTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Buscar task por ID",
            description = "Retorna uma task com base no ID fornecido"
    )
    public ResponseEntity<Task> buscarPorId(@PathVariable Long id) {
        Task task = taskUseCase.buscarPorId(id);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Editar task",
            description = "Edita as informações da task"
    )
    public ResponseEntity<Task> editarTask(@PathVariable Long id, @Valid @RequestBody EditarTaskRequest request){
        Task taskAtualizada = mapper.editarTaskRequestToEntity(request);
        Task task = taskUseCase.editarTask(id, taskAtualizada);
        return ResponseEntity.ok(task);
    }

}
