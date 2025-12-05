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
  console.log("body", body);
  const { data, error } = await supabaseAdmin
    .from("cars")
    .update({
      car_reg_no: body.car_reg_no,
      car_make: body.car_make,
      car_model: body.car_model,
      rent_fee: body.car_rent_fee,
      availability: body.car_availability_status,
      img_url: body.img_url,
      img_path: body.img_path,
    })
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
