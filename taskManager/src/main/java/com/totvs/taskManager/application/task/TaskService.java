package com.totvs.taskManager.application.task;

import com.totvs.taskManager.domain.Task;
import com.totvs.taskManager.domain.User;
import com.totvs.taskManager.exceptions.TaskNotFoundException;
import com.totvs.taskManager.ports.out.TaskRepositoryPort;
import com.totvs.taskManager.ports.out.UserRepositoryPort;
import jakarta.validation.ValidationException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class TaskService implements TaskUseCase {

    private final TaskRepositoryPort repository;
    private final UserRepositoryPort userRepository;

    @Override
    public Task create(Task task, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        task.setUser(user);

        return repository.save(task);
    }

    @Override
    public Page<Task> findAll(Long userId, Pageable pageable) {

        validateId(userId);

        return repository.findByUserId(userId, pageable);
    }

    @Override
    public void delete(Long id, Long userId) {

        validateId(id);

        validateId(userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        if (!repository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }

        repository.deleteById(id, userId);
    }

    @Override
    public Task findById(Long id, Long userId) {

        validateId(id);

        return repository.findById(id, userId)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    @Override
    public Task update(Long id, Task updatedTask) {

        validateId(id);

        Task existingTask = repository.findById(id, 1L)
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

    private void validateId(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID inválido: " + id);
        }
    }

}
