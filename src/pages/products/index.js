import ProductCard from "src/products/components/Card";
import { supabaseServer } from "supabase";

// Main component for rendering the products page
export default function ProductsPage({products}) {
    return (
        <>
            <div className="section bg-teal">
                <div className="container">
                    <div className="section-intro">
                        <h1>The Latest Audiobooks</h1>
                    </div>
                </div>
            </div>
            <div className="section small">
                <div className="container">
                    <ul className="product-card-grid">
                    {/* Rendering a ProductCard for each product in the list */}
                    {products.map (product =>(
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

// Fetch all products for static site generation
export async function getStaticProps () {
    
    // Query to fetch all products
    let {data: products} = await supabaseServer.from ("product").select ("*");

    return {
        props: {products},
    }
}
