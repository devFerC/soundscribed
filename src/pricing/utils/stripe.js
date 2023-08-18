// Importing the Stripe package
import Stripe from "stripe";

// Creating and exporting a new instance of the Stripe object
// This instance is initialized with the secret key from the environment variables (process.env.STRIPE_SECRET_KEY)
// and a specific API version date ("2022-11-15")
export const stripe= new Stripe (process.env.STRIPE_SECRET_KEY, {apiVersion: "2022-11-15"});