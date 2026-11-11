import { softSkills } from "@/lib/data/portfolio";

/** Soft skills, each backed by where it showed up in real work. */
export function SoftSkills() {
  return (
    <ul className="grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2">
      {softSkills.map((skill) => (
        <li key={skill.title} className="border-t-2 border-border py-5">
          <h3 className="font-heading text-base font-bold text-foreground">{skill.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-body">{skill.evidence}</p>
        </li>
      ))}
    </ul>
  );
}
