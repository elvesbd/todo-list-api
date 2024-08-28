import { Test, TestingModule } from '@nestjs/testing';

import { TodosList } from '@core/todos-list/model';
import { SaveTodosListUseCase } from '@core/todos-list/usecases';
import { TodosListRepository } from '@core/todos-list/ports/repository';
import { TodoListDataBuilder } from '@core/test/__mocks__/data-builder';

describe('SaveTodosListUseCase', () => {
  let sut: SaveTodosListUseCase;
  let todosListRepository: TodosListRepository;

  const input = TodoListDataBuilder.anTodoList().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const TodosListRepositoryProvider = {
      provide: TodosListRepository,
      useValue: {
        save: jest.fn().mockResolvedValue(0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [SaveTodosListUseCase, TodosListRepositoryProvider],
    }).compile();

    sut = app.get<SaveTodosListUseCase>(SaveTodosListUseCase);
    todosListRepository = app.get<TodosListRepository>(TodosListRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(todosListRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should not call the repository save method if there are notifications', async () => {
      const input = TodoListDataBuilder.anTodoList().withName('').build();

      await sut.execute(input);

      expect(todosListRepository.save).not.toHaveBeenCalled();
    });

    it('should call repository save with correct values', async () => {
      await sut.execute(input);

      expect(todosListRepository.save).toHaveBeenCalledTimes(1);
      expect(todosListRepository.save).toHaveBeenCalledWith(
        expect.any(TodosList),
      );
    });

    it('should register a new todo on success', async () => {
      const output = await sut.execute(input);

      expect(output).toBeDefined();
      expect(output.notifications).toBeUndefined();
    });
  });
});
