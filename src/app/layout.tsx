import { ClerkProvider } from "@clerk/nextjs";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" className={cn(inter.variable, "antialiased")}>
				<body>{children}</body>
			</html>
		</ClerkProvider>
	);
}
