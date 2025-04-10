package com.totvs.taskManager.infra.repositories;

import com.totvs.taskManager.domain.Task;
import com.totvs.taskManager.ports.out.TaskRepositoryPort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaTaskRepository
        extends JpaRepository<Task, Long>, TaskRepositoryPort { }