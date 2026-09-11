import type { NavItem } from "./nav-types";

const BUILDING_ROUTE = /^\/(?:report|guide)\/([^/]+)/;

function isWithin(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/**
 * Site-wide primary navigation. Both building-scoped links follow the
 * building in the URL (`/report/:id`, `/guide/:id`). Elsewhere,
 * "에너지 성적표" goes to the address search, so every visit starts from a
 * fresh search, and "절감 하기" falls back to the signed-in user's primary
 * building.
 */
export function buildSiteNav(pathname: string, defaultBuildingId: string): NavItem[] {
  const urlBuildingId = BUILDING_ROUTE.exec(pathname)?.[1];
  return [
    {
      label: "에너지 성적표",
      href: urlBuildingId ? `/report/${urlBuildingId}` : "/search",
      active: isWithin(pathname, "/report") || isWithin(pathname, "/search"),
    },
    {
      label: "절감 하기",
      href: `/guide/${urlBuildingId ?? defaultBuildingId}`,
      active: isWithin(pathname, "/guide"),
    },
    { label: "지원사업", href: "/programs", active: isWithin(pathname, "/programs") },
    { label: "서비스 소개", href: "/about", active: isWithin(pathname, "/about") },
  ];
}
