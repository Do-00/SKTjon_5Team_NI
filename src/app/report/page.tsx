import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { PageSection, SiteShell } from "@/src/components/layout";
import { firstParam } from "@/src/lib/search-params";
import { ReportLookup } from "./_components/ReportLookup";

export const metadata: Metadata = {
  title: "에너지 성적표 조회",
};

const LOOKUP_PARAMS = ["jibunAddress", "roadAddress", "buildingName", "sido", "apartment"] as const;

/**
 * Report for an address picked in the Kakao postcode popup
 * (`/report?jibunAddress=…&roadAddress=…`). The lookup itself runs on the
 * client in `ReportLookup` against the energy-grade API.
 */
export default async function ReportLookupPage(props: PageProps<"/report">) {
  const searchParams = await props.searchParams;
  const params = new URLSearchParams();
  for (const key of LOOKUP_PARAMS) {
    const value = firstParam(searchParams[key]);
    if (value) params.set(key, value);
  }

  const jibunAddress = params.get("jibunAddress") ?? undefined;
  const roadAddress = params.get("roadAddress") ?? undefined;
  if (!jibunAddress && !roadAddress) {
    redirect("/search");
  }

  const query = params.toString();

  return (
    <SiteShell>
      <PageSection>
        <ReportLookup
          key={query}
          jibunAddress={jibunAddress}
          roadAddress={roadAddress}
          buildingName={params.get("buildingName") ?? undefined}
          sido={params.get("sido") ?? undefined}
          isApartment={params.get("apartment") === "Y"}
          savePath={`/report?${query}`}
        />
      </PageSection>
    </SiteShell>
  );
}
