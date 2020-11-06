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
    as:'/dashboard'
  },
  {
    listname: "User Management",
    icon: LabelIcon,
    id: 2,
    path: "/user-management/users",
    as:'/users'
  },
  {
    listname: "Posts",
    icon: PhotoLibraryIcon,
    id: 3,
    path: "/posts/post-list",
    as:'/posts'
  },
  {
    listname: "Category",
    icon: SettingsIcon,
    id: 4,
    path: "/category/category-list",
    as:'/category'
  },
  {
    listname: "Types",
    icon: ContactMailIcon,
    id: 5,
    path: "/types/type-list",
    as:"/types"
  },
  {
    listname: "Cart items",
    icon: ContactMailIcon,
    id: 6,
    path: "/services/service-list",
    as:"/services"
  },
];

export default sidebarmenu;
