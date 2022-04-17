import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { FC } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Snackbar from '@common/components/Snackbar';
import { useSnackbar } from '@common/components/Snackbar';
import clsx from 'clsx';
import menus from './menus';

type Props = {};

const Layout: FC<Props> = ({ children }) => {
  const { items } = useSnackbar();

  return (
    <div className="container">
      <Popover className="relative bg-white">
        <div className="mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start">
              <Link href="/">
                <a className="text-4xl">🦄</a>
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                <span className="sr-only">Open menu</span>
                <FontAwesomeIcon icon={['fas', 'bars']} className="text-2xl" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              {menus.map((menu) => {
                return (
                  <Popover className="relative" key={menu.name}>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={clsx(
                            open ? 'text-gray-900' : 'text-gray-500',
                            'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none'
                          )}
                        >
                          <span>
                            {menu.icon} {menu.name}{' '}
                            <FontAwesomeIcon icon={['fas', 'chevron-down']} />
                          </span>
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                {menu.children?.map((item) => (
                                  <Link key={item.name} href={item.href}>
                                    <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                      <div className="ml-4">
                                        <p className="text-base font-medium text-gray-900">
                                          {item.icon} {item.name}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {item.description}
                                        </p>
                                      </div>
                                    </a>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                );
              })}

              <a
                href="https://github.com/barros001/wave-portal"
                target="_blank"
                rel="noreferrer"
                title="Fork me on Github!"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                <FontAwesomeIcon icon={['fab', 'github']} />
              </a>
            </Popover.Group>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Link href="/">
                      <a className="text-4xl">🦄</a>
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                      <span className="sr-only">Close menu</span>
                      <FontAwesomeIcon
                        icon={['fas', 'xmark']}
                        className="text-2xl px-1"
                      />
                    </Popover.Button>
                  </div>
                </div>
                <div className="">
                  <nav className="grid gap-y-4 divide-y">
                    {menus.map((menu) => {
                      return (
                        <div key={menu.name} className="pt-4">
                          <p className="font-bold mb-2">{menu.name}</p>
                          {menu.children?.map((item) => {
                            return (
                              <a
                                key={item.name}
                                href={item.href}
                                className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                              >
                                <span className="ml-3 text-base font-medium text-gray-900">
                                  {item.icon} {item.name}
                                  <br />
                                  <span className="mt-1 text-sm text-gray-500">
                                    {item.description}
                                  </span>
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <div className="container pt-10 px-4">{children}</div>
      <Snackbar items={items} />
    </div>
  );
};

export default Layout;
