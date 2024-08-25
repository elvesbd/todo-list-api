import { Test, TestingModule } from '@nestjs/testing';

import { TodosList } from '@core/todos-list/model';
import { TodoListDataBuilder } from '@core/test/__mocks__/data-builder';
import { TodosListRepository } from '@core/todos-list/ports/repository';
import { GetAllTodosListUseCase } from '@core/todos-list/usecases/get-all';

describe('GetAllTodosListUseCase', () => {
  let sut: GetAllTodosListUseCase;
  let todosListRepository: TodosListRepository;

  const input = TodoListDataBuilder.anTodoList().build();
  const todo = TodosList.create(input);

  beforeEach(async () => {
    jest.clearAllMocks();

    const TodoRepositoryProvider = {
      provide: TodosListRepository,
      useValue: {
        getAll: jest.fn().mockResolvedValue([todo]),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [GetAllTodosListUseCase, TodoRepositoryProvider],
    }).compile();

    sut = app.get<GetAllTodosListUseCase>(GetAllTodosListUseCase);
    todosListRepository = app.get<TodosListRepository>(TodosListRepository);
  });

  it('should call repository with correct values', async () => {
    await sut.execute();

    expect(todosListRepository.getAll).toHaveBeenCalledTimes(1);
    expect(todosListRepository.getAll).toHaveBeenCalledWith();
  });

  it('should return an empty todos list if any registers', async () => {
    jest.spyOn(todosListRepository, 'getAll').mockResolvedValueOnce(null);

    const todosList = await sut.execute();

    expect(todosList).toHaveLength(0);
  });

  it('should return an todos list on success', async () => {
    const todosList = await sut.execute();

    expect(todosList).toBeDefined;
    expect(todosList).toHaveLength(1);
  });
});
