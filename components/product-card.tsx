import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  id: string;
  title: string;
  thumbnailUrl?: string;
}

export default function ProductCard({
  id,
  title,
  thumbnailUrl,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className=" bg-base-100 w-72 h-96 m-5 shadow-xl">
        <figure>
          <Image
            id={id}
            alt={title}
            src={
              thumbnailUrl ||
              "https://foremanbrosinc.com/wp-content/uploads/2017/05/1c0d0f0cb8b7f2fb2685da9798efe42b_big-image-png-image-placeholder-clipart_2400-2400-300x300.png"
            }
            width={300}
            height={500}
      
            quality={30}
            priority
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
