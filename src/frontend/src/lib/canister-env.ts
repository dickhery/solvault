import runtimeEnv from "../../env.json";

declare const process: { env: Record<string, string | undefined> };

type RuntimeEnv = {
  backend_host?: string;
  backend_canister_id?: string;
  project_id?: string;
  ii_derivation_origin?: string;
};

type IcEnvCookie = {
  canisterIds: Record<string, string>;
  rootKey: Uint8Array | null;
};

const parsedRuntimeEnv = runtimeEnv as RuntimeEnv;

function normalizeString(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed === "undefined" || trimmed === "null") {
    return null;
  }
  return trimmed;
}

function getBuildTimeEnv(key: string): string | null {
  if (typeof process === "undefined") {
    return null;
  }

  return normalizeString(process.env[key]);
}

function decodeHex(value: string): Uint8Array | null {
  if (!/^[0-9a-fA-F]+$/.test(value) || value.length % 2 !== 0) {
    return null;
  }

  const bytes = new Uint8Array(value.length / 2);
  for (let i = 0; i < value.length; i += 2) {
    bytes[i / 2] = Number.parseInt(value.slice(i, i + 2), 16);
  }
  return bytes;
}

function decodeBase64(value: string): Uint8Array | null {
  if (typeof atob !== "function") {
    return null;
  }

  try {
    const binary = atob(value);
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  } catch {
    return null;
  }
}

function decodeRootKey(value: string | null): Uint8Array | null {
  const normalized = normalizeString(value);
  if (!normalized) return null;

  if (normalized.startsWith("[") && normalized.endsWith("]")) {
    try {
      const parsed = JSON.parse(normalized);
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (entry) =>
            Number.isInteger(entry) && entry >= 0 && entry <= 255,
        )
      ) {
        return Uint8Array.from(parsed);
      }
    } catch {
      return null;
    }
  }

  return decodeHex(normalized) ?? decodeBase64(normalized);
}

function getIcEnvCookieValue(): string | null {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("ic_env="));

  return cookie ? decodeURIComponent(cookie.slice("ic_env=".length)) : null;
}

function parseIcEnvCookie(): IcEnvCookie | null {
  const rawValue = getIcEnvCookieValue();
  if (!rawValue) return null;

  const params = new URLSearchParams(rawValue);
  const canisterIds: Record<string, string> = {};

  params.forEach((value, key) => {
    if (!key.startsWith("PUBLIC_CANISTER_ID:")) return;

    const canisterName = key.slice("PUBLIC_CANISTER_ID:".length);
    const normalizedValue = normalizeString(value);
    if (canisterName && normalizedValue) {
      canisterIds[canisterName] = normalizedValue;
    }
  });

  return {
    canisterIds,
    rootKey: decodeRootKey(params.get("ic_root_key")),
  };
}

export function getBackendCanisterId(): string | null {
  const icEnv = parseIcEnvCookie();
  return (
    normalizeString(icEnv?.canisterIds.backend) ??
    getBuildTimeEnv("CANISTER_ID_BACKEND") ??
    normalizeString(parsedRuntimeEnv.backend_canister_id)
  );
}

export function getBackendHost(): string | null {
  const icEnv = parseIcEnvCookie();
  if (icEnv && typeof window !== "undefined") {
    return window.location.origin;
  }

  return (
    normalizeString(parsedRuntimeEnv.backend_host) ??
    (typeof window !== "undefined" ? window.location.origin : null)
  );
}

export function getBackendRootKey(): Uint8Array | undefined {
  return parseIcEnvCookie()?.rootKey ?? undefined;
}

export function getBackendConfigurationError(): string | null {
  if (getBackendCanisterId()) return null;
  return "Backend canister ID is not configured for this frontend session.";
}
