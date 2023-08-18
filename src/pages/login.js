import Image from "next/image";
import Link from "next/link";
import Logo from "src/core/components/Logo";
import LoginForm from "src/login/components/LoginForm"; // Importing the LoginForm component to handle login
import login from '../../public/assets/login-lock-2.png';
import { useState } from "react"; // Importing useState hook for managing component state
import LoginSubmitted from "src/login/components/LoginSubmitted"; // Importing the LoginSubmitted component to show after login submission

export default function LoginPage() {
    // State variable to manage whether the login form has been submitted
    // setSubmitted function will be used to update this state
    const [submitted, setSubmitted] = useState('')

    return (
        // Main container divided into two halves
        <div className="grid-halves h-screen">
            <div className="border-right bg-offwhite"> {/* Left half with a white background and border */}
                <div className="column-padding">
                    <div className="tablet-centered">
                        <Link href="/" className="logo-container"> {/* Link to navigate back to the home page, containing the site's logo */}
                            <Logo style={{ width: 150 }}/>
                        </Link>
                        {/* If the form is submitted, display the LoginSubmitted component; otherwise, display the LoginForm component */}
                        {submitted ? (
                        <LoginSubmitted submitted={submitted}/>
                        ) : (
                        <LoginForm setSubmitted={setSubmitted} />
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-navy border-right"> {/* Right half with a navy background color and the login image */}
                <Image src={login} alt="login" className="callout-image"/>
            </div>
        </div>
    );
}
