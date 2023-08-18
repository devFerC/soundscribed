import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function LoginForm({setSubmitted}) {
    const supabaseClient = useSupabaseClient ();
    const [error, setError] = useState ('');
    const [isLoading, setLoading] = useState (false);
    
    // Asynchronous function to handle the form submission
    async function onSubmit(event) {
        setLoading (true) // Set the loading state to true as the request is being processed
        event.preventDefault();

        // Retrieve the email value from the form
        const email = event.target.elements.email.value;

        // Attempt to sign in with the given email using One Time Password
        // Set shouldCreateUser to false, meaning an account should not be created if not found
        const {error} = await supabaseClient.auth.signInWithOtp ({
            email,
            options: {
                shouldCreateUser: false,
                emailRedirectTo: window.location.origin,
            },
        });

        // If an error occurred during the login
        if (error) {
            setError (error.message);
            setLoading (false);
            console.log (error);
        } else {
            // Clear any previous errors
            setError ('');

            // Set loading to false as the request has finished
            setLoading (false);

            // Trigger the setSubmitted function with the email to notify a successful login
            setSubmitted(email);
        }
    }

    //Login page rendering
    return (
        <form onSubmit={onSubmit} className="content-grid home-hero">
            {error && (
                 // If there's an error, a div will be displayed with the error message
                <div className="danger" role="alert">
                    {error}
                </div>
            )}
            <h1>Welcome back</h1>
            <div className="email-input">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email"/>
            </div>
            <button
                disabled={isLoading} // Disable the button if the form is in the process of being submitted (isLoading is true)
                type="submit" // Button that triggers the onSubmit function when clicked
                className="large-button"
            >
                <div className="large-button-text">{isLoading ? "logging in..." : "Log in"}</div> 
            </button>
        </form>
    );
}
//delete 2nd button?