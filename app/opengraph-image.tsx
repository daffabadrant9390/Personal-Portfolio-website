import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public", "og-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "#1E1E1C",
          color: "#F3EEE3",
          borderBottom: "14px solid #6B97FF",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6B97FF",
          }}
        >
          Full Stack Software Engineer
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          M. Daffa Badranthoriq
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            color: "#D8CBB3",
            maxWidth: 680,
          }}
        >
          Next.js, TypeScript and Golang, plus AI and LLM applications. Based in Jakarta.
        </div>
        </div>
        <img src={logoSrc} alt="" width={363} height={403} style={{ objectFit: "contain" }} />
      </div>
    ),
    { ...size }
  );
}
