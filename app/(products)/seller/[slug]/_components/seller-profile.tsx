import Image from "next/image";
import SellerLinks from "./seller-links";

interface SellerProfileProps {
  full_name: string | null;
  bio: string | null;
  phone_number: string | null;
  avatar: string | null;
  links: string[] | null;
}

export default function SellerProfile({
  full_name,
  bio,
  phone_number,
  links,
  avatar,
}: SellerProfileProps) {
  // Should phone number be private like dubizzle?
  return (
    <div>
      <Image src={avatar!} alt="avatar image" width={200} height={200} />
      <div>
        <h2>{full_name}</h2>
        <p>{bio}</p>
        {links && <SellerLinks links={links} />}
      </div>
    </div>
  );
}
