import { supabaseAdmin } from "@/lib/supabase-admin";

export async function PUT(req, { params }) {
  const { id } = await params;

  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("car_rentals")
    .update({
      return_date: body.actual_return_date,
      days_elapsed: body.days_elapsed,
      fine_amount: body.fine_amount,
      final_total_amount: body.total_amount_after_fine,
      rental_status: body.rental_status,
    })
    .eq("rental_id", id)
    .select();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data);
}
