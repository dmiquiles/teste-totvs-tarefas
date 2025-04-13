package com.totvs.taskManager.infra.controllers;

import com.totvs.taskManager.application.user.UserUseCase;
import com.totvs.taskManager.domain.User;
import com.totvs.taskManager.infra.dtos.user.UserMapper;
import com.totvs.taskManager.infra.dtos.user.UserRequest;
import com.totvs.taskManager.infra.dtos.user.UserResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.net.URI;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

    @Mock
    private UserUseCase userUseCase;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private AuthController authController;

    @Test
    void register_DeveCriarUsuarioERetornarResponse_QuandoDadosForemValidos() {
        UserRequest userRequest = new UserRequest("username", "password");
        User user = new User(1L, "username", "password");
        UserResponse userResponse = new UserResponse(1L, "username");

        when(userMapper.userRequestToEntity(userRequest)).thenReturn(user);
        when(userUseCase.createUser(user)).thenReturn(user);
        when(userMapper.toResponse(user)).thenReturn(userResponse);

        ResponseEntity<UserResponse> response = authController.register(userRequest);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals(URI.create("/register/1"), response.getHeaders().getLocation());
        assertEquals(userResponse, response.getBody());
    }
}
