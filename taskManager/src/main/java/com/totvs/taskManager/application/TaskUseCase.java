package com.totvs.taskManager.application;

import com.totvs.taskManager.domain.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TaskUseCase {
    Task criarTask(Task task);
    Page<Task> buscarTodasTasks(Pageable pageable);
    void deletarTask(Long id);
    Task buscarPorId(Long id);
    Task editarTask(Long id, Task task);
}
