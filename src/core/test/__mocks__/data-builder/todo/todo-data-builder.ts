type CreateTodoInput = {
  name: string;
  status: boolean;
};

export class TodoDataBuilder {
  private props: CreateTodoInput = {
    name: 'John Doe',
    status: false,
  };

  public static anTodo(): TodoDataBuilder {
    return new TodoDataBuilder();
  }

  public withName(name: string): this {
    this.props.name = name;
    return this;
  }

  public withStatus(status: boolean): this {
    this.props.status = status;
    return this;
  }

  public build(): CreateTodoInput {
    return this.props;
  }
}
