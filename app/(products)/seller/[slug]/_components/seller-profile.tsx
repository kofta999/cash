import Image from "next/image";
import SellerLinks from "./seller-links";

interface SellerProfileProps {
  name: string;
  bio: string | null;
  phoneNumber: string | null;
  profileUrl: string | null;
  links: string[] | null;
}

export default function SellerProfile({
  name,
  bio,
  phoneNumber,
  links,
  profileUrl,
}: SellerProfileProps) {
  // Should phone number be private like dubizzle?
  return (
    <div>
      {/* <Image /> */}
      <div>
        <h2>{name}</h2>
        <p>{bio}</p>
        {links && <SellerLinks links={links} />}
      </div>
    </div>
  );
}
