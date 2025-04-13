package com.totvs.taskManager.application.task;

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
    public Task create(Task task) {
        return repository.save(task);
    }

    @Override
    public Page<Task> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {

        validateTaskId(id);

        if (!repository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }

        repository.deleteById(id);
    }

    @Override
    public Task findById(Long id) {

        validateTaskId(id);

        return repository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    @Override
    public Task update(Long id, Task updatedTask) {

        validateTaskId(id);

        Task existingTask = repository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        if (updatedTask == null) {
            throw new IllegalArgumentException("Dados da task não podem ser nulos");
        }

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDate(updatedTask.getDate());
        existingTask.setPriority(updatedTask.getPriority());
        existingTask.setCompleted(updatedTask.isCompleted());
        existingTask.setUpdateAt(LocalDateTime.now());

        validateTask(existingTask);

        return repository.save(existingTask);
    }

    private void validateTask(Task task) {
        if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            throw new ValidationException("Título é obrigatório");
        }
    }

    private void validateTaskId(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID inválido: " + id);
        }
    }

}
