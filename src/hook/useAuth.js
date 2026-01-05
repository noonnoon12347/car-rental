"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function useAuth(allowedRole) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, [router, allowedRole]);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
    } else {
      const userRole = localStorage.getItem("userRole");

      if (allowedRole && userRole !== allowedRole) {
        if (userRole === "admin") {
          router.replace("/");
        } else {
          router.replace("/my-rentals");
        }
      }
    }
    setLoading(false);
  };

  return { loading };
}
