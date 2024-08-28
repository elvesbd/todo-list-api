import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Todo } from '@core/todo/model';
import { TodoRepository } from '@core/todo/ports/repository';
import { UpdateTodoStatusUseCase } from '@core/todo/usecases';
import { TodoDataBuilder } from '@core/test/__mocks__/data-builder';

describe('UpdateTodoStatusUseCase', () => {
  let sut: UpdateTodoStatusUseCase;
  let todoRepository: TodoRepository;

  const { id, status, name } = TodoDataBuilder.anTodo().build();
  const todo = Todo.create({ id, name });

  beforeEach(async () => {
    jest.clearAllMocks();

    const TodoRepositoryProvider = {
      provide: TodoRepository,
      useValue: {
        update: jest.fn().mockResolvedValue(0),
        getById: jest.fn().mockResolvedValue(todo),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [UpdateTodoStatusUseCase, TodoRepositoryProvider],
    }).compile();

    sut = app.get<UpdateTodoStatusUseCase>(UpdateTodoStatusUseCase);
    todoRepository = app.get<TodoRepository>(TodoRepository);
  });

  it('should call repository with correct values', async () => {
    await sut.execute({ id, status });

    expect(todoRepository.getById).toHaveBeenCalledTimes(1);
    expect(todoRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should return an exception if todo not found', async () => {
    jest.spyOn(todoRepository, 'getById').mockResolvedValueOnce(null);

    await expect(sut.execute({ id, status })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should call the repository update method on success', async () => {
    await sut.execute({ id, status });

    expect(todoRepository.update).toHaveBeenCalled();
    expect(todoRepository.update).toHaveBeenCalledWith(expect.any(Todo));
  });
});
