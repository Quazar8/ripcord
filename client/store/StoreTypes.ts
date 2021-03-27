export type Action<Enumerator, P> = {
    type: Enumerator
    payload: P
}