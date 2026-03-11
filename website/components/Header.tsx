"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type NavChild = {
  label: string;
  url: string;
}

type NavItem = {
  label: string;
  url?: string;
  hasChild?: NavChild[];
}

  const navigation: NavItem[] = [
    {
      label: "product",
      hasChild: [
        {
          label: "agri commodities",
          url: "/agri-commodities",
        },
        {
          label: "construction materials",
          url: "/construction-materials",
        },
        {
          label: "raw materials",
          url: "/raw-materials",
        },
        {
          label: "industialsitems",
          url: "/industials-items",
        },
      ],
    },
    {
      label: "media",
      hasChild: [
        {
          label: "blogs",
          url: "/blogs",
        },
        {
          label: "gallery",
          url: "/gallery",
        },
        {
          label: "videos",
          url: "/videos",
        },
      ],
    },
    {
      label: "about us",
      url: "/about-us",
    },
    {
      label: "contact us",
      url: "/contact-us",
    },
  ];

const Header = () => {
  const [open, setOpen] = useState(false)
  const [label, setLable] = useState('')

  const menuToggle = (name : any) => { 
   setLable(name)
   setOpen(prev => !prev)
  }

  return (
    <header>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Image src="/logo.webp" alt="logo" width={256} height={64} />
          <nav>
            <ul className="flex items-center gap-6 capitalize font-medium">
              {navigation?.map((item) => (
                <li key={item.label} className="relative">
                  {item.url && (
                   <Link href={item.url}>{item.label}</Link>
                  )}
                  <button onClick={() => menuToggle(`${item.label}`)} className="capitalize font-medium">{item.label}</button>
                  {label === item.label && open &&(
                  <ul className="bg-white p-4 rounded-xl shadow-md absolute z-10">
                    {item.hasChild &&
                      item.hasChild.map((subItem) => (
                        <li key={subItem.label}>
                          <Link href={subItem.url}>{subItem.label}</Link>
                        </li>
                      ))}
                  </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
