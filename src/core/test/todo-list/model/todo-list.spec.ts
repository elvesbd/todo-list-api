import { TodoList } from '@core/todo-list/model/todo-list';
import { TodoListDataBuilder } from '@core/test/__mocks__/data-builder';

describe('Todo List Domain Model', () => {
  const props = TodoListDataBuilder.anTodoList().build();

  describe('constructor', () => {
    it('should add notification if name is null', () => {
      const props = TodoListDataBuilder.anTodoList().withName(null).build();

      const assignor = TodoList.create(props);

      expect(assignor.containNotifications).toBe(true);
      expect(assignor.notifications).toEqual({
        nome: [
          'não pode ser nulo',
          'não pode estar vazio',
          'não pode ter mais que 140 caracteres',
        ],
      });
    });

    it('should add notification if name is empty', () => {
      const props = TodoListDataBuilder.anTodoList().withName('').build();

      const todo = TodoList.create(props);

      expect(todo.containNotifications).toBe(true);
      expect(todo.notifications).toEqual({
        nome: ['não pode estar vazio'],
      });
    });

    it('should add a notification if the name exceeds 140 characters', () => {
      const bigName = 'A'.repeat(141);
      const props = TodoListDataBuilder.anTodoList().withName(bigName).build();

      const assignor = TodoList.create(props);

      expect(assignor.containNotifications).toBe(true);
      expect(assignor.notifications).toEqual({
        nome: ['não pode ter mais que 140 caracteres'],
      });
    });

    it('should add notification if color is null', () => {
      const props = TodoListDataBuilder.anTodoList().withColor(null).build();

      const todoList = TodoList.create(props);

      expect(todoList.containNotifications).toBe(true);
      expect(todoList.notifications).toEqual({
        cor: [
          'não pode ser nulo',
          'deve estar no formato hexadecimal (#RRGGBB ou #RGB)',
        ],
      });
    });

    it('should add notification if color is empty', () => {
      const props = TodoListDataBuilder.anTodoList().withColor('').build();

      const todoList = TodoList.create(props);

      expect(todoList.containNotifications).toBe(true);
      expect(todoList.notifications).toEqual({
        cor: ['deve estar no formato hexadecimal (#RRGGBB ou #RGB)'],
      });
    });

    it('should add notification if color does not include the "#" symbol', () => {
      const invalidColorNoHash = 'RRGGBB';
      const propsNoHash = TodoListDataBuilder.anTodoList()
        .withColor(invalidColorNoHash)
        .build();

      const todoNoHash = TodoList.create(propsNoHash);

      expect(todoNoHash.containNotifications).toBe(true);
      expect(todoNoHash.notifications).toEqual({
        cor: ['deve estar no formato hexadecimal (#RRGGBB ou #RGB)'],
      });
    });

    it('should add notification if color has "#" but is in an invalid format', () => {
      const invalidColorWrongFormat = '#FF573';
      const propsWrongFormat = TodoListDataBuilder.anTodoList()
        .withColor(invalidColorWrongFormat)
        .build();

      const todoWrongFormat = TodoList.create(propsWrongFormat);

      expect(todoWrongFormat.containNotifications).toBe(true);
      expect(todoWrongFormat.notifications).toEqual({
        cor: ['deve estar no formato hexadecimal (#RRGGBB ou #RGB)'],
      });
    });
  });

  describe('getters', () => {
    it('should return the correct id', () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const todo = TodoList.create({ ...props, id });

      expect(id).toBe(todo.id);
      expect(todo.containNotifications).toBe(false);
    });

    it('should return the correct name', () => {
      const todo = TodoList.create(props);

      expect(todo.name).toBe(props.name);
    });

    it('should return the correct color', () => {
      const todo = TodoList.create(props);

      expect(todo.color).toBe(props.color);
    });
  });

  describe('update', () => {
    it('should update todo with valid properties', () => {
      const todo = TodoList.create(props);

      const newAssignorProps = TodoListDataBuilder.anTodoList()
        .withName('New TodoList')
        .withColor('#CCC')
        .build();

      todo.update(newAssignorProps);

      expect(todo.name).toBe(newAssignorProps.name);
      expect(todo.color).toBe(newAssignorProps.color);
    });
  });

  describe('create', () => {
    it('should create a new TodoList on success', () => {
      const todo = TodoList.create(props);

      expect(todo.id).toBeDefined();
      expect(todo.id).toHaveLength(36);
      expect(todo.name).toBe(props.name);
      expect(todo.color).toBe(props.color);
    });
  });
});
