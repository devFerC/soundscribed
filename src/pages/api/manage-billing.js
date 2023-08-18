import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SITE_URL } from "src/core/utils";
import { stripe } from "src/pricing/utils/stripe";

export default async function handler(req, res) {

    // Create a Supabase client for server-side interaction
    const supabaseServerClient = createServerSupabaseClient ({req,res});

    // Fetch the authenticated user from the Supabase client
    const {data: {user}} = await supabaseServerClient.auth.getUser();

    // If the user is not authenticated, return a 401 Unauthorized error
    if (!user) {
        return res.status(401).send("Unauthorized");
    }

    // Fetch the user's profile to get the Stripe customer ID
    const { data: profile } = await supabaseServerClient
        .from ("profile")
        .select ("stripe_customer_id")
        .eq ("user_id",user.id).single ();
    
    // Create a billing portal session using the Stripe client and the retrieved customer ID
    const session = await stripe.billingPortal.sessions.create({
        customer: profile.stripe_customer_id,
        return_url: SITE_URL,
    });

    // Sending the URL of the billing portal session back to the client
    res.send ({ url: session.url });
}
