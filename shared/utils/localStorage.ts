export function setLocalStorage<T>(key: string, data: T): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function getLocalStorage<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
