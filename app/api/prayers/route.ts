import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const allowedColors = new Set(["#DBEAFE", "#DBFCE7", "#F3E8FF", "#FEF9C2"]);

export async function GET() {
  const { data, error } = await supabase
    .from("prayers")
    .select("id,name,message,color,created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ prayers: data ?? [] });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { name?: string; message?: string; color?: string }
    | null;

  const message = body?.message?.trim();
  const name = body?.name?.trim() || null;
  let color = body?.color?.trim()?.toUpperCase() || "#FEF9C2"; // default yellowish
  if (!color.startsWith("#")) color = `#${color}`;
  if (!allowedColors.has(color)) color = "#FEF9C2";

  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("prayers")
    .insert({ name, message, color })
    .select("id,name,message,color,created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ prayer: data }, { status: 201 });
}


