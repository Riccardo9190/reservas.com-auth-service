export interface IHandler<Input, Output> {
    execute(input: Input): Promise<Output>;
}
