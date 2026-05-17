import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "submissions.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    ensureDataFile();
    const existing = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const newEntry = { id: Date.now().toString(), ...body, status: "new", createdAt: new Date().toISOString() };
    existing.unshift(newEntry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}

export async function GET() {
  try {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const idx = data.findIndex((d: { id: string }) => d.id === id);
    if (idx !== -1) data[idx].status = status;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const filtered = data.filter((d: { id: string }) => d.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
