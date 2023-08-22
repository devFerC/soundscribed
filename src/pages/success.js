//This component provide a clear message to users who have successfully completed registering for an account. 

import Image from "next/image";
import confetti from "../../public/assets/confetti.png"
import Link from "next/link";

export default function SuccessPage() {
    return (
        // Main container with a pink background that takes up the full screen height
        <div className="section bg-pink h-screen">
            <div className="container">
                <div className="section-intro welcome">

                {/* Confetti image with specified dimensions */}
                    <Image src={confetti} height={200} width={200} alt="confetti" className="confetti"/>

                    <h1>You&apos;re in!</h1>
                    <p>You can now access everything on this site. <br/> Ready to get started?</p>

                    {/* Link to the login page, styled as a large button */}
                    <Link href='/login' className="large-button">
                        <div className="large-button-text">Go to login</div>
                    </Link>

                </div>
            </div>
        </div>
    )
}
