import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("customers")
    .insert([
      {
        customer_id: body.customer_id,
        customer_name: body.customer_name,
        customer_address: body.customer_address,
        customer_mobile: body.customer_mobile,
      },
    ])
    .select();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(data);
}
