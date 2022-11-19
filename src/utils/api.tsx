export const API = process.env["NEXT_PUBLIC_API_URL"] || "";

export const api = async function <T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(API + path, init);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await (response.json() as Promise<T>);
};
