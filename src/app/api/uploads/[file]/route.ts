import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { UPLOADS_DIR } from "@/lib/db";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: { file: string } }
) {
  // Alleen exacte bestandsnamen zonder padtrucs
  const name = path.basename(params.file);
  const ext = path.extname(name).toLowerCase();
  const type = TYPES[ext];
  if (!type || name !== params.file) {
    return new NextResponse("Not found", { status: 404 });
  }
  const filePath = path.join(UPLOADS_DIR, name);
  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const data = fs.readFileSync(filePath);
  return new NextResponse(data, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
