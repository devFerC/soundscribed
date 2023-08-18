import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import AppLayout from "src/core/layouts/App";
import "src/styles/globals.css";

export default function App({ Component, pageProps }) {
  // Initializing Supabase client using useState. 
  // This client will help in connecting and performing actions on the Supabase database
  const [supabaseClient] = useState (()=>createBrowserSupabaseClient ());
  
  return (
    // The SessionContextProvider is wrapping the application to handle user sessions with Supabase.
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      {/*Render the current page within the common layout. Any properties that the page needs are passed down to it through pageProps.*/}
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SessionContextProvider>    
  );
}
