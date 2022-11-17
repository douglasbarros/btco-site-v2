export const API = 'http://localhost:1337'//process.env?.NEXT_PUBLIC_URL

export function api<T>(path: string, init?: RequestInit): Promise<T> {
  return fetch(API + path, init)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
}
