import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SERVICES_FILE = path.join(process.cwd(), "data", "services.json");

const DEFAULT_SERVICES = [
  { id: "1", title: "Performance Marketing", icon: "📈", color: "#EC0CAA", active: true, description: "Meta, Google & YouTube ads engineered for maximum ROAS." },
  { id: "2", title: "Web Engineering", icon: "⚡", color: "#FF6B2B", active: true, description: "High-performance websites & apps built for speed and conversion." },
  { id: "3", title: "SEO & Content", icon: "🔍", color: "#7C3AED", active: true, description: "Dominate search rankings with data-driven SEO strategies." },
  { id: "4", title: "Social Media Management", icon: "📱", color: "#06B6D4", active: true, description: "Full-service social media management end-to-end." },
  { id: "5", title: "Brand Strategy", icon: "🎯", color: "#10B981", active: true, description: "Distinctive identity systems that define your market position." },
  { id: "6", title: "Video Production", icon: "🎬", color: "#F59E0B", active: true, description: "Cinematic ad creatives and brand films that stop the scroll." },
];

function ensureServicesFile() {
  const dir = path.dirname(SERVICES_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(SERVICES_FILE)) fs.writeFileSync(SERVICES_FILE, JSON.stringify(DEFAULT_SERVICES, null, 2));
}

export async function GET() {
  ensureServicesFile();
  const data = JSON.parse(fs.readFileSync(SERVICES_FILE, "utf-8"));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  ensureServicesFile();
  const data = JSON.parse(fs.readFileSync(SERVICES_FILE, "utf-8"));
  const newItem = { id: Date.now().toString(), active: true, ...body };
  data.push(newItem);
  fs.writeFileSync(SERVICES_FILE, JSON.stringify(data, null, 2));
  return NextResponse.json(newItem);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  ensureServicesFile();
  const data = JSON.parse(fs.readFileSync(SERVICES_FILE, "utf-8"));
  const idx = data.findIndex((s: { id: string }) => s.id === body.id);
  if (idx !== -1) data[idx] = { ...data[idx], ...body };
  fs.writeFileSync(SERVICES_FILE, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  ensureServicesFile();
  const data = JSON.parse(fs.readFileSync(SERVICES_FILE, "utf-8"));
  const filtered = data.filter((s: { id: string }) => s.id !== id);
  fs.writeFileSync(SERVICES_FILE, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ success: true });
}
