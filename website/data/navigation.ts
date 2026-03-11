type NavChild = {
  label: string;
  url: string;
};

export type NavItem = {
  label: string;
  url?: string;
  hasChild?: NavChild[] | string;
};

export const navigation: NavItem[] = [
  {
    label: "product",
    hasChild: "mega",
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
