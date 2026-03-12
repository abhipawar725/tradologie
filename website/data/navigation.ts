type BaseNavItem = {
  label: string;
}

type NavChild = {
  label: string;
  url: string;
};

export type NavItem = | (BaseNavItem & { url: string }) | (BaseNavItem & { hasChild: NavChild[] }) | (BaseNavItem & { mega : true })

export const navigation: NavItem[] = [
  {
    label: "product",
    mega: true,
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
