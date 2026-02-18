import { getCategory } from "@/lib/category";
import Link from "next/link";
export default async function Home() {
  const categories = await getCategory();
  const rootCategories = categories.filter((cat: any) => cat.parentId === null);
  return (
    <>
      <ul>
        {rootCategories.map((root: any) => (
          <li key={root._id}>
            {categories
              .filter((cat: any) => cat.parentId !== null && cat.parentId?._id === root._id)
              .map((child: any) => (
                <div key={child._id}>
                  <Link href={`category/${child.slug}`}>{child.name}</Link>
                </div>
              ))}
          </li>
        ))}
      </ul>
    </>
  );
}
