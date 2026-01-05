import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(_, { params }) {
  const { id } = await params;

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
        car_reg_no,
        img_url
      ),
      customers (
        id,
        customer_id,
        customer_name,
        img_url
      )
    `
    )
    .eq("customer_id", id) // กรองเฉพาะรายการที่ customer_id (int) ตรงกับที่ส่งมา
    .order("rental_id", { ascending: false }); // เอาอันล่าสุดขึ้นก่อน

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data);
}
