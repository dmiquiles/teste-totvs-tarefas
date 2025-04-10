package com.totvs.taskManager.infra.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private LocalDateTime timestamp;
    private List<FieldError> errors;

    @Getter
    @Setter
    @AllArgsConstructor
    public static class FieldError {
        private String field;
        private String error;
        private Object rejectedValue;
    }
}
