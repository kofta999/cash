import { getAuth } from "@/lib/utils";
import { notFound } from "next/navigation";
import ProfileEditForm from "./_components/edit-profile-form";
import prisma from "@/lib/db";

export default async function Page() {
  const { id } = await getAuth();
  const userProfile = await prisma.profiles.findUnique({
    where: { id },
  });

  if (userProfile == null) {
    notFound();
  }

  const { profile_url, ...profile } = userProfile;

  return <ProfileEditForm initialData={profile} />;
}
