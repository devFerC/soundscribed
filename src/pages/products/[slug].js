import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player"; // Component for rendering audio and video players
import PromoCard from "src/products/components/PromoCard";
import SubscriberCard from "src/products/components/SubscriberCard";
import { supabaseServer } from "supabase"

export default function ProductPage({product}) {

    // Hook to get supabase client
    const supabaseClient = useSupabaseClient ();

    // Session hook to manage user authentication state
    const session = useSession(); 

    // State to manage the product content details
    const [productContent, SetProductContent] = useState (null)
    
    // Fetching the product content from the database using Supabase
    useEffect(()=>{
        async function getProductContent () {
            const {data: productContent} = await supabaseClient.from('product_content').select('*').eq('id', product.product_content_id).single();
            SetProductContent(productContent)
        }
        getProductContent()
    },[supabaseClient])

    return (
        <section className="product-section">
            <article className="product">
                <div className="product-wrap">

                    {/* Displaying download button if there's a downloadable link */}
                    {productContent?.download_url && (
                        <a href={`/asset/${productContent.download_url}`} download className="download-link large-button">
                            <span className="large-button-text">Download</span>
                        </a>
                    )}

                    {/* Rendering audio player if audio_url exists, otherwise displaying image */}
                    {productContent?.audio_url ? (
                        <ReactPlayer controls url={productContent.audio_url}/>
                    ) : ( 
                    <Image width={1000} height={300} src={`/assets/${product.slug}.jpg`} alt={product.name}/>)}
                </div>
                <section>
                    <header>
                        <h3>{product.name}</h3>
                    </header>
                    <section>
                        <div>
                            <p>{product.description}</p>
                        </div>
                    </section>
                </section>
                <section> {/* Displaying either SubscriberCard or PromoCard based on user's session */}
                    {session ? <SubscriberCard/> : <PromoCard/>}
                </section>
            </article>
        </section>

    )
}

// Dynamically generate paths based on slugs of products
export async function getStaticPaths () {
    const {data: products} = await supabaseServer.from('product').select('slug')
    const paths = products.map(product =>({
        params: {
            slug: product.slug
        }
    }))
 
    return {
        paths,
        fallback: false, // Return 404 if path is not found
    }
}

// Fetching specific product details based on slug for static generation
export async function getStaticProps (context) {
    const slug = context.params.slug
    const {data: product} = await supabaseServer
    .from('product')
    .select("*")
    .eq('slug', slug)
    .single()

    return {
        props: {product}, // Passing product details as props to component
    }
}