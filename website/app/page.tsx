import { getCategory } from "@/lib/category";
import Link from "next/link";
export default async function Home() {
  const categories = await getCategory();
  console.log(categories);
  return (
    <>
      <ul>
        {categories
          .filter((cat: any) => cat.parentId !== null)
          .map((cat: any) => (
            <div key={cat._id}>
              <Link href={`category/${cat.slug}`}>{cat.name}</Link>
            </div>
          ))}
      </ul>
    </>
  );
}
