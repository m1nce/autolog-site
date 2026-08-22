const base = import.meta.env.BASE_URL;
const trimmedBase = base.endsWith("/") ? base.slice(0, -1) : base;

/** Prefixes an app-root-relative path ("/", "/support", ...) with BASE_URL, without doubling slashes. */
export function withBase(path: string): string {
  return `${trimmedBase}${path}`;
}
