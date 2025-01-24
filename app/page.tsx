"use client";

import {
	SignedIn,
	SignedOut,
	UserButton,
	RedirectToSignIn,
} from "@clerk/nextjs";
import Link from "next/link";
import { Clock, Plus } from "lucide-react";

// Mock data for recent whiteboards
const recentWhiteboards = [
	{ id: "abc123", name: "Project Brainstorm", lastAccessed: "2024-03-20" },
	{ id: "def456", name: "Team Meeting Notes", lastAccessed: "2024-03-19" },
	{ id: "ghi789", name: "Design Review", lastAccessed: "2024-03-18" },
];

export default function Home() {
	return (
		<>
			<SignedIn>
				<main className="min-h-screen p-6">
					{/* Header with User Button */}
					<header className="flex items-center justify-between mb-8">
						<h1 className="text-2xl font-bold">Your Whiteboards</h1>
						<UserButton afterSignOutUrl="/sign-in" />
					</header>

					{/* Create New Whiteboard Button */}
					<Link
						href="/whiteboard"
						className="inline-flex items-center gap-2 mb-8 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						<Plus className="h-4 w-4" />
						New Whiteboard
					</Link>

					{/* Recent Whiteboards */}
					<section>
						<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
							<Clock className="h-5 w-5" />
							Recent Whiteboards
						</h2>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{recentWhiteboards.map((board) => (
								<Link
									key={board.id}
									href={`/whiteboard/${board.id}`}
									className="block p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
								>
									<h3 className="font-medium mb-2">{board.name}</h3>
									<p className="text-sm text-gray-500">
										Last accessed:{" "}
										{new Date(board.lastAccessed).toLocaleDateString()}
									</p>
								</Link>
							))}
						</div>
					</section>
				</main>
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	);
}
