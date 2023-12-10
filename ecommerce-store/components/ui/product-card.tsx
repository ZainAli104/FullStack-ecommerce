"use client";

import React from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Expand, ShoppingCart} from "lucide-react";

import {Product} from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";

interface ProductCardProps {
    data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${data.id}`);
    }

    return (
        <div onClick={handleClick} className="bg-white cursor-pointer group rounded-xl border p-3 space-y-4">
            {/* Image and Actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data?.images?.[0]?.url}
                    alt="Product Image"
                    fill
                    className="aspect-square object-cover rounded-md"
                />
                <div className="opacity-0 group-hover:opacity-100 absolute transition w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={() => {}}
                            icon={<Expand size={20} />}
                            className="text-gray-600"
                        />
                        <IconButton
                            onClick={() => {}}
                            icon={<ShoppingCart size={20} />}
                            className="text-gray-600"
                        />
                    </div>
                </div>
            </div>
            {/* Description */}
            <div>
                <p>
                    {data.name}
                </p>
                <p className="text-sm text-gray-500">
                    {data.category?.name}
                </p>
            </div>
            {/* Price */}
            <div className="flex items-center justify-between">
                <Currency value={data.price} />
            </div>
        </div>
    );
};

export default ProductCard;