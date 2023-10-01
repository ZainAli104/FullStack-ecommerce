"use client";

import React from "react";
import Link from "next/link";
import {useParams, usePathname} from "next/navigation";

import {cn} from "@/lib/utils";

export const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    const { storeId } = useParams();

    const routes = [
        {
            href: `/${storeId}/settings`,
            label: "Settings",
            active: pathname === `/${storeId}/settings`,
        }
    ];

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {routes.map(({ href, label, active }) => (
                <Link
                    href={href}
                    key={label}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
};
