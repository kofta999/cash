import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SellForm from "./_components/sell-form";

export default async function SellPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <SellForm userId={user.id} />;
}
