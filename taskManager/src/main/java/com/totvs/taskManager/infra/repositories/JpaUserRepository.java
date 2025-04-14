package com.totvs.taskManager.infra.repositories;

import com.totvs.taskManager.domain.User;
import com.totvs.taskManager.ports.out.UserRepositoryPort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaUserRepository extends JpaRepository<User, Long>, UserRepositoryPort {}
