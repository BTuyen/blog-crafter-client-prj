import { Home, Tag, Info, Mail } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { icon: <Home size={20} />, label: "Home", url: "/" },
  { icon: <Tag size={20} />, label: "Tags", url: "/tags" },
  { icon: <Info size={20} />, label: "About", url: "/about" },
  { icon: <Mail size={20} />, label: "Contact", url: "/contact" },
];

export default function LeftSideBar() {
  return (
    <aside className="w-60 p-4">
      <ul className="flex flex-col space-y-2 fixed">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className="p-2 hover:rounded-xl hover:bg-gray-200"
          >
            <li className="flex items-center space-x-2">
              {item.icon}
              <span>{item.label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
}
