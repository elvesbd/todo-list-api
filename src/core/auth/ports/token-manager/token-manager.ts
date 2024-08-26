export type Payload = {
  sub: string;
};

export abstract class TokenManager {
  public abstract signAsync: (payload: Payload) => Promise<string>;
}
