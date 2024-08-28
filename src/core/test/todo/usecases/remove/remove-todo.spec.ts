import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Todo } from '@core/todo/model';
import { TodoRepository } from '@core/todo/ports/repository';
import { TodoDataBuilder } from '@core/test/__mocks__/data-builder';
import { RemoveTodoInput, RemoveTodoUseCase } from '@core/todo/usecases';

describe('RemoveTodoUseCase', () => {
  let sut: RemoveTodoUseCase;
  let todoRepository: TodoRepository;

  const input = TodoDataBuilder.anTodo().build();
  const assignor = Todo.create(input);

  beforeEach(async () => {
    jest.clearAllMocks();

    const AssignorRepositoryProvider = {
      provide: TodoRepository,
      useValue: {
        remove: jest.fn().mockResolvedValue(0),
        getById: jest.fn().mockResolvedValue(assignor),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [RemoveTodoUseCase, AssignorRepositoryProvider],
    }).compile();

    sut = app.get<RemoveTodoUseCase>(RemoveTodoUseCase);
    todoRepository = app.get<TodoRepository>(TodoRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(todoRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should call todoRepository find by id with correct values', async () => {
      const input: RemoveTodoInput = {
        id: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
      };

      await sut.execute(input);

      expect(todoRepository.getById).toHaveBeenCalledTimes(1);
      expect(todoRepository.getById).toHaveBeenCalledWith(input.id);
    });

    it('should return an exception if assignor not found', async () => {
      jest.spyOn(todoRepository, 'getById').mockResolvedValueOnce(null);
      const input: RemoveTodoInput = { id: 'non-existing-id' };

      await expect(sut.execute(input)).rejects.toThrow(NotFoundException);
    });

    it('should call the repository delete method if assignor exists', async () => {
      const input: RemoveTodoInput = {
        id: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
      };

      await sut.execute(input);

      expect(todoRepository.remove).toHaveBeenCalledTimes(1);
      expect(todoRepository.remove).toHaveBeenCalledWith(input.id);
    });
  });
});
