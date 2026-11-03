// Thin fetch wrapper for the backend API.
// Set VITE_API_URL in .env (e.g. VITE_API_URL=http://localhost:4000/api).
const BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
export const API_BASE = BASE;
const TOKEN_KEY = "lp_token";

// Turns a server-relative file path (/api/files/...) into a full URL the browser can open.
export const assetUrl = (u) => (u && u.startsWith("/") ? `${BASE.replace(/\/api$/, "")}${u}` : u);

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors; // [{ field, message }] from validation failures
  }
}

// Called when any request comes back 401 (expired/invalid token).
let onUnauthorized = () => {};
export const setUnauthorizedHandler = (fn) => { onUnauthorized = fn; };

async function request(path, { method = "GET", body, query, headers = {} } = {}) {
  const url = new URL(`${BASE}${path}`);
  if (query) Object.entries(query).forEach(([k, v]) => v != null && url.searchParams.set(k, v));

  const isForm = body instanceof FormData;
  const token = tokenStore.get();
  const res = await fetch(url, {
    method,
    headers: {
      ...(body && !isForm ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });

  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // A 401 on a request that carried a token means the session is no longer valid.
    if (res.status === 401 && token) onUnauthorized();
    const detail = data.errors?.[0]?.message;
    throw new ApiError(res.status, detail || data.message || "Request failed", data.errors);
  }
  return data;
}

export const api = {
  get: (path, query) => request(path, { query }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
  upload: (path, file, fields = {}) => {
    const form = new FormData();
    Object.entries(fields).forEach(([k, v]) => form.append(k, v));
    form.append("file", file); // file last so multer sees the text fields
    return request(path, { method: "POST", body: form });
  },
  // Private files (receipts, documents, submissions) need the Bearer header, so fetch as a blob.
  fileBlobUrl: async (fileUrlPath) => {
    const res = await fetch(`${BASE.replace(/\/api$/, "")}${fileUrlPath}`, {
      headers: { Authorization: `Bearer ${tokenStore.get()}` },
    });
    if (!res.ok) throw new ApiError(res.status, "Could not load file");
    return URL.createObjectURL(await res.blob());
  },
};

// Opens a private file (receipt, verification document) in a new tab.
// The tab is opened first so the browser does not treat it as a blocked pop-up.
export async function openPrivateFile(fileUrlPath) {
  const tab = window.open("", "_blank");
  try {
    const url = await api.fileBlobUrl(fileUrlPath);
    if (tab) tab.location.href = url;
    else window.location.href = url;
  } catch (err) {
    if (tab) tab.close();
    throw err;
  }
}
