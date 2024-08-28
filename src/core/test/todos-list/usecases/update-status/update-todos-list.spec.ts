import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { TodosList } from '@core/todos-list/model';
import { UpdateTodosListUseCase } from '@core/todos-list/usecases';
import { TodosListRepository } from '@core/todos-list/ports/repository';
import { TodosListDataBuilder } from '@core/test/__mocks__/data-builder/todo-list/todos-list-data-builder';

describe('UpdateTodosListUseCase', () => {
  let sut: UpdateTodosListUseCase;
  let todosListRepository: TodosListRepository;

  const id = '65b1c7d4-0f3a-4386-b0ef-32202f36b26b';
  const input = TodosListDataBuilder.anTodoList().build();
  const todosList = TodosList.create({ id, ...input });

  beforeEach(async () => {
    jest.clearAllMocks();

    const TodosListRepositoryProvider = {
      provide: TodosListRepository,
      useValue: {
        update: jest.fn().mockResolvedValue(0),
        getById: jest.fn().mockResolvedValue(todosList),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [UpdateTodosListUseCase, TodosListRepositoryProvider],
    }).compile();

    sut = app.get<UpdateTodosListUseCase>(UpdateTodosListUseCase);
    todosListRepository = app.get<TodosListRepository>(TodosListRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(todosListRepository).toBeDefined();
  });

  it('should call repository with correct values', async () => {
    await sut.execute({ id, ...input });

    expect(todosListRepository.getById).toHaveBeenCalledTimes(1);
    expect(todosListRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should return an exception if todos list not found', async () => {
    jest.spyOn(todosListRepository, 'getById').mockResolvedValueOnce(null);

    await expect(sut.execute({ id, ...input })).rejects.toThrow(
      new NotFoundException('Todos list not found'),
    );
  });
  it('should call the repository update method on success', async () => {
    const result = await sut.execute({ id, ...input });

    expect(result.todosList.containNotifications).toBeFalsy();
    expect(todosListRepository.update).toHaveBeenCalled();
    expect(todosListRepository.update).toHaveBeenCalledWith(todosList);
  });

  it('should return an todos list updated on success', async () => {
    const inputUpdated = {
      name: 'Studying',
      color: '#ff0000',
    };
    const result = await sut.execute({ id, ...inputUpdated });

    expect(result.todosList.name).toBe(todosList.name);
    expect(result.todosList.color).toBe(todosList.color);
  });

  it('should return without calling update if there are notifications due to invalid name', async () => {
    const todosListWithInvalidName = TodosListDataBuilder.anTodoList()
      .withName('')
      .build();

    const result = await sut.execute({ id, ...todosListWithInvalidName });
    expect(result.todosList.containNotifications).toBeTruthy();
  });

  it('should return without calling update if there are notifications due to invalid color', async () => {
    const todosListWithInvalidColor = TodosListDataBuilder.anTodoList()
      .withColor('333')
      .build();

    todosList.update(todosListWithInvalidColor);

    const result = await sut.execute({ id, ...todosListWithInvalidColor });
    expect(result.todosList.containNotifications).toBeTruthy();
  });
});
