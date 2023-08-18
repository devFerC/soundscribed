// Importing the Benefits and Plans components to be used in this pricing page
import Benefits from "src/pricing/components/Benefits"; 
import Plans from "src/pricing/components/Plans";

// Importing the stripe client from the utilities to fetch the pricing information
import { stripe } from "src/pricing/utils/stripe";

// Exporting the PricingPage functional component, accepting plans as a prop
export default function PricingPage({plans}) {
        return (
            // Main container with a two-column grid layout
            <div className="grid-halves h-screen-navbar">
                
                {/* Plans component to display the available pricing plans, passing the fetched plans as a prop */}
                <Plans plans= {plans}/>

                {/* Benefits component to display the benefits related to the pricing */}
                <Benefits/>
            </div>
        )
}

// Fetch the pricing plans from Stripe at build time
export async function getStaticProps () {
    
    //Calling the Stripe API method that retrieves an object with various properties, including data with the actual list of prices.
    const {data: prices}= await stripe.prices.list()

     // Initializing an empty array to hold the plans
    const plans = [];

    // Iterating through the prices to fetch the associated products and construct the plans array
    for (const price of prices) {

        // Retrieving the product associated with the price
        const product = await stripe.products.retrieve(price.product)

        // Pushing the relevant details to the plans array
        plans.push ({
            name: product.name,
            id: price.id,
            price: price.unit_amount/ 100, // Dividing by 100 to get the actual price in the appropriate currency unit
            interval: price.recurring.interval // Interval for the plan (e.g., monthly, yearly)
        })
    }

    // Returning the plans as props to be consumed by the PricingPage component
    return {
        props: {plans}
    }
}
