export abstract class BaseViewModel {
  public static readonly toHTTP: <TModel, TResponse>(
    model: TModel,
  ) => TResponse;
}
