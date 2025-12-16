'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

// We are using the <Link component to link between pages in our application. It allows us to do client-side navigation with Javascript. It's the equivalent yet more efficient version '<a href =" "' so instead we used '<Link href=" "'.
// To be specific, you use <Link when you want to preload a document that is attached to the project. <a is used to hyperlink to external pages and makes things like images and test clickable, <Link is not clickable nor is it visible on the page. See lines 34-41 and the necessary import on line 8.

export default function NavLinks() {
  const pathname = usePathname();
  //  To show an active link and indicate to the user what page they are currently on, you can use usePathname. It requires inserting 'use client' at the top of the nav-links.tsx and it checks the path of your current position. You must also import { usePathname } as seen on line 9 and then insert the code seen on line 27.
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            // The className and clsx here make it so that depending on your current page location, the text remains highlighted blue to indicate which page you are currently located on depending on usePathname.
              className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
