'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation'; //Added to update URL search params
import { usePathname, useRouter } from 'next/navigation'; //Added after using 'set' to update URL
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); //Added along side line 4 to update search params
  const pathname = usePathname(); // Our current pathname or URL
  const { replace } = useRouter(); // Calls the function to replace the current pathname/URL

  // function handleSearch(term: string) {
  const handleSearch = useDebouncedCallback((term) => {
      console.log(`Searching... ${term}`);
    const params = new URLSearchParams(); //Create a new instance using the searchParams variable from line 7
    params.set('page', '1') //Resets the users current page to 1 as they type in a new search query.
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`); //Replaces URL with user's input/search data
  }, 300);
    /* URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters. 
Instead of creating a complex string literal, you can use it to get the params string like ?page=1&query=a. 

Next, we use 'set' to set the params string based on the user’s input. If the input is empty, you want to delete it on lines 11-15

After writing the code to update the URL based on the search params, we add line 41 to ensure the input field is in sync with the URL and will be populated when sharing, you can pass a defaultValue to input by reading from searchParams. */

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

/* For every keystroke, our search is querying our database. This is fine for this application since it's small, but when there's a larger application with more data in the database, this can slow things down.
That's where debouncing comes in. Debouncing is a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.

How Debouncing Works:

Trigger Event: When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
Wait: If a new event occurs before the timer expires, the timer is reset.
Execution: If the timer reaches the end of its countdown, the debounced function is executed. */
