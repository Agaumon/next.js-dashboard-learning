import DashboardSkeleton from "../../ui/skeletons";

//On line 1 we have imported a dashboard skeleton or a UI placeholder that indicates to the users that the content is loading.
//On line 8 is where we actually return said UI placeholder onto the page prior to the rest of the content loading.

export default function Loading() {
    // return <div>Loading...</div>; Intially returned the phrase "Loading..."
    return <DashboardSkeleton />;
}

/* We've created this page to improve the user experience when there are slow data requests.
We will use streaming to perform this. 

Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.
By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.

There are two ways you implement streaming in Next.js:

1. At the page level, with the loading.tsx file (which creates <Suspense> for you).
2. At the component level, with <Suspense> for more granular control.

By creating this page, we have:
1. loading.tsx is a special Next.js file built on top of React Suspense. It allows you to create fallback UI to show as a replacement while page content loads.
2. Since <SideNav> is static, it's shown immediately. The user can interact with <SideNav> while the dynamic content is loading.
3. The user doesn't have to wait for the page to finish loading before navigating away (this is called interruptable navigation).

Prior to creating and implementing this file, the entire website would load longer than it's usual time (from 2.3 secs to 3.3 - 4 secs) before the inclusion of Lines 32 and 33 in app/lib/data.ts

The skeleton is also being applied to other pages, /invoices/page.tsx and /customers/page.tsx, because it's a level higher than both of those pages.
To fix this, we can use Route Groups by creating a folder in app/dashboard and moving our loading.tsx and page.tsx files into that folder.
After doing so, the loading.tsx file should only affect our dashboard page.

Route groups allow you to organize files into logical groups without affecting the URL path structure. When you create a new folder using parentheses (), the name won't be included in the URL path. So /dashboard/(overview)/page.tsx becomes /dashboard. 

So far, we are streaming the entire page, but we can also stream specific components of the page using React Suspense.
Suspense allows you to defer rendering parts of your application until some condition is met (e.g. data is loaded). You can wrap your dynamic components in Suspense. Then, pass it a fallback component to show while the dynamic component loads.

fetchRevenue() is the data request that is slowing everything else down. We can use Suspense so that instead of blocking the whole page, we stream only this component and show the rest of the page's UI.*/