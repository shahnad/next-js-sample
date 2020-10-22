// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import { HomeIcon, LabelIcon, PhotoLibraryIcon, SettingsIcon, ContactMailIcon } from "../../material-ui/material-imports";

// import ContactMailIcon from '@material-ui/icons/ContactMail';
const SidebarData = [
  {
    listname: "Home",
    icon: HomeIcon,
    id: 1,
    path:"/"
  },
  {
    listname: "About",
    icon: LabelIcon,
    id: 2,
    path:"/dashboard/about-page"
  },
  {
    listname: "Gallery",
    icon: PhotoLibraryIcon,
    id: 3,
    path:"/dashboard/gallery-page"
  },
  {
    listname: "Settings",
    icon: SettingsIcon,
    id: 4,
    path:"/dashboard/settings-page"
  },
  {
    listname: "Contact",
    icon:ContactMailIcon,
    id: 5,
    path:"/dashboard/contact-page"
  },
];



export default (req, res) => {
  res.statusCode = 200
  res.json(SidebarData)
}
