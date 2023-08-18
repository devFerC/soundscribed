import Link from "next/link";

// This SubscriberCard component will be shown to users who are already subscribed.
// It provides a quick navigation link back to the entire product catalog.
export default function SubscriberCard() {
    return (
        <section>
            <div>
                <h4>See all products</h4>
                <p className="text-base">Go back to see the entire catalogue.</p>
            </div>

            {/* Link that navigates the user back to the product listing page */}
            <Link href='/products' className="primary button">
                Back to products
            </Link>
            
        </section>
    )
}

