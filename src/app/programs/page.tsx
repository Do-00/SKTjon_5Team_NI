import type { Metadata } from "next";
import { getUserAccount } from "@/src/data/account";
import { getBuildingById } from "@/src/data/buildings";
import { getSupportPrograms } from "@/src/data/programs";
import { PageSection, SiteShell } from "@/src/components/layout";
import { describeAudience } from "@/src/lib/audience";
import { ProgramsExplorer } from "./_components/ProgramsExplorer";

export const metadata: Metadata = {
  title: "지원사업 매칭",
};

function readInitialTag(value: string | string[] | undefined): string | null {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.length > 0) return value[0];
  return null;
}

/**
 * Server shell for the support-programs list. Awaits `searchParams` for the
 * `?tag=` deep link, fetches every fixture program plus the signed-in user's
 * building (for the "마포구 · 소유주 기준" hint), and hands them to the
 * `ProgramsExplorer` client island for filtering, the notification
 * switch/toast, and the leave-confirmation dialog.
 */
export default async function ProgramsPage({ searchParams }: PageProps<"/programs">) {
  const resolvedSearchParams = await searchParams;
  const initialFilter = readInitialTag(resolvedSearchParams.tag);

  const [programs, account] = await Promise.all([getSupportPrograms(), getUserAccount()]);
  const building = await getBuildingById(account.primaryBuildingId);

  return (
    <SiteShell>
      <PageSection>
        <ProgramsExplorer
          programs={programs}
          initialFilter={initialFilter}
          audienceLabel={describeAudience(building?.address ?? "", account.userType)}
        />
      </PageSection>
    </SiteShell>
  );
}
