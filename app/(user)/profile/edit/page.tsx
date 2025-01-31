import { getAuth } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";
import ProfileEditForm from "./_components/edit-profile-form";
import prisma from "@/lib/db";

export default async function Page() {
  const maybeUser = await getAuth();
  if (!maybeUser) {
    redirect("/sign-in");
  }

  const { id } = maybeUser;
  const userProfile = await prisma.profiles.findUnique({
    where: { id },
  });

  if (userProfile == null) {
    notFound();
  }

  const { profileUrl, ...profile } = userProfile;

  return <ProfileEditForm initialData={profile} />;
}
