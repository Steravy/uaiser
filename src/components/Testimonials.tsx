'use client';

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {
        name: 'John Doe',
        avatar: 'J',
        title: 'Software Developer',
        description: 'This best AI tool set i have found so far. I really love it.',
    },
    {
        name: 'Jane Doe',
        avatar: 'J',
        title: 'Content Creator',
        description: 'This best AI tool set i have found so far. I really love it.',
    },
    {
        name: 'John Doe',
        avatar: 'J',
        title: 'Software Developer',
        description: 'This best AI tool set i have found so far. I really love it.',
    },
    {
        name: 'Jane Doe',
        avatar: 'J',
        title: 'Content Creator',
        description: 'This best AI tool set i have found so far. I really love it.',
    },
]

type Props = {}

const Testimonials = (props: Props) => {

    return (

        <section className="px-10 pb-20">

            <h2 className="text-center text-4xl text-white font-extrabold mb-10" >
                Testimonials
            </h2>

            <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
                {
                    testimonials.map(
                        (testimonial, index) => (
                            <Card key={index} className="bg-[#373838] border-none text-white ">
                                <CardHeader >
                                    <CardTitle className="flex items-center gap-x-2" >
                                        <div>
                                            <p className="text-lg" >{testimonial.name}</p>
                                            <p className="text-sm text-zinc-400 shadow-lg" >{testimonial.title}</p>
                                        </div>
                                    </CardTitle>
                                    <CardContent className="pt-4 px-0" >
                                        {testimonial.description}
                                    </CardContent>
                                </CardHeader>
                            </Card>
                        )
                    )
                }
            </article>
        </section>
    )
}

export default Testimonials