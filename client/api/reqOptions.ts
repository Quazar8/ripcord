export const baseUrl = 'http://localhost:8000'

export const postQueryOptions = (data: Object): RequestInit => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
})