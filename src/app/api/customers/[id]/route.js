import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(_, { params }) {
  // ใน Next.js 15 ต้อง await params ด้วยนะครับ
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("user_id", id) // ใช้ user_id ที่เชื่อมกับ Auth เป็นตัวกรอง
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data);
}
