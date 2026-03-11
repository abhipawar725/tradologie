import Image from "next/image";
import { navigation } from "@/data/navigation";
import NavItem from "./NavItem";
import ProductMegaMenu from "./ProductMegaMenu";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Image src="/logo.webp" alt="logo" width={256} height={64} priority />
          <nav>
            <ul className="flex items-center gap-6 capitalize font-medium">
               {navigation.map((item) => (
                  <NavItem key={item.label} item={item} />
               ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
