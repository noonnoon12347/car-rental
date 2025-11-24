import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(req) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("car_rentals")
    .insert([
      {
        car_id: body.car_id,
        customer_id: body.customer_id,
        rental_daily_fee: body.rental_fee,
        rental_start_date: body.rental_date,
        rental_due_date: body.due_date,
        rental_total_amount: body.total_amount,
      },
    ])
    .select();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data);
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("car_rentals")
    .select(
      `
      rental_id,
      rental_start_date,
      rental_due_date,
      rental_daily_fee,
      rental_total_amount,
      rental_status,
      days_elapsed,
      fine_amount,
      cars (
        id,
        car_reg_no
      ),
      customers (
        id,
        customer_id,
        customer_name
      )
    `
    )
    .order("rental_id", { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data);
}
