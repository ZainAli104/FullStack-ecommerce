import React from "react";
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ClerkProvider} from '@clerk/nextjs'

import {ModalProvider} from "@/providers/modal-provider";
import {ToastProvider} from "@/providers/toast-provider";
import {ThemeProvider} from "@/providers/theme-provider";
import NextNProgressClient from "@/components/ui/next-progress";

import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Admin Dashboard',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <NextNProgressClient />
                <ToastProvider/>
                <ModalProvider/>
                {children}
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>
    )
}
