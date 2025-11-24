import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(req) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("cars")
    .insert([
      {
        car_reg_no: body.car_reg_no,
        car_make: body.car_make,
        car_model: body.car_model,
        rent_fee: body.car_rent_fee,
        availability: body.car_availability_status,
      },
    ])
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("cars")
    .select("*")
    .order("car_reg_no");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
