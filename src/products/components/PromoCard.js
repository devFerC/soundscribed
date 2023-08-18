import Link from "next/link";

// The PromoCard component is used to display a promotional message encouraging users to subscribe.
// This card will be shown to non-subscribed users.

export default function PromoCard() {
    return (
        <section>
            <div>
                <div>
                    <h4>Get Instant Access</h4>

                    {/* Detailed message explaining the benefits of subscribing */}
                    <p className="text-base">
                        Access this Audiobook plus dozen of others when you subscribe.
                    </p>
                </div>
            </div>

            {/* Link to the pricing page where the user can choose a subscription plan */}
            <Link href="/pricing" className="primary button">Purchase</Link>

        </section>
    );
}

