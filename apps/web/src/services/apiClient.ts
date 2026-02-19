export interface ApiClient {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  patch<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

class PlaceholderApiClient implements ApiClient {
  async get<T>(_path: string): Promise<T> {
    throw new Error('apiClient.get not wired yet (mock phase).');
  }
  async post<T>(_path: string, _body?: unknown): Promise<T> {
    throw new Error('apiClient.post not wired yet (mock phase).');
  }
  async patch<T>(_path: string, _body?: unknown): Promise<T> {
    throw new Error('apiClient.patch not wired yet (mock phase).');
  }
  async delete<T>(_path: string): Promise<T> {
    throw new Error('apiClient.delete not wired yet (mock phase).');
  }
}

export const apiClient: ApiClient = new PlaceholderApiClient();
