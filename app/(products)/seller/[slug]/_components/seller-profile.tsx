import Image from "next/image";
import SellerLinks from "./seller-links";

interface SellerProfileProps {
  fullName: string | null;
  bio: string | null;
  phoneNumber: string | null;
  avatar: string | null;
  links: string[] | null;
}

export default function SellerProfile({
  fullName,
  bio,
  phoneNumber,
  links,
  avatar,
}: SellerProfileProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-card rounded-xl ">
      <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden mb-6">
        <Image
          src={avatar!}
          alt={`${fullName}'s avatar`}
          fill
          className="object-cover"
          sizes="200px"
        />
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-card-foreground mb-2">
          {fullName}
        </h2>
        {bio && <p className="text-muted-foreground mb-4">{bio}</p>}
        {links && <SellerLinks links={links} />}
      </div>
    </div>
  );
}
