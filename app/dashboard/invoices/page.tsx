// export default function Page() { //Original existing code
//     return <p>Invoices Page</p>;
// }

import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';

// export default async function Page() { //Original code
export default async function Page(props: { //Replaced original code on line 13 to update the table component to reflect the search query.
//Page components accept a prop called "searchParams", so you can pass the current URL params to the <Table> component. Lines 16-23
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchInvoicesPages(query); //Passes the query from searchParams. For example, if there are 12 invoices that match the search query, each page will display 6 invoices per page.
return (
<div className="w-full">
    <div className="flex w-full items-center justify-between">
    <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
    </div>
    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
    <Search placeholder="Search invoices..." />
    <CreateInvoice />
    </div>
    {/* Lines 45-47 were uncommented to work with searchParams prop from lines 16-23
        After all these changes, If you search for a term, you'll update the URL, which will send a new request to the server, data will be fetched on the server, and only the invoices that match your query will be returned.
        
        When to use the useSearchParams() hook vs. the searchParams prop?

You might have noticed you used two different ways to extract search params. Whether you use one or the other depends on whether you're working on the client or the server.

- <Search> is a Client Component, so you used the useSearchParams() hook to access the params from the client.
- <Table> is a Server Component that fetches its own data, so you can pass the searchParams prop from the page to the component.

As a general rule, if you want to read the params from the client, use the useSearchParams() hook as this avoids having to go back to the server.*/}

    <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
    <Table query={query} currentPage={currentPage} />
    </Suspense>
    <div className="mt-5 flex w-full justify-center">
    <Pagination totalPages={totalPages} /> {/*Here we are passing the totalPages prop to the Pagination component.*/}
    </div>
</div>
);
}

/* 
1. <Search/> allows users to search for specific invoices.
2. <Pagination/> allows users to navigate between pages of invoices.
3. <Table/> displays the invoices.

Your search functionality will span the client and the server. 
When a user searches for an invoice on the client, the URL params will be updated, data will be fetched on the server, and the table will re-render on the server with the new data.

There are a couple of benefits of implementing search with URL params:

- Bookmarkable and shareable URLs: Since the search parameters are in the URL, users can bookmark the current state of the application, including their search queries and filters, for future reference or sharing.
- Server-side rendering: URL parameters can be directly consumed on the server to render the initial state, making it easier to handle server rendering.
- Analytics and tracking: Having search queries and filters directly in the URL makes it easier to track user behavior without requiring additional client-side logic.

These are the Next.js client hooks that you'll use to implement the search functionality:

- useSearchParams- Allows you to access the parameters of the current URL. For example, the search params for this URL /dashboard/invoices?page=1&query=pending would look like this: {page: '1', query: 'pending'}.
- usePathname - Lets you read the current URL's pathname. For example, for the route /dashboard/invoices, usePathname would return '/dashboard/invoices'.
- useRouter - Enables navigation between routes within client components programmatically. There are multiple methods you can use.

Here's a quick overview of the implementation steps:

1. Capture the user's input. By using the logic on lines 6-8 and 17-19 in app/ui/search.tsx. This captures the user's input from the search bar on the Invoices page.
2. Update the URL with the search params.
3. Keep the URL in sync with the input field.
4. Update the table to reflect the search query.*/