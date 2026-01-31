export type Result<T, E = string> = {
    success: true;
    data: T;
} | {
    success: false;
    error: E;
};
export declare const ok: <T>(data: T) => Result<T, never>;
export declare const err: <E>(error: E) => Result<never, E>;
