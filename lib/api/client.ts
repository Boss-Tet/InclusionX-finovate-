/**
 * lib/api/client.ts
 *
 * Typed fetch wrapper for all frontend → backend calls.
 * - Automatically reads activeGroupId from localStorage
 * - Sends x-active-group-id header on every request (required by resolveGroupMember)
 * - Returns { data } on success, throws ApiError on failure
 */

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface ApiSuccess<T> {
  success: true;
  data: T;
}

interface ApiFailure {
  success: false;
  error: string | object;
  code?: string;
}

type ApiResult<T> = ApiSuccess<T> | ApiFailure;

function getActiveGroupId(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('vsla_active_group_id') ?? '';
}

export function setActiveGroupId(groupId: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('vsla_active_group_id', groupId);
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const groupId = getActiveGroupId();
  if (groupId) headers['x-active-group-id'] = groupId;

  const res = await fetch(path, { ...options, headers });
  const json: ApiResult<T> = await res.json();

  if (!json.success) {
    const msg =
      typeof json.error === 'string'
        ? json.error
        : 'An unexpected error occurred.';
    throw new ApiError(res.status, (json as ApiFailure).code ?? 'UNKNOWN', msg);
  }

  return (json as ApiSuccess<T>).data;
}

export const api = {
  get: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { ...options, method: 'GET' }),

  post: <T>(path: string, body: unknown, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  patch: <T>(path: string, body: unknown, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};
