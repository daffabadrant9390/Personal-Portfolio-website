/**
 * Background removal using BFS flood-fill from image corners.
 * This preserves interior dark pixels (e.g. silhouette) that aren't
 * reachable from the edges, while removing the solid background.
 */
import sharp from "sharp";
import { writeFileSync } from "fs";

async function removeBackground(inputPath, outputPath, tolerance = 28) {
  const image = sharp(inputPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const channels = 4;

  // Sample background color from the top-left corner
  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];
  console.log(`Background sample at (0,0): rgb(${bgR}, ${bgG}, ${bgB})`);

  const isBg = (idx) => {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    return (
      Math.abs(r - bgR) <= tolerance &&
      Math.abs(g - bgG) <= tolerance &&
      Math.abs(b - bgB) <= tolerance
    );
  };

  // BFS flood-fill starting from all 4 corners
  const visited = new Uint8Array(width * height);
  const queue = [];

  const enqueue = (x, y) => {
    const i = y * width + x;
    if (!visited[i]) {
      visited[i] = 1;
      queue.push(i);
    }
  };

  enqueue(0, 0);
  enqueue(width - 1, 0);
  enqueue(0, height - 1);
  enqueue(width - 1, height - 1);

  // Also seed from all 4 edges for safety
  for (let x = 0; x < width; x++) { enqueue(x, 0); enqueue(x, height - 1); }
  for (let y = 0; y < height; y++) { enqueue(0, y); enqueue(width - 1, y); }

  let head = 0;
  while (head < queue.length) {
    const i = queue[head++];
    const x = i % width;
    const y = Math.floor(i / width);
    const pixIdx = i * channels;

    if (!isBg(pixIdx)) continue;

    // Make transparent
    data[pixIdx + 3] = 0;

    // Spread to 4-connected neighbours
    if (x > 0)         enqueue(x - 1, y);
    if (x < width - 1) enqueue(x + 1, y);
    if (y > 0)         enqueue(x, y - 1);
    if (y < height - 1) enqueue(x, y + 1);
  }

  const buf = await sharp(Buffer.from(data), {
    raw: { width, height, channels },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(outputPath, buf);
  console.log(`✓ Written: ${outputPath}`);
}

const base = "/Users/mdaffabadranthoriq/Documents/coding/personal-website/personal-portfolio-daffa/public";

await removeBackground(`${base}/logo-dark.png`,  `${base}/logo-dark.png`,  55);
console.log("Done!");
