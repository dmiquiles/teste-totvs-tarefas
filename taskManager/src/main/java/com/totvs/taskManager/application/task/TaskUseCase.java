package com.totvs.taskManager.application.task;

import com.totvs.taskManager.domain.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskUseCase {
    Task create(Task task, Long userId);
//    Page<Task> findAll(Pageable pageable);

    Page<Task> findAll(Long userId, Pageable pageable);

    void delete(Long id, Long userId);
    Task findById(Long id, Long userId);
    Task update(Long id, Task task);
}
