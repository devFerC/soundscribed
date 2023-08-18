// Defining an array of benefits, each with a title and subtitle to be displayed
const benefits= [
    {
        title: "One low price",
        subtitle: "Save big. Get every audiobook with a super low monthly subscription.",
    },
    {
        title: "No limits",
        subtitle: "Gain unlimited access to a world of knowledge.",
    },
    {
        title: "Cancel anytime",
        subtitle: "Pause or stop your subscription, whenever your like.",
    },
];

// Exporting the Benefits functional component
export default function Benefits() {
    return (
        <div className="bg-black">
            <div className="column-padding">
                <div className="content-grid xl">

                    {/* Mapping through the benefits array to display each benefit */}
                    {benefits.map(benefit => (

                        /* Each benefit is wrapped in a div with a key based on the title */
                        <div key={benefit.title} className="spacing-base"> 

                            {/* Displaying the title and subtitle of the benefit */}
                            <h3>
                                {benefit.title}<br />
                            </h3>
                            <div>
                                {benefit.subtitle}
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
