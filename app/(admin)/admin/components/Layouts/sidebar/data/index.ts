import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Contact",
        url: "/admin/contact",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Blogs",
        url: "/admin/blog",
        icon: Icons.Table,
        items: [
          {
            title: "View Blog",
            url: "/admin/blog",
          },
          {
            title: "Create Blog",
            url: "/admin/blog/create",
          },
          {
            title: "All categories",
            url: "/admin/categories",
          },
        ],
      },
      {
        title: "Comments",
        url: "/admin/comment",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Enquiry",
        url: "/admin/enquiry",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Home Setting",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Cate and Blogs",
            url: "/admin/cate-blogs",
          },
        ],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
      {
        title: "Profile",
        url: "/admin/profile",
        icon: Icons.User,
        items: [],
      },
    ],
  },
];
