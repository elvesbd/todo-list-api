type CreateTodoInput = {
  name: string;
};

export class TodoDataBuilder {
  private props: CreateTodoInput = {
    name: 'John Doe',
  };

  public static anTodo(): TodoDataBuilder {
    return new TodoDataBuilder();
  }

  public withName(name: string): this {
    this.props.name = name;
    return this;
  }

  public build(): CreateTodoInput {
    return this.props;
  }
}
