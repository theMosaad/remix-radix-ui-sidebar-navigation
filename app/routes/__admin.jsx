import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  CardStackIcon,
  ChevronDownIcon,
  GearIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { NavLink, Outlet, useLocation } from "@remix-run/react";
import clsx from "clsx";
import * as React from "react";

const menuItems = [
  {
    title: "Home",
    Icon: HomeIcon,
    path: "/",
  },
  {
    title: "Books",
    Icon: CardStackIcon,
    path: "/books",
    children: [
      {
        title: "All books",
        path: "/books",
      },
      {
        title: "Book 1",
        path: "/books/book-1",
      },
      {
        title: "Book 2",
        path: "/books/book-2",
      },
    ],
  },
  {
    title: "Settings",
    Icon: GearIcon,
    path: "/settings",
    children: [
      {
        title: "All settings",
        path: "/settings",
      },
      {
        title: "User",
        path: "/settings/user",
      },
    ],
  },
];

export default function Admin() {
  const location = useLocation();

  const [activeMenuItems, setActiveMenuItems] = React.useState(() => {
    const activeMenuItems = [];
    menuItems.forEach((menuItem) => {
      if (menuItem.path === location.pathname) {
        activeMenuItems.push(menuItem.path);
      }

      if (menuItem.children) {
        menuItem.children.forEach((child) => {
          if (child.path === location.pathname) {
            activeMenuItems.push(menuItem.path);
          }
        });
      }
    });
    return activeMenuItems;
  });

  React.useEffect(() => {
    menuItems.forEach((menuItem) => {
      if (menuItem.path === location.pathname) {
        setActiveMenuItems([menuItem.path]);
      }

      if (menuItem.children) {
        menuItem.children.forEach((child) => {
          if (child.path === location.pathname) {
            setActiveMenuItems([menuItem.path]);
          }
        });
      }
    });
  }, [location]);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="fixed bottom-0 left-0 top-0 hidden w-60 overflow-y-auto border-r border-gray-6 bg-gray-1 lg:block">
        <div className="p-6">
          <div>
            <AccordionPrimitive.Root
              onValueChange={setActiveMenuItems}
              type="multiple"
              value={activeMenuItems}
            >
              <ul className="flex w-full flex-col gap-1">
                {menuItems.map(({ title, Icon, path, children }) =>
                  children ? (
                    <AccordionPrimitive.Item
                      key={path}
                      asChild
                      className={clsx(
                        "-mx-3 rounded px-3",
                        path === location.pathname ||
                          children.some(
                            (child) => child.path === location.pathname
                          )
                          ? "bg-primary-4"
                          : ""
                      )}
                      value={path}
                    >
                      <li>
                        <AccordionPrimitive.Header asChild>
                          <span className="relative block">
                            <NavLink
                              key={path}
                              className={({ isActive }) =>
                                clsx(
                                  "-mx-3 flex min-h-9 flex-grow items-center gap-3 rounded px-3",
                                  isActive
                                    ? "bg-primary-4 text-primary-11"
                                    : "text-primary-12 hover:bg-primary-4 active:bg-primary-5"
                                )
                              }
                              end
                              prefetch="intent"
                              to={path}
                            >
                              <Icon aria-hidden />
                              <span className="block text-sm tabular-nums leading-none">
                                {title}
                              </span>
                            </NavLink>
                            <AccordionPrimitive.Trigger
                              aria-label={`Toggle submenu of ${title}`}
                              className="absolute top-0 right-0 -mr-3 flex h-9 w-9 items-center justify-center rounded hover:bg-primary-4 active:bg-primary-5"
                            >
                              <ChevronDownIcon
                                aria-hidden
                                className={clsx(
                                  activeMenuItems.some(
                                    (menuItemPath) => menuItemPath === path
                                  )
                                    ? "-rotate-180 ease-out motion-safe:duration-100"
                                    : "rotate-0 ease-in motion-safe:duration-75"
                                )}
                              />
                            </AccordionPrimitive.Trigger>
                          </span>
                        </AccordionPrimitive.Header>
                        <AccordionPrimitive.Content asChild>
                          <ul
                            className={clsx(
                              "py-2",
                              mounted &&
                                activeMenuItems.some(
                                  (menuItemPath) => menuItemPath === path
                                )
                                ? "motion-safe:animate-accordion-open"
                                : "motion-safe:animate-accordion-close"
                            )}
                          >
                            {children.map(({ title, path }) => (
                              <li key={path}>
                                <NavLink
                                  key={path}
                                  className={({ isActive }) =>
                                    clsx(
                                      "ml-4 flex min-h-9 flex-grow items-center gap-3 rounded px-3",
                                      isActive
                                        ? "bg-primary-4 text-primary-11"
                                        : "text-primary-12 hover:bg-primary-4 active:bg-primary-5"
                                    )
                                  }
                                  end
                                  prefetch="intent"
                                  to={path}
                                >
                                  <span className="block text-sm tabular-nums leading-none">
                                    {title}
                                  </span>
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </AccordionPrimitive.Content>
                      </li>
                    </AccordionPrimitive.Item>
                  ) : (
                    <li key={path}>
                      <NavLink
                        key={path}
                        className={({ isActive }) =>
                          clsx(
                            "-mx-3 flex min-h-9 flex-grow items-center gap-3 rounded px-3",
                            isActive
                              ? "bg-primary-4 text-primary-11"
                              : "text-primary-12 hover:bg-primary-4 active:bg-primary-5"
                          )
                        }
                        end
                        prefetch="intent"
                        to={path}
                      >
                        <Icon aria-hidden />
                        <span className="block text-sm tabular-nums leading-none">
                          {title}
                        </span>
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </AccordionPrimitive.Root>
          </div>
        </div>
      </div>
      <div className="lg:pl-60">
        <div className="py-6 px-6 lg:px-9">
          <Outlet />
        </div>
      </div>
    </>
  );
}
