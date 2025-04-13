package com.totvs.taskManager.application.task;

import com.totvs.taskManager.domain.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskUseCase {
    Task create(Task task);
    Page<Task> findAll(Pageable pageable);
    void delete(Long id);
    Task findById(Long id);
    Task update(Long id, Task task);
}
