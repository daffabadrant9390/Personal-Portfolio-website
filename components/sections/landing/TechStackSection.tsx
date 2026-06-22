"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";
import { usePortfolioStore } from "@/lib/store/usePortfolioStore";

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const ICON_MAP: Record<string, string> = {
  react:      `${DEVICON_BASE}/react/react-original.svg`,
  typescript: `${DEVICON_BASE}/typescript/typescript-original.svg`,
  nodejs:     `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  python:     `${DEVICON_BASE}/python/python-original.svg`,
  nextjs:     `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  nestjs:     `${DEVICON_BASE}/nestjs/nestjs-original.svg`,
  fastapi:    `${DEVICON_BASE}/fastapi/fastapi-original.svg`,
  graphql:    `${DEVICON_BASE}/graphql/graphql-plain.svg`,
  vscode:     `${DEVICON_BASE}/vscode/vscode-original.svg`,
  figma:      `${DEVICON_BASE}/figma/figma-original.svg`,
  git:        `${DEVICON_BASE}/git/git-original.svg`,
  docker:     `${DEVICON_BASE}/docker/docker-original.svg`,
};

function TechIcon({ name, icon }: { name: string; icon: string }) {
  const src = ICON_MAP[icon];
  return (
    <div className="group flex flex-col items-center gap-2 rounded-xl
                    border border-border bg-card
                    p-3 sm:p-4
                    w-[4.5rem] sm:w-24 md:w-28
                    hover:border-blue-200 dark:hover:border-blue-900/40
                    hover:bg-blue-50/40 dark:hover:bg-blue-950/10
                    transition-all duration-200 cursor-default">
      <div className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            className="h-5 w-5 sm:h-7 sm:w-7 object-contain
                       transition-transform duration-200 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <span className="text-xs font-bold text-muted-foreground">
            {name.substring(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span className="text-[10px] sm:text-xs text-muted-foreground
                       group-hover:text-foreground transition-colors text-center leading-tight">
        {name}
      </span>
    </div>
  );
}

export function TechStackSection() {
  const { techCategories } = usePortfolioStore();

  return (
    <section className="relative py-20 md:py-32 bg-background">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <Container>
        {/* Heading */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest
                           text-blue-600 dark:text-blue-400 mb-3 block">
            {"// Stack"}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground md:text-4xl">
            Technologies I Work With
          </h2>
          <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">
            A curated toolkit for building modern, scalable, and maintainable software.
          </p>
        </AnimatedSection>

        {/* Categories */}
        <div className="space-y-8 md:space-y-10">
          {techCategories.map((category, catIdx) => (
            <AnimatedSection key={category.label} delay={catIdx * 0.08}>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest
                            text-muted-foreground mb-4 text-center">
                {category.label}
              </p>

              {/* Icons — flex-wrap + justify-center, responsive sizes */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {category.items.map((tech, i) => (
                  <AnimatedSection
                    key={tech.name}
                    delay={catIdx * 0.08 + i * 0.04}
                  >
                    <TechIcon name={tech.name} icon={tech.icon} />
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
