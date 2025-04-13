package com.totvs.taskManager.application;

import com.totvs.taskManager.application.user.UserService;
import com.totvs.taskManager.domain.User;
import com.totvs.taskManager.infra.repositories.JpaUserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.never;

public class UserServiceTest {

    @Mock
    private JpaUserRepository jpaUserRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    public UserServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createUser_DeveCriarUsuario_QuandoUsernameNaoExiste() {
        User user = new User();
        user.setUsername("novoUsuario");
        user.setPassword("senha123");

        when(jpaUserRepository.findByUsername("novoUsuario")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("senha123")).thenReturn("senhaCodificada");
        when(jpaUserRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User createdUser = userService.createUser(user);

        assertNotNull(createdUser);
        assertEquals("novoUsuario", createdUser.getUsername());
        assertEquals("senhaCodificada", createdUser.getPassword());
        verify(jpaUserRepository, times(1)).save(any(User.class));
    }

    @Test
    void createUser_DeveLancarExcecao_QuandoUsernameJaExiste() {
        User user = new User();
        user.setUsername("usuarioExistente");

        when(jpaUserRepository.findByUsername("usuarioExistente")).thenReturn(Optional.of(user));

        UsernameNotFoundException exception = assertThrows(UsernameNotFoundException.class, () -> {
            userService.createUser(user);
        });

        assertEquals("UsuáriousuarioExistentejá existe", exception.getMessage());
        verify(jpaUserRepository, never()).save(any(User.class));
    }

}
