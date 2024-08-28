import { Test, TestingModule } from '@nestjs/testing';

import { Todo } from '@core/todo/model';
import { SaveTodoUseCase } from '@core/todo/usecases';
import { TodoRepository } from '@core/todo/ports/repository';
import { TodoDataBuilder } from '@core/test/__mocks__/data-builder';

describe('SaveTodoUseCase', () => {
  let sut: SaveTodoUseCase;
  let todoRepository: TodoRepository;

  const todosLisId = '65b1c7d4-0f3a-4386-b0ef-32202f36b26b';
  const input = TodoDataBuilder.anTodo().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const TodoRepositoryProvider = {
      provide: TodoRepository,
      useValue: {
        save: jest.fn().mockResolvedValue(0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [SaveTodoUseCase, TodoRepositoryProvider],
    }).compile();

    sut = app.get<SaveTodoUseCase>(SaveTodoUseCase);
    todoRepository = app.get<TodoRepository>(TodoRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(todoRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should not call the repository save method if there are notifications', async () => {
      const input = TodoDataBuilder.anTodo().withName('').build();

      await sut.execute({ todosLisId, ...input });

      expect(todoRepository.save).not.toHaveBeenCalled();
    });

    it('should call repository save with correct values', async () => {
      const { todo } = await sut.execute({ todosLisId, ...input });

      expect(todoRepository.save).toHaveBeenCalledTimes(1);
      expect(todoRepository.save).toHaveBeenCalledWith(todosLisId, todo);
    });

    it('should register a new todo on success', async () => {
      const output = await sut.execute({ todosLisId, ...input });

      expect(output).toBeDefined();
      expect(output.todo.containNotifications).toBeFalsy();
    });
  });
});
