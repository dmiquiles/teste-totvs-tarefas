package com.totvs.taskManager.application.user;

import com.totvs.taskManager.domain.User;
import com.totvs.taskManager.infra.repositories.JpaUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@AllArgsConstructor
public class UserService implements UserUseCase {

    private final JpaUserRepository jpaUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User createUser(User user) {

        if (jpaUserRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UsernameNotFoundException("Usuário"  + user.getUsername() + "já existe");
        }

        com.totvs.taskManager.domain.User newUser = new com.totvs.taskManager.domain.User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        return jpaUserRepository.save(newUser);
    }
}
