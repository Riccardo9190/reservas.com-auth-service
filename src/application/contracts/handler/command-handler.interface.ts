import { IHandler } from './handler.interface';

export interface ICommandHandler<C, R> extends IHandler<C, R> {}
