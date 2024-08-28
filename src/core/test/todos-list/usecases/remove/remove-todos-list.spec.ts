import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { TodosList } from '@core/todos-list/model';
import { TodosListDataBuilder } from '@core/test/__mocks__/data-builder';
import { TodosListRepository } from '@core/todos-list/ports/repository';
import {
  RemoveTodosListInput,
  RemoveTodosListUseCase,
} from '@core/todos-list/usecases';

describe('RemoveTodosListUseCase', () => {
  let sut: RemoveTodosListUseCase;
  let todosListRepository: TodosListRepository;

  const input = TodosListDataBuilder.anTodoList().build();
  const todosList = TodosList.create(input);

  beforeEach(async () => {
    jest.clearAllMocks();

    const TodosListRepositoryProvider = {
      provide: TodosListRepository,
      useValue: {
        remove: jest.fn().mockResolvedValue(0),
        getById: jest.fn().mockResolvedValue(todosList),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [RemoveTodosListUseCase, TodosListRepositoryProvider],
    }).compile();

    sut = app.get<RemoveTodosListUseCase>(RemoveTodosListUseCase);
    todosListRepository = app.get<TodosListRepository>(TodosListRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(todosListRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should call repository get by id with correct values', async () => {
      const input: RemoveTodosListInput = {
        id: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
      };

      await sut.execute(input);

      expect(todosListRepository.getById).toHaveBeenCalledTimes(1);
      expect(todosListRepository.getById).toHaveBeenCalledWith(input.id);
    });

    it('should return an exception if todos list not found', async () => {
      jest.spyOn(todosListRepository, 'getById').mockResolvedValueOnce(null);
      const input: RemoveTodosListInput = { id: 'non-existing-id' };

      await expect(sut.execute(input)).rejects.toThrow(NotFoundException);
    });

    it('should call the repository remove method if todos list exists', async () => {
      const input: RemoveTodosListInput = {
        id: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
      };

      await sut.execute(input);

      expect(todosListRepository.remove).toHaveBeenCalledTimes(1);
      expect(todosListRepository.remove).toHaveBeenCalledWith(input.id);
    });
  });
});
