import { cookies } from "next/headers";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

async function getAuthHeaders(): Promise<HeadersInit> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parseError(res: Response): Promise<ApiError> {
  const body = await res.json().catch(() => ({}));
  return new ApiError(
    res.status,
    body.code ?? "UNKNOWN",
    body.message ?? "Server error",
    body.details,
  );
}

/** For SWR fetchers (GET) — throws ApiError on non-2xx */
export async function apiFetch<T>(path: string): Promise<T> {
  const headers = await getAuthHeaders();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    headers,
  });

  if (!res.ok) throw await parseError(res);

  return res.json();
}

/** For useTransition mutations (POST/PUT/DELETE/PATCH) — returns ApiResult */
export async function apiAction<T = void>(
  method: "POST" | "PUT" | "DELETE" | "PATCH",
  path: string,
  body?: unknown,
): Promise<ApiResult<T>> {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      return { ok: false, error: await parseError(res) };
    }

    const data = res.status === 204 ? (undefined as T) : await res.json();
    return { ok: true, data };
  } catch (e) {
    if (e instanceof ApiError) return { ok: false, error: e };
    return {
      ok: false,
      error: new ApiError(0, "NETWORK_ERROR", "Network error"),
    };
  }
}
