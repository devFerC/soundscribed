import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import Logo from "src/core/components/Logo";
import { SITE_URL } from "../utils";

export default function Navbar() {
    // Using Supabase's useSession hook to get the current user's session information
    const session = useSession ();

    // Using Supabase's useSupabaseClient hook to get the current client instance for Supabase
    const supabaseClient = useSupabaseClient();

    function signOut() {
        // Function to handle signing out; it calls the signOut method from Supabase client
        supabaseClient.auth.signOut()
    };

    // Function to handle billing management; it fetches the billing management URL and redirects to it
    async function onManageBilling() {
        const response = await fetch (`${SITE_URL}/api/manage-billing`);
        const data = await response.json();
        if (data) {
            window.location.href = data.url;
        }
    }

    // Return the JSX for rendering the navbar
    return (
        <div className="nav-container border-b-2 border-black">
            <Link href="/">
                <Logo/>
            </Link>
            {/* If the user is logged in, display the products, billing, and sign-out options */}
            {session ? (
                <div className="nav-menu">
                    <Link href="/products" className="nav-link white">
                        <div>Products</div>
                    </Link>
                    <a onClick={onManageBilling} className="nav-link border-left white">
                        <div>Billing</div>
                    </a>
                    <div onClick={signOut} className="nav-link black">
                        <div>Sign out</div>
                    </div>
                </div>
            ) : (
                // If the user is not logged in, display the login and pricing options
                <div className="nav-menu">
                <Link href="/login" className="nav-link white">
                    <div>Login</div>
                </Link>
                <Link href="/pricing" className="nav-link black">
                    <div>Pricing</div>
                </Link>
            </div>
            )}
        </div>
    );
}
