"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import type { Dict } from "@/i18n";

/**
 * Prijscalculator-lite: budget + gebruik + resolutie → passend bouwpakket.
 * Bewust simpel: geen webshop, geen configurator, gewoon richting geven.
 */
export function PcCalculator({
  labels,
  contactHref,
}: {
  labels: Dict["calculator"];
  contactHref: string;
}) {
  const [budget, setBudget] = useState(1000);
  const [use, setUse] = useState(0);
  const [res, setRes] = useState(0); // 0=1080p 1=1440p 2=4K

  // Meet gebruik pas na een korte rustpauze, niet bij elke schuifbeweging
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(
      () => track("calculator_use", { label: `${["1080p", "1440p", "4K"][res]}/gebruik-${use}`, value: budget }),
      1200
    );
    return () => clearTimeout(timer);
  }, [budget, use, res]);

  const isGaming = use === 0 || use === 1;
  const isCreator = use === 3;

  // Pakketadvies: Setup Totaal bij hoog budget, Pro bij RGB/tuning-territorium
  const pkg =
    budget >= 1800 && isGaming
      ? { name: "Gaming Setup Totaal", price: "€199" }
      : budget >= 1200 && (isGaming || isCreator)
        ? { name: "Custom PC Build Pro", price: "€170" }
        : { name: "Custom PC Build", price: "€130" };

  const tier =
    budget < 800 && !isGaming
      ? labels.tierLow
      : budget >= 1500
        ? labels.tierHigh
        : labels.tierMid;

  const show4kWarning = res === 2 && budget < 1500;

  // Neem het resultaat mee naar het contactformulier: het bericht wordt
  // voorgevuld met het advies, zodat de klant niet opnieuw hoeft te typen.
  const resLabels = ["1080p", "1440p", "4K"];
  const prefill = labels.prefill
    .replace("{pkg}", pkg.name)
    .replace("{budget}", String(budget))
    .replace("{use}", labels.uses[use].toLowerCase())
    .replace("{res}", resLabels[res]);
  const contactWithContext = `${contactHref}?from=calculator&service=pc&msg=${encodeURIComponent(prefill)}`;

  return (
    <div className="gamer-card rounded-2xl border border-ink/10 bg-surface p-6 sm:p-8">
      <h2 className="text-2xl font-bold">{labels.title}</h2>
      <p className="mt-2 text-ink/80">{labels.intro}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <label className="label" htmlFor="calc-budget">
              {labels.budgetLabel}:{" "}
              <span className="font-mono text-base text-ink">€{budget}</span>
            </label>
            <input
              id="calc-budget"
              type="range"
              min={500}
              max={3000}
              step={50}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-signal"
            />
            <div className="flex justify-between font-mono text-xs text-steel">
              <span>€500</span>
              <span>€3000</span>
            </div>
          </div>

          <fieldset>
            <legend className="label">{labels.useLabel}</legend>
            <div className="space-y-1.5">
              {labels.uses.map((u, i) => (
                <label key={u} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="calc-use"
                    checked={use === i}
                    onChange={() => setUse(i)}
                    className="accent-signal"
                  />
                  {u}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="label">{labels.resLabel}</legend>
            <div className="flex gap-2">
              {resLabels.map((r, i) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRes(i)}
                  aria-pressed={res === i}
                  className={`rounded-lg border px-4 py-1.5 font-mono text-sm font-bold transition ${
                    res === i ? "border-signal bg-accent-strong text-white" : "border-ink/15 text-steel hover:text-ink"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="flex flex-col justify-between rounded-xl bg-cobalt/5 p-6">
          <div>
            <p className="label">{labels.verdictLabel}</p>
            <p className="text-ink/90">{tier}</p>
            {show4kWarning && (
              <p className="mt-2 rounded-lg bg-accent-strong/10 px-3 py-2 text-sm font-medium text-accent-strong">
                {labels.warn4k}
              </p>
            )}
            <div className="mt-4 space-y-1">
              <p className="text-sm text-steel">
                <span className="font-mono font-bold text-ink">±€{budget}</span> {labels.partsLabel}
              </p>
              <p className="text-sm text-steel">
                {labels.packageLabel}:{" "}
                <span className="font-semibold text-ink">{pkg.name}</span>{" "}
                <span className="price-tag price-tag--accent ml-1">{pkg.price}</span>
              </p>
            </div>
          </div>
          <Link href={contactWithContext} data-track="calculator_cta_click" className="btn-primary mt-6 text-center">
            {labels.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
