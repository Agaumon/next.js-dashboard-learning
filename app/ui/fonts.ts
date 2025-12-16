import {Inter} from 'next/font/google'
import {Lusitana} from 'next/font/google'; //Try it yourself example. Importing Lusitana and adding it to the <p> element in page.tsx

export const inter = Inter({ subsets: ['latin']});
export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400']})

// Here we are adding a custom Google font to our application. "Inter" is the primary font imported from next/font/google and "latin" is the subset you'd like to load. It is then exported from fonts.ts and imported into layout.tsx.