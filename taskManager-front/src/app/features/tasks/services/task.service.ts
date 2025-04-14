import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { PageableTaskResponse } from '../models/pageable-task-response';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API_URL = 'http://localhost:8080/tasks';
  // private userId = localStorage.getItem('userId');
  
  constructor(private http: HttpClient) {}

  getAll(): Observable<PageableTaskResponse> {
    const userId = localStorage.getItem('userId');
    return this.http.get<PageableTaskResponse>(`${this.API_URL}/user/${userId}`);
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.API_URL}/${id}`);
  }

  create(task: Task): Observable<Task> {
    const userId = localStorage.getItem('userId');
    return this.http.post<Task>(`${this.API_URL}/user/${userId}`, task);
  }

  update(task: Task): Observable<Task> {
    const userId = localStorage.getItem('userId');
    return this.http.put<Task>(`${this.API_URL}/${task.id}/user/${userId}`, task);
  }

  delete(id: number): Observable<void> {
    const userId = localStorage.getItem('userId');
    return this.http.delete<void>(`${this.API_URL}/${id}/user/${userId}`);
  }
}