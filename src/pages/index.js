import Link from "next/link"; // Component for client-side navigation.
import Image from "next/image"; // Using Image component for optimized image rendering.
import hero from "../../public/assets/home-hero-new-bg.png";

export default function HomePage() {
    return (
        <div className="grid-halves h-screen-navbar"> {/* Main container divided into two halves */}
            <div className="bg-teal border-right"> {/* Left half with a teal background and border */}
                <div className="column-padding">
                    <div className="tablet-centered">
                        <div className="content-grid home-hero">
                            <h1>
                                Discover the World of <br /> Audiobooks
                            </h1>
                            <p className="section-subtitle">
                                Expand your mind and save time with our vast collection.
                            </p>
                            <Link href='/products' className="large-button" > {/* Navigation link to the products page */}
                            <div className="large-button-text">Explore Audiobooks</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-salmon"> {/* Right half with a salmon background */}
                <div className="column-padding centered">
                    <div className="callout-wrap">
                        <Image src={hero} className="callout-image" alt="hero"></Image>
                    </div>
                </div>
            </div>
        </div>
    );
}
