import { redirect } from "next/navigation";
import SellForm from "./_components/sell-form";
import { getAuth } from "@/lib/utils";

export default async function SellPage() {
  const user = await getAuth();
  if (!user) {
    redirect("/sign-in");
  }

  return <SellForm userId={user.id} />;
}
