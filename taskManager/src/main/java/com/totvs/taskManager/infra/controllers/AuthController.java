package com.totvs.taskManager.infra.controllers;

import com.totvs.taskManager.application.user.UserUseCase;
import com.totvs.taskManager.infra.dtos.user.UserMapper;
import com.totvs.taskManager.infra.dtos.user.UserRequest;
import com.totvs.taskManager.infra.dtos.user.UserResponse;
import com.totvs.taskManager.utils.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserUseCase userUseCase;
    private final UserMapper mapper;

    @PostMapping(value = "/login", produces = "application/json")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody UserRequest userRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userRequest.getUsername(), userRequest.getPassword())
        );

        String token = jwtUtil.generateToken(((User) authentication.getPrincipal()).getUsername());
        com.totvs.taskManager.domain.User user = userUseCase.findByUsername(userRequest.getUsername());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.getId());

        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/register", produces = "application/json")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserRequest userRequest) {

        com.totvs.taskManager.domain.User user = mapper.userRequestToEntity(userRequest);

        return ResponseEntity
                .created(URI.create("/register/" + user.getId()))
                .body(mapper.toResponse(userUseCase.createUser(user)));
    }

}
