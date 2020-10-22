// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  HomeIcon,
  LabelIcon,
  PhotoLibraryIcon,
  SettingsIcon,
  ContactMailIcon,
} from "../../material-ui/material-imports";

const sidebarmenu = [
  {
    listname: "DashBoard",
    icon: HomeIcon,
    id: 1,
    path: "/dashboard",
  },
  {
    listname: "About",
    icon: LabelIcon,
    id: 2,
    path: "/about-page",
  },
  // {
  //   listname: "Gallery",
  //   icon: PhotoLibraryIcon,
  //   id: 3,
  //   path: "/gallery-page",
  // },
  // {
  //   listname: "Settings",
  //   icon: SettingsIcon,
  //   id: 4,
  //   path: "/settings-page",
  // },
  // {
  //   listname: "Contact",
  //   icon: ContactMailIcon,
  //   id: 5,
  //   path: "/contact-page",
  // },
];

export default sidebarmenu;
