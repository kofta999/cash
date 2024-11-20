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
      <div className="bg-base-100 w-72 h-96 m-5 shadow-xl">
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
          <h2 className="card-title">{title}</h2>
          <h4 className="text-left">EGP {price}</h4>
=======
        <div className="card-body items-center text-center">
          {/* // TODO: Add price  */}
          <div className="card-body items-center text-center">
            <h2 className="card-title">{title}</h2>
            <h4 className="text-left">EGP {price}</h4>
          </div>
>>>>>>> 8121ee01dd8e82f5e6586472226a55d5fcff21b7
        </div>
      </div>
    </Link>
  );
}
