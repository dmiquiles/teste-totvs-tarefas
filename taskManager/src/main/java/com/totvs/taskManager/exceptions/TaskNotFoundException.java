package com.totvs.taskManager.exceptions;

public class TaskNotFoundException extends DomainException {
    public TaskNotFoundException(Long taskId) {
        super("Task com ID " + taskId + " não encontrada");
    }
}
