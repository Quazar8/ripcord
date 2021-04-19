export const baseUrl = 'http://localhost:8000'

export const postQueryOptions = (data: Object): RequestInit => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
})

export const getQueryOptions = (includeCredentials: boolean = false): RequestInit => {
    const options: RequestInit = {
        method: 'GET'
    }

    if (includeCredentials) {
        options.credentials = 'include'
    }

    return options
}