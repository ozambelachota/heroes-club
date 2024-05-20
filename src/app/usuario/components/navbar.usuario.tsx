"use client";
import useUser from "@/app/hook/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { createClient } from "@/lib/client";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as React from "react";

export function NavbarUsuario() {
  const { data, isFetching } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    queryClient.clear();
    router.refresh();
  };

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 p-3 justify-between items-center">
      <div className="mr-4">Heroes Club</div>
      <NavigationMenu className={cn("w-full h-5")}>
        <NavigationMenuList className={cn("flex gap-5 justify-center")}>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Inicio</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-full flex flex-col p-4 gap-2">
                <ListItem href="/usuario/curso">
                  Explora tus cursos aquí.
                </ListItem>
                <ListItem href="/usuario/horario">
                  Revisa tu horario de clases.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Avatar>
                <AvatarImage src={data?.image_url as string} alt="@shadcn" />
                <AvatarFallback>{data?.display_name}</AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <Button variant={"outline"} onClick={() => handleLogout()}>
                Cerrar sesión
              </Button>
            </NavigationMenuContent>
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
