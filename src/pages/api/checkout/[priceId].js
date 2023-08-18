import { SITE_URL } from "src/core/utils"
import { stripe } from "src/pricing/utils/stripe"

export default async function handler(req, res) {
    // Extracting the priceId from the query parameters 
    const {priceId}= req.query

    // Creating a checkout session using Stripe for a subscription model
    const session= await stripe.checkout.sessions.create ({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{price: priceId, quantity: 1}],
        success_url: `${SITE_URL}/success`,
        cancel_url: `${SITE_URL}/pricing`,
    })

    // Sending the session id back in the response for further interactions with the Stripe API
    res.send({id: session.id})
}
