type CreateTodoListInput = {
  name: string;
  color: string;
};

export class TodosListDataBuilder {
  private props: CreateTodoListInput = {
    color: '#456789',
    name: 'John Doe',
  };

  public static anTodoList(): TodosListDataBuilder {
    return new TodosListDataBuilder();
  }

  public withName(name: string): this {
    this.props.name = name;
    return this;
  }

  public withColor(color: string): this {
    this.props.color = color;
    return this;
  }

  public build(): CreateTodoListInput {
    return this.props;
  }
}
