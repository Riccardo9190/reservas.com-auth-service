export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
    constructor(public readonly value: L) {}

    isLeft(): this is Left<L, A> {
        return true;
    }

    isRight(): this is Right<L, A> {
        return false;
    }
}

export class Right<L, A> {
    constructor(public readonly value: A) {}

    isLeft(): this is Left<L, A> {
        return false;
    }

    isRight(): this is Right<L, A> {
        return true;
    }
}

export const left = <L, A>(l: L): Either<L, A> => {
    return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
    return new Right(a);
};
