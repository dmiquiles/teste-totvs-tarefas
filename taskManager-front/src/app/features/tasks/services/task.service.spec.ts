import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';
import { PageableTaskResponse } from '../models/pageable-task-response';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    completed: false,
    priority: 'LOW',
    date: '2025-04-13',
  };

  const mockPageableResponse: PageableTaskResponse = {
    content: [mockTask],
    totalElements: 1,
    totalPages: 1,
    size: 10,
    number: 0,
  } as PageableTaskResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule ],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tasks', () => {
    service.getAll().subscribe((response) => {
      expect(response).toEqual(mockPageableResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockPageableResponse);
  });

  it('should fetch a task by ID', () => {
    service.getById(1).subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockTask);
  });

  it('should create a new task', () => {
    service.create(mockTask).subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(mockTask);
  });

  it('should update an existing task', () => {
    service.update(mockTask).subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockTask);
  });

  it('should delete a task by ID', () => {
    service.delete(1).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

});