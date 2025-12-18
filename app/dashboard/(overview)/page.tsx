// import { Card } from '@/app/ui/dashboard/cards'; //We've deleted all card components and are creating a card wrapper function
import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
// import { fetchLatestInvoices, fetchRevenue, fetchCardData } from '../../lib/data'; //As mentioned in loading.tsx, we will be streaming each function on line 5. 
import { Suspense } from 'react'; //We are now importing Suspense
import { RevenueChartSkeleton } from '@/app/ui/skeletons'; //and we are importing the revenue skeleton
import { LatestInvoicesSkeleton } from '@/app/ui/skeletons'; //Try it yourself: Doing what I did to RevenueChart. Removing fetchLatestInvoices from line 5 and changing the instances of fetchLatestInvoices on the necessary files.
import { CardsSkeleton } from '@/app/ui/skeletons';

// Here we imported fetchRevenue function on Line 5 to fetch the data for the chart in app/ui/dashboard/revenue-chart.tsx
// We've also uncommented out the RevenueChart component and inserted the await under the async function to fetch the data.
// We are also fetching the fetchLatestInvoices function from the same location as the fetchRevenue. Using this function, we are fetching the last 5 invoices instead of having to sort though the latest invoices in-memory.
//Don't forget to create an await for the invoices as well under the same async function and uncomment the LatestInvoices component and it's relevant code located in /app/ui/dashboard/latest-invoices.
//We did the same thing with "fetchCardData" as the other two.

// SQL is more efficient because you can fetch only the data you need instead of having to go through the data using Javascript and manipulating the data one by one using methods such as "array.length". It may be longer than using "array.length", but it means less data needing to be transferred during the request.

/* Here's the difference between SQL and manually using Javascript:
Javascript
const totalInvoices = allInvoices.length;
const totalCustomers = allCustomers.length;
This takes the total number of invoices and customers

SQL
const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
This takes ONLY the data you NEED from the number of invoices and customers.
*/

export default async function Page() {
    // const revenue = await fetchRevenue(); //Removed for Suspense
    // const latestInvoices = await fetchLatestInvoices(); //Removed for "Try it yourself" Suspense
    // const {numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices}= await fetchCardData();
    /* On Line 30 is where it gets a bit confusing. Lines 41, 42, 43, and 44-48 each require
    specific data from data.ts so we have to specify the data we need when we create the const.
    Notice that each data is still just coming from the same "fetchCardData", we're just scoping or selecting
    the data we need. */
return (
<main>
    <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
    Dashboard
    </h1>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
    </Suspense>
    {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
    <Card title="Pending" value={totalPendingInvoices} type="pending" />
    <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
    <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
    /> */}
    {/* However... there are two things you need to be aware of:
1. The data requests are unintentionally blocking each other, creating a request waterfall.
2. By default, Next.js prerenders routes to improve performance, this is called Static Rendering. So if your data changes, it won't be reflected in your dashboard.

A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.
It's not necessarily bad especially in the cases where you want a condition to be met before you make the next request.

A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.

In JavaScript, you can use the Promise.all() or Promise.allSettled() functions to initiate all promises at the same time. For example, in data.ts, we're using Promise.all() in the fetchCardData() function:

const data = await Promise.all([
    invoiceCountPromise,
    customerCountPromise,
    invoiceStatusPromise,
]); 

By using this pattern, you can:

-Start executing all data fetches at the same time, which is faster than waiting for each request to complete in a waterfall.
-Use a native JavaScript pattern that can be applied to any library or framework.
-There is one disadvantage: what happens if one data request is slower than all the others? */}
    </div>
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
    <Suspense fallback={<RevenueChartSkeleton />}>
    <RevenueChart />
    </Suspense>
    <Suspense fallback={<LatestInvoicesSkeleton />}>
    <LatestInvoices />
    </Suspense>
    {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
    </div>
</main>
);
}