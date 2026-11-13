import Link from "next/link";
import { Container } from "@/components/shared/Container";

export default function ProjectNotFound() {
  return (
    <div className="bg-background pb-24 pt-36 md:pt-44">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">404</p>
        <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-4xl">
          That project does not exist
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-body">
          The link may be old or mistyped. All the projects I have built and shipped are on the projects page.
        </p>
        <Link
          href="/projects"
          className="mt-8 inline-flex min-h-11 items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          See all projects
        </Link>
      </Container>
    </div>
  );
}
