import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Todo } from '@core/todo/model/todo';
import { TodoRepository } from '@core/todo/ports/repository';
import { TodoDataBuilder } from '@core/test/__mocks__/data-builder';
import { UpdateTodoNameUseCase } from '@core/todo/usecases/update-name';

describe('UpdateTodoNameUseCase', () => {
  let sut: UpdateTodoNameUseCase;
  let todoRepository: TodoRepository;

  const todoId = '65b1c7d4-0f3a-4386-b0ef-32202f36b26b';
  const input = TodoDataBuilder.anTodo().build();
  const todo = Todo.create(input);

  beforeEach(async () => {
    jest.clearAllMocks();

    const TodoRepositoryProvider = {
      provide: TodoRepository,
      useValue: {
        save: jest.fn().mockResolvedValue(0),
        getById: jest.fn().mockResolvedValue(todo),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [UpdateTodoNameUseCase, TodoRepositoryProvider],
    }).compile();

    sut = app.get<UpdateTodoNameUseCase>(UpdateTodoNameUseCase);
    todoRepository = app.get<TodoRepository>(TodoRepository);
  });

  it('should call repository with correct values', async () => {
    await sut.execute({ todoId, ...input });

    expect(todoRepository.getById).toHaveBeenCalledTimes(1);
    expect(todoRepository.getById).toHaveBeenCalledWith(todoId);
  });

  it('should return an exception if todo not found', async () => {
    jest.spyOn(todoRepository, 'getById').mockResolvedValueOnce(null);

    await expect(sut.execute({ todoId, ...input })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should call the repository save method on success', async () => {
    await sut.execute({ todoId, ...input });

    expect(todoRepository.save).toHaveBeenCalled();
    expect(todoRepository.save).toHaveBeenCalledWith(expect.any(Todo));
  });
});
