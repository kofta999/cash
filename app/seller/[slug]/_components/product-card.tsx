import Image from "next/image";

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
    <div>
      <Image id={id} alt={title} src={thumbnailUrl} width={100} height={200} />
      <h5>{title}</h5>
    </div>
  );
}
