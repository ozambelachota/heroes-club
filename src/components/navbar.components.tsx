"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function NavbarPublic() {
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 p-3 justify-between items-center">
      <div className="mr-4">Heroes Club</div>
      <NavigationMenu className={cn("w-full h-5")}>
        <NavigationMenuList className={cn("flex gap-5 justify-center")}>
          <NavigationMenuItem>
            <Link href="/home">Home</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={"/home/curso"}>Cursos</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/home/about">Sobre nosotros</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/home/auth">Login</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
