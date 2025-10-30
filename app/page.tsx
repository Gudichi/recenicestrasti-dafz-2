import AboveTheFold from "./atf";
import { getVersion } from "./versions";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ v: string | undefined }>;
}) {
  const versionKey = (await searchParams).v;
  const version = getVersion(versionKey || "a");

  return <AboveTheFold version={version} />;
}
