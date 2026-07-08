import type { Metadata } from "next";
import Link from "next/link";
import { confirmSubscriber } from "@/lib/db";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n";

export const metadata: Metadata = { robots: { index: false } };
export const dynamic = "force-dynamic";

export default function BevestigPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { token?: string };
}) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const t = getDict(lang).newsletter;
  const common = getDict(lang).common;
  const token = searchParams.token || "";
  const ok = token ? confirmSubscriber(token) : false;

  return (
    <div className="mx-auto max-w-2xl px-4 pt-14 text-center">
      <h1 className="text-4xl font-bold">{ok ? t.confirmOkTitle : t.confirmFailTitle}</h1>
      <p className="mt-4 text-lg text-ink/80">{ok ? t.confirmOkText : t.confirmFailText}</p>
      <Link href={`/${lang}`} className="btn-secondary mt-8">{common.toHome}</Link>
    </div>
  );
}
