import BuildingLibraryIcon from "@heroicons/react/24/solid/BuildingLibraryIcon";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import ComputerDesktopIcon from "@heroicons/react/24/solid/ComputerDesktopIcon";
import ClipboardDocumentCheckIcon from "@heroicons/react/24/solid/ClipboardDocumentCheckIcon";
import ShoppingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon";

import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Tổng Quan",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Khách hàng",
    path: "/customers",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Tài Khoản",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Thương Hiệu",
    path: "/brand",
    icon: (
      <SvgIcon fontSize="small">
        <BuildingLibraryIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Danh Mục",
    path: "/category",
    icon: (
      <SvgIcon fontSize="small">
        <Bars3Icon />
      </SvgIcon>
    ),
  },
  {
    title: "Sản phẩm",
    path: "/product",
    icon: (
      <SvgIcon fontSize="small">
        <ComputerDesktopIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Shipping",
    path: "/shipping",
    icon: (
      <SvgIcon fontSize="small">
        <ClipboardDocumentCheckIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Đơn Hàng",
    path: "/order",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingCartIcon />
      </SvgIcon>
    ),
  },
];
