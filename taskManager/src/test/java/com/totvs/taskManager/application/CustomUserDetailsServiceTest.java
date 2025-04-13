package com.totvs.taskManager.application;

import com.totvs.taskManager.application.user.CustomUserDetailsService;
import com.totvs.taskManager.domain.User;
import com.totvs.taskManager.infra.repositories.JpaUserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

public class CustomUserDetailsServiceTest {

    @Mock
    private JpaUserRepository jpaUserRepository;

    @InjectMocks
    private CustomUserDetailsService customUserDetailsService;

    public CustomUserDetailsServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void loadUserByUsername_DeveRetornarUserDetails_QuandoUsuarioExiste() {
        User user = new User();
        user.setUsername("testUser");
        user.setPassword("testPassword");

        when(jpaUserRepository.findByUsername("testUser")).thenReturn(Optional.of(user));

        UserDetails userDetails = customUserDetailsService.loadUserByUsername("testUser");

        assertNotNull(userDetails);
        assertEquals("testUser", userDetails.getUsername());
        assertEquals("testPassword", userDetails.getPassword());
        verify(jpaUserRepository, times(1)).findByUsername("testUser");
    }

    @Test
    void loadUserByUsername_DeveLancarExcecao_QuandoUsuarioNaoExiste() {
        when(jpaUserRepository.findByUsername("nonExistentUser")).thenReturn(Optional.empty());

        UsernameNotFoundException exception = assertThrows(UsernameNotFoundException.class, () -> {
            customUserDetailsService.loadUserByUsername("nonExistentUser");
        });

        assertEquals("Usuário não encontrado: nonExistentUser", exception.getMessage());
        verify(jpaUserRepository, times(1)).findByUsername("nonExistentUser");
    }
}
