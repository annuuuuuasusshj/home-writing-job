import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "data", "config.json");
const ADMIN_PASSWORD_KEY = "adminPassword";
const PASSWORD_FILE = path.join(process.cwd(), "data", "admin-password.txt");

async function getPassword(): Promise<string> {
  try {
    const pw = await fs.readFile(PASSWORD_FILE, "utf-8");
    return pw.trim();
  } catch {
    return "admin123";
  }
}

async function verifyAuth(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get("x-admin-password");
  if (!authHeader) return false;
  const password = await getPassword();
  return authHeader === password;
}

export async function GET() {
  try {
    const data = await fs.readFile(CONFIG_PATH, "utf-8");
    return Response.json(JSON.parse(data));
  } catch {
    return Response.json({ error: "Config not found" }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  const isAuth = await verifyAuth(request);
  if (!isAuth) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (body[ADMIN_PASSWORD_KEY]) {
      await fs.writeFile(PASSWORD_FILE, body[ADMIN_PASSWORD_KEY], "utf-8");
      delete body[ADMIN_PASSWORD_KEY];
    }

    await fs.writeFile(CONFIG_PATH, JSON.stringify(body, null, 2), "utf-8");
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to save config" }, { status: 500 });
  }
}
