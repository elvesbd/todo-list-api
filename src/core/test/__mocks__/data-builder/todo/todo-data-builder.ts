type CreateTodoInput = {
  name: string;
  todosLisId: string
};

export class TodoDataBuilder {
  private props: CreateTodoInput = {
    name: 'John Doe',
    todosLisId: 'd6f4c58a-3f30-4b0e-b0f3-05c12d7c740f',
  };

  public static anTodo(): TodoDataBuilder {
    return new TodoDataBuilder();
  }

  public withName(name: string): this {
    this.props.name = name;
    return this;
  }

  public withTodosLisId(todosLisId: string): this {
    this.props.todosLisId = todosLisId;
    return this;
  }

  public build(): CreateTodoInput {
    return this.props;
  }
}
