package com.totvs.taskManager.ports.out;

import com.totvs.taskManager.domain.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TaskRepositoryPort {
    Task save(Task task);
    Page<Task> findAll(Pageable pageable);
    Page<Task> findByUserId(Long userId, Pageable pageable);

    @Query("SELECT t FROM Task t WHERE t.id = :id AND t.user.id = :userId")
    Optional<Task> findById(Long id, Long userId);

    boolean existsById(Long id);

    @Transactional
    @Modifying
    @Query("DELETE FROM Task t WHERE t.id = :id AND t.user.id = :userId")
    void deleteById(Long id, Long userId);
}
