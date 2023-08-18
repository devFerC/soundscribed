import Link from "next/link";

// This component is used to render individual product cards in the Products Page.
export default function ProductCard({product}) {
    return (
        <article className="product-card">
            {/* The Link wrapper around the image makes the image clickable, leading to the product's detail page. */}
            <Link href={`/products/${product.slug}`}>

                {/* The product image is loaded dynamically based on the product's slug. */}
                <img src={`/assets/${product.slug}.jpg`} alt={product.name}/>

            </Link>

            <header>
                <p>{product.name}</p> {/* Display product's name*/}
            </header>

            <footer>
                {/* Link to the product's detail page to see more information about the product */}
                <Link href={`/products/${product.slug}`} className="more">
                    See More →
                </Link>

                <div className="my-5"> {/* Product's category, styled with a "pill" class */}
                    <span className="pill">{product.category}</span>
                </div>

            </footer>

        </article>
    );
}
