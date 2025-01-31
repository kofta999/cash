import prisma from "@/lib/db";
import { ProductDetails } from "@/components/product-details";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const product = await prisma.products.findUnique({
    where: { id: params.slug },
    include: {
      profiles: {
        select: {
          id: true,
          fullName: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (!product) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <h1 className="text-2xl font-semibold">
          The requested product is not found
        </h1>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
