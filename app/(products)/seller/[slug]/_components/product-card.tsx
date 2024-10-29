import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
}

export default function ProductCard({
  id,
  title,
  thumbnailUrl,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className="card bg-base-100 w-72 shadow-xl">
        <figure>
          <Image
            id={id}
            alt={title}
            src={thumbnailUrl}
            width={300}
            height={500}
            quality={30}
          />
        </figure>
        <div className="card-body items-center text-center">
          {/* // TODO: Add price  */}
          <h2 className="card-title">{title}</h2>
        </div>
      </div>
    </Link>
  );
}
