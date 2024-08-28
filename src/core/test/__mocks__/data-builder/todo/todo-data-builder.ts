type CreateTodoInput = {
  id?: string;
  name: string;
  status?: boolean;
};

export class TodoDataBuilder {
  private props: CreateTodoInput = {
    id: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
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
