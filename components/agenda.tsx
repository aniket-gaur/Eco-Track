'use client';

import { FaRecycle, FaLeaf, FaHandHoldingHeart, FaShoppingBasket } from 'react-icons/fa';
import { Card, CardContent } from "@/components/ui/card";

const AgendaSection = () => {
    const items = [
        { icon: <FaRecycle size={32} />, title: 'Reduce', subtitle: 'Recycle' },
        { icon: <FaShoppingBasket size={32} />, title: 'Embrace', subtitle: 'Economial' },
        { icon: <FaLeaf size={32} />, title: 'Green', subtitle: 'Protect' },
        { icon: <FaHandHoldingHeart size={32} />, title: 'Adopt', subtitle: 'Join the Green' },
    ];

    return (
        <section className="bg-[#fdf9f0] py-16">
            <div className="container mx-auto flex flex-wrap justify-center gap-12">
                {items.map((item, index) => (
                    <Card key={index} className="w-64 shadow-md text-center">
                        <CardContent className="flex flex-col items-center space-y-4 p-6">
                            <div className="bg-[#f5e7d3] p-4 rounded-full">{item.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-gray-500">{item.subtitle}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default AgendaSection;
