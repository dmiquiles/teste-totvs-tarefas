package com.totvs.taskManager.ports.out;

import com.totvs.taskManager.domain.Task;
import com.totvs.taskManager.domain.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UserRepositoryPort {
    Optional<User> findByUsername(String username);
    Optional<User> findById(Long id);
    User save(User user);

}
