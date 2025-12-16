import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        
        {/* There are 3 different ways to style your elements:
        1. Using Tailwind by adding a "className" + changes to that element. For example, the className on lines 22-24 create a black triangle.
        2. CSS Modules allow you to scope CSS to a component by automatically creating unique class names. You can see this in action on home.module.css and how it's imported onto page.tsx on line 4, then implemented on line 21 to create the same shape as before.
        3. Finally, there may be cases where you need to conditionally style an element based on state or some other condition: that's where clsx comes in. Say you want to create an "InvoiceStatus" component which accepts "status" and the status can be "pending" or "paid". You can use clsx, as shown on lines 9-12 in status.tsx.*/}

          <div className={styles.shape}></div>
          <div
  // className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
/>
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
          {/* Line 25, specifically "${lusitana.className}" is the new styling code added to affect the <p> element through the use of fonts.ts */}
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Here we will add an image using <Image> instead of HTML's <img>. Here are the differences between both.
            With <img> you have to:
            -Ensure your image is responsive on different screen sizes.
            -Specify image sizes for different devices.
            -Prevent layout shift as the images load.
            -Lazy load images that are outside the user's viewport.
            
            With Image, it comes with automatic image optimization such as:
            -Preventing layout shift automatically when images are loading.
            -Resizing images to avoid shipping large images to devices with a smaller viewport.
            -Lazy loading images by default (images load as they enter the viewport).
            -Serving images in modern formats, like WebP and AVIF, when the browser supports it.
            */}
            {/* Add Hero Image(s) Here that were imported on line 6 from the public folder*/}
                <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
                <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="hidden md:hidden"
        alt="Screenshots of the dashboard project showing mobile version"
      />
      {/* The 'className="hidden md:block"' shows the image only on desktop screens. The 'className="hidden md: hidden"' makes it so that the image is only visible on mobile screens */}
        </div>
      </div>
    </main>
  );
}
