import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * GET /api/cars/[id]
 * ใช้ดึงข้อมูลรถคันเดียว
 */
export async function GET(_, { params }) {
  const { id } = params;

  const { data, error } = await supabaseAdmin
    .from("cars")
    .select("*")
    .eq("car_id", id)
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(data);
}

export async function PUT(req, { params }) {
  const { id } = await params;

  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("cars")
    .update(body)
    .eq("id", id)
    .select();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(data);
}

export async function DELETE(_, { params }) {
  const { id } = await params;

  const { error } = await supabaseAdmin.from("cars").delete().eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ success: true });
}
