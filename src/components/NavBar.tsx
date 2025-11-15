//Tailwindcss navbar almost out the box. NavLink prop used to maintain state when routing between views
import React, { Fragment } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuItem, MenuItems, MenuButton, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon, HomeIcon, ChartPieIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import DarkModeButton from "./button/DarkModeButton";
import classNames from "../helpers/classNames";
import { type NavLinkProps } from "react-router-dom";
import type { NavItem } from "../features/navigation/nav.types";

type NavProps = {
  navItems: NavItem[]
  isLoggedIn: boolean
  NavLink: React.ElementType
  handleOnClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

type ComponentIcon = {
  [key: string]: React.ElementType
}

const components: ComponentIcon = {
  HomeIcon,
  ChartPieIcon
}

const NavbarUI = ({navItems, isLoggedIn, NavLink, handleOnClick}: NavProps) => {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo + Links */}
              <div className="flex flex-1 items-center justify-center sm:justify-start">
                
                {isLoggedIn && <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navItems.map((item: NavItem) => {
                      const Component = components[item.name]

                      if(!Component) return null

                      return (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }: { isActive: boolean }) =>
                          classNames(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-white/5 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )
                        }
                      >
                        <Component className="w-6 h-6"/>
                      </NavLink>)
                    })}
                  </div>
                </div>}
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto">
                <DarkModeButton />
                {isLoggedIn && <>
                  <button
                    type="button"
                    className="relative rounded-full p-1 text-gray-400 hover:text-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="hover:cursor-pointer h-6 w-6" aria-hidden="true" />
                  </button>
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="hover:cursor-pointer relative flex rounded-full">
                    <UserCircleIcon className="w-6 h-6"/>
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      {["Profile","Sign out"].map((label) => (
                        <MenuItem key={label}>
                          {({ active }) => (
                            <a
                              onClick={handleOnClick}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "hover:cursor-pointer block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {label}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>
                </>
                }
              </div>
              {/* Right-side buttons */}
              
            </div>
          </div>

          {/* Mobile dropdown */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navItems.map((item) => {
                return <DisclosureButton
                  key={`mobile_${item.name}`}
                  /* fixes typescript error where property "to" doesnt exist in NavLink */
                  as={(props: NavLinkProps) => <NavLink {...props}/>}
                  to={item.href}
                  className={({ isActive }: { isActive: boolean }) =>
                    classNames(
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )
                  }
                >
                  {item.title}
                </DisclosureButton>
              })}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

export default NavbarUI
