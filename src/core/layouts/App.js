import { useRouter } from "next/router";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";

// List of pages where the navbar should be hidden
const hideNavbarPages= ['/success', '/login']

export default function AppLayout({children}) {
    // Using Next.js router to get the current route
    const router= useRouter()

    // Determining whether the navbar should be hidden based on the current route
    const hideNavbar = hideNavbarPages.includes(router.asPath)
    
    //Conditionally render the Navbar component if it's not a page where the navbar should be hidden
    return (
        <>
        <Meta/>
        {hideNavbar ? null: <Navbar/>}
        {children}
        </>
    )
}
