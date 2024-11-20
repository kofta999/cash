import { placeHolderImageUrl } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  thumbnailUrl?: string;
}

export default function ProductCard({
  id,
  title,
  thumbnailUrl,
  price,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className=" bg-base-100 w-72 h-96 m-5 shadow-xl">
        <figure>
          <Image
            id={id}
            alt={title}
            src={thumbnailUrl || placeHolderImageUrl}
            width={300}
            height={500}
      
            quality={30}
            priority
          />
        </figure>
<<<<<<< HEAD
       <div className="card-body items-center text-center">
          {/* // TODO: Add price  */}
=======
        <div className="card-body items-center text-center">
>>>>>>> b42420b3f5380a1a1376cb4a80666c5cf3495d63
          <h2 className="card-title">{title}</h2>
          <h4 className="text-left">EGP {price}</h4>
        </div>
      </div>
    </Link>
  );
}
