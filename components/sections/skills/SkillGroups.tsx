import { currentlyBuilding, techCategories } from "@/lib/data/portfolio";
import { getDeviconUrl, getIconTone } from "@/lib/devicons";

function SkillChip({ name, icon }: { name: string; icon: string }) {
  const src = getDeviconUrl(icon);
  const tone = getIconTone(icon);
  const invert = tone === "dark" ? "dark:invert" : tone === "light" ? "invert dark:invert-0" : "";

  return (
    <li className="inline-flex min-h-11 items-center gap-2.5 rounded-xl border-2 border-border bg-background px-3 py-2">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" aria-hidden="true" width={22} height={22} loading="lazy" className={`h-[22px] w-[22px] object-contain ${invert}`} />
      ) : (
        <span aria-hidden="true" className="flex h-[22px] w-[22px] items-center justify-center text-[10px] font-bold text-muted-foreground">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-sm font-medium text-foreground">{name}</span>
    </li>
  );
}

/** Hard skills grouped as in the resume. Logos for tools, plain chips for practices. */
export function SkillGroups() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {techCategories.map((category) => (
          <section key={category.label} className="card-solid p-5 sm:p-6">
            <h3 className="font-heading text-lg font-bold text-foreground">{category.label}</h3>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${category.label} tools`}>
              {category.items.map((tech) => (
                <SkillChip key={tech.name} name={tech.name} icon={tech.icon} />
              ))}
            </ul>
            {category.more && category.more.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t-2 border-border pt-4 text-sm text-body" aria-label={`${category.label} practices`}>
                {category.more.map((item) => (
                  <li key={item} className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Currently building with:</span>{" "}
        {currentlyBuilding.join(", ")}
      </p>
    </div>
  );
}
