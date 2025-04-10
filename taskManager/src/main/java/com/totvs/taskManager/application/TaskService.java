package com.totvs.taskManager.application;

import com.totvs.taskManager.domain.Task;
import com.totvs.taskManager.exceptions.TaskNotFoundException;
import com.totvs.taskManager.ports.out.TaskRepositoryPort;
import jakarta.validation.ValidationException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class TaskService implements TaskUseCase {
    private final TaskRepositoryPort repository;

    @Override
    public Task criarTask(Task task) {
        return repository.save(task);
    }

    @Override
    public Page<Task> buscarTodasTasks(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public void deletarTask(Long id) {

        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID inválido: " + id);
        }

        if (!repository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }

        repository.deleteById(id);
    }

    @Override
    public Task buscarPorId(Long id) {
        if (id == null || id <= 0) {
            throw new RuntimeException("ID deve ser um valor positivo");
        }

        return repository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    @Override
    public Task editarTask(Long id, Task updatedTask) {

        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID inválido: " + id);
        }

        Task existingTask = repository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        if (updatedTask == null) {
            throw new IllegalArgumentException("Dados da task não podem ser nulos");
        }

        existingTask.setTitulo(updatedTask.getTitulo());
        existingTask.setDescricao(updatedTask.getDescricao());
        existingTask.setFinalizado(updatedTask.isFinalizado());
        existingTask.setDataAtualizacao(LocalDateTime.now());

        validateTask(existingTask);

        return repository.save(existingTask);
    }


    private void validateTask(Task task) {
        if (task.getTitulo() == null || task.getTitulo().trim().isEmpty()) {
            throw new ValidationException("Título é obrigatório");
        }
    }


}
