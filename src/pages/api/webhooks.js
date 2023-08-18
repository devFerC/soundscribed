import getRawBody from "raw-body";
import { stripe } from "src/pricing/utils/stripe";
import { supabaseServer } from "supabase";

// Set up the API route to handle raw request bodies, needed for Stripe webhook verification
export const config= {
    api: {
        bodyParser:false,
    },
};

export default async function handler(req, res) {
    const signature= req.headers['stripe-signature']; // Extract the Stripe signature from the request headers
    const signingSecret= process.env.STRIPE_SIGNING_SECRET; // Get the Stripe signing secret from environment variables

    
    let event;

    try{
        // Get the raw body of the request and verifying the webhook signature
        const rawBody= await getRawBody(req, {limit: "2mb"});
        event= stripe.webhooks.constructEvent(rawBody, signature, signingSecret);
    } catch (error) {
        console.log ("Webhook signature verification failed.");
        return res.status(400).end();
    }

    try {
        switch (event.type) {
            // If the event indicates a subscription update, call the function to handle that update
            // If the subscription is deleted, call the function to handle deletion
            case "customer.subscription.updated":
                await updateSubscription (event)
                break;
                case "customer.subscription.deleted":
                    await deleteSubscription (event)
                    break;
        }
        // If the event handling is successful, send a success response back to Stripe
        res.send ({success: true});

    } catch (error) {
        // If there is an error in handling the event (e.g., issues with database updates or deletions),
        // log the error message and send a failure response back to Strip
        console.log(error.message);
        res.send({ success: false });
    }
}

// update subscription in the database when updated in Stripe
async function updateSubscription (event) {

    // Extracting the subscription object from the event data sent by Stripe
    const subscription = event.data.object;

    // Getting the customer ID related to the subscription from Stripe's data
    const stripe_customer_id = subscription.customer;

    // Getting the current status of the subscription (e.g., active, canceled)
    const subscription_status = subscription.status;

    // Retrieving the price ID of the item in the subscription, it's a single-item subscription
    const price= subscription.items.data[0].price.id;

    // Fetching the user profile from the Supabase database that corresponds to the Stripe customer ID
    // This allows us to link the Stripe data with our application's user data
    const {data: profile} = await supabaseServer.from('profile').select('*').eq('stripe_customer_id', stripe_customer_id).single();

    if(profile) {
        // Updating existing profile with new subscription data
        const updatedSubscription = { subscription_status, price}
        await supabaseServer.from('profile').update(updatedSubscription).eq('stripe_customer_id', stripe_customer_id)

    } else {
        // Creating new profile if not found
        const customer = await stripe.customers.retrieve(stripe_customer_id);
            const name = customer.name;
            const email = customer.email;
            const newProfile = {
                name,
                email,
                stripe_customer_id,
                subscription_status,
                price,
            };
            await supabaseServer.auth.admin.createUser ({
                email,
                email_confirm: true,
                user_metadata : newProfile,
            });
    }
}

// Delete a subscription from the database when deleted in Stripe
async function deleteSubscription (event){
    const subscription = event.data.object;
    const stripe_customer_id = subscription.customer;
    const subscription_status = subscription.status;
    const deletedSubscription = {
        subscription_status,
        price: null
    };
    
    // Updating the profile in the database to reflect the deleted subscription
    await supabaseServer
    .from ("profile")
    .update (deletedSubscription)
    .eq ("stripe_customer_id", stripe_customer_id);
}
 
