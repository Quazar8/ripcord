export type Action<T, Enumerator> = {
    type: Enumerator
    payload: T
}