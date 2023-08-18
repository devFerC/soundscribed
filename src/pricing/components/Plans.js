import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { SITE_URL } from "src/core/utils";

// Exporting the Plans functional component, accepting plans as a prop
export default function Plans({plans}) {

    // State variables to manage the selected plan interval (monthly/yearly), and redirecting status during checkout
    const [selected, setSelected]= useState ("month");
    const [isRedirecting, setRedirecting]= useState (false); 

    // Finding the selected plan based on the selected interval
    const plan= plans.find((plan) => plan.interval === selected);

    // Function to toggle between monthly and yearly plans
    function togglePlan() {
        const interval = selected === 'month' ? 'year': 'month'
        setSelected(interval)
    }

    // Checkout process
    async function onCheckout () {

        setRedirecting(true) // Setting redirecting status to true

        // Making a fetch request to the checkout endpoint with the selected plan ID
        const response= await fetch(`${SITE_URL}/api/checkout/${plan.id}`)
        const data= await response.json();

        // Loading Stripe with the publishable key and redirecting to Stripe checkout
        const stripe= await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        );
        await stripe.redirectToCheckout({sessionId: data.id});

        setRedirecting(false) // Setting redirecting status back to false after redirect
    }

    return (
        <div className="bg-salmon border-right">
            <div className="column-padding centered">
                <div className="callout-wrap">
                    <div className="plan">
                        <div className="plan-wrap">
                            <div className="plan-content">

                            {/* Switch component to toggle between monthly and yearly plans */}
                                <div className="plan-switch">
                                    monthly
                                    <label className="switch">
                                        <input onChange={togglePlan} type="checkbox" />
                                        <span className="slider" />
                                    </label>
                                    yearly
                                </div>

                                {/* Displaying the plan name */}
                                <h2 className="plan-name">{plan.name}</h2>

                                {/* Displaying the plan price and interval */}
                                <div>
                                    Just ${plan.price} / {plan.intertval}
                                </div>

                                <div>
                                {/* Button to initiate the checkout process. Showing loading text while redirecting */}
                                    <button disabled={isRedirecting} onClick={onCheckout} className="large-button">
                                        <div className="large-button-text">{isRedirecting ? "Loading..." : "Buy Now"}</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
