/**
 * Packs an address into a route-safe `/report/[buildingId]` segment and back.
 * beec has no persistent building ids, only address matching, so the id *is*
 * the address (UTF-8 → base64url). Uses `btoa`/`TextEncoder` rather than
 * Node's `Buffer` so the home hero can build report links in the browser;
 * the output is byte-for-byte what `Buffer#toString("base64url")` produced.
 */

/** Prefix marking a building id as a live beec match rather than a fixture id like `"bld-001"`. */
const ADDRESS_ID_PREFIX = "addr-";

export function encodeAddressId(address: string): string {
  let binary = "";
  for (const byte of new TextEncoder().encode(address)) {
    binary += String.fromCharCode(byte);
  }
  const base64url = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `${ADDRESS_ID_PREFIX}${base64url}`;
}

/** Unpacks an `encodeAddressId` id back to the original address, or `null` for a fixture id or malformed input. */
export function decodeAddressId(id: string): string | null {
  if (!id.startsWith(ADDRESS_ID_PREFIX)) return null;
  try {
    const base64 = id.slice(ADDRESS_ID_PREFIX.length).replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}
