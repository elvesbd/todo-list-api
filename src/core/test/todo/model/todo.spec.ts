import { TodoDataBuilder } from '@core/test/__mocks__/data-builder';
import { Todo } from '@core/todo/model/todo';

describe('Todo Domain Model', () => {
  const props = TodoDataBuilder.anTodo().build();

  describe('constructor', () => {
    it('should add notification if name is empty', () => {
      const props = TodoDataBuilder.anTodo().withName('').build();

      const todo = Todo.create(props);

      expect(todo.containNotifications).toBe(true);
      expect(todo.notifications).toEqual({
        nome: ['não pode estar vazio'],
      });
    });

    it('should add notification if name is null', () => {
      const props = TodoDataBuilder.anTodo().withName(null).build();

      const assignor = Todo.create(props);

      expect(assignor.containNotifications).toBe(true);
      expect(assignor.notifications).toEqual({
        nome: [
          'não pode ser nulo',
          'não pode estar vazio',
          'não pode ter mais que 140 caracteres',
        ],
      });
    });

    it('should add a notification if the name exceeds 140 characters', () => {
      const bigName = 'A'.repeat(141);
      const props = TodoDataBuilder.anTodo().withName(bigName).build();

      const assignor = Todo.create(props);

      expect(assignor.containNotifications).toBe(true);
      expect(assignor.notifications).toEqual({
        nome: ['não pode ter mais que 140 caracteres'],
      });
    });
  });

  describe('getters', () => {
    it('should return the correct id', () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const todo = Todo.create({ ...props, id });

      expect(id).toBe(todo.id);
      expect(todo.containNotifications).toBe(false);
    });

    it('should return the correct name', () => {
      const todo = Todo.create(props);

      expect(todo.name).toBe(props.name);
    });

    it('should return the correct email', () => {
      const todo = Todo.create(props);

      expect(todo.status).toBe(props.status);
    });
  });

  describe('update', () => {
    it('should update todo name on success', () => {
      const todo = Todo.create(props);
      const { name } = TodoDataBuilder.anTodo().withName('New Todo').build();

      todo.updateName(name);

      expect(todo.name).toBe(name);
    });

    it('should update todo status on success', () => {
      const todo = Todo.create(props);
      const { status } = TodoDataBuilder.anTodo().withStatus(true).build();

      todo.updateStatus(status);

      expect(todo.status).toBe(status);
    });
  });

  describe('create', () => {
    it('should create a new todo on success', () => {
      const todo = Todo.create(props);

      expect(todo.id).toBeDefined();
      expect(todo.id).toHaveLength(36);
      expect(todo.name).toBe(props.name);
      expect(todo.status).toBe(props.status);
    });
  });
});
