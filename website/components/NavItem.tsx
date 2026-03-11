"use client";
import { useState } from "react";
import Link from "next/link";
import { NavItem as NavItemType } from "@/data/navigation";
import ProductMegaMenu from "./ProductMegaMenu";

type Props = {
  item: NavItemType;
};

const NavItem = ({ item }: Props) => {
  const [open, setOpen] = useState(false);
  if (item.url) {
    return (
      <li>
        <Link href={item.url}>{item.label}</Link>
      </li>
    );
  }

  return (
    <li className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className="capitalize font-medium">
        {item.label}
      </button>
      {open && item.hasChild === "mega" && <ProductMegaMenu />}

      {open && Array.isArray(item.hasChild) && (
        <ul className="absolute top-full bg-white shadow-lg rounded-lg p-4 w-52 z-10">
          {item.hasChild?.map((child: any) => (
            <li key={child.label} className="py-1">
              <Link href={child.url}>{child.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default NavItem;
