import { getCategory } from "@/lib/category";
import Link from "next/link";
import Image from "next/image";

const url = process.env.NEXT_PUBLIC_BASE_URL
console.log(url)

export const revalidate = 300;

const Page = async () => {
  let category: any[] = [];

  try {
    category = await getCategory();
  } catch (error) {
    console.log(error);
  }

  const rootCategories = category.filter(
    (cat: any) => cat.parentId === null
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {rootCategories.map((cat: any) => (
        <div
          key={cat._id}
          className="flex flex-col rounded-xl shadow-md p-4"
        >
          <div className="relative w-full h-40 mb-4">
            {cat.image && (
            <Link href={`/category/${cat.slug}`}>
              <Image
                src={`${url}/uploads/${cat.image}`}
                alt={cat.name}
                width={200}
                height={50}
                className="object-cover rounded-xl"
              />
            </Link>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <Link href={`/category/${cat.slug}`}>
              <h3 className="text-lg font-medium text-primary">
                {cat.name}
              </h3>
            </Link>

            <p className="text-sm text-gray-600">
              {cat.description || "Explore products in this category."}
            </p>

            <Link
              href={`/category/${cat.slug}`}
              className="inline-flex items-center gap-2 text-sm text-orange-600 font-medium"
            >
              Explore more →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;