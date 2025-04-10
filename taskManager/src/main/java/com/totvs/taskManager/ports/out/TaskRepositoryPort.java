package com.totvs.taskManager.ports.out;

import com.totvs.taskManager.domain.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TaskRepositoryPort {
    Task save(Task task);
    Page<Task> findAll(Pageable pageable);
    Optional<Task> findById(Long id);
    boolean existsById(Long id);
    void deleteById(Long id);
}
