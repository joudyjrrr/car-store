import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RiCoinsLine, RiHome2Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { IconType } from "react-icons/lib";
import { ReactNode } from "react";
import { SettingsIcons } from "@/assets/svgs";
import home from "../assets/svgs/home-2.svg"
import pos from "../assets/svgs/shopping-cart.svg"
import Order from "../assets/svgs/Purchase Order.svg"
import product from "../assets/svgs/product.svg"



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type NavigationProjectProps = {
  title?: string;
  icon?: ReactNode;
  path: string;
  list?: any;
  titleLink?: string;
  query?: string;
};

 export  const NavigationProjects : NavigationProjectProps[]  = [
  {
    titleLink: "الصفحة الرئيسية",
    icon: <img src={home}  className="me-4 w-6" />,
    path: "/",
    query: "",
  },
  {
    titleLink: "البيع السريع",
    icon: <img  src={pos} className="me-4 w-6" />,
    path: "/pos",
    query: "",
  },
  {
    titleLink: "الطبيات",
    icon: <img  src={Order} className="me-4 w-6" />,
    path: "/order",
    query: "",
  },
  {
    titleLink: "المنتجات",
    icon: <img  src={product} className="me-4 w-6" />,
    path: "/product",
    query: "",
  },
];
