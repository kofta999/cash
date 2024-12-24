import SellForm from "./_components/sell-form";
import { getAuth } from "@/lib/utils";

export default async function SellPage() {
  const user = await getAuth();

  return <SellForm userId={user.id} />;
}
