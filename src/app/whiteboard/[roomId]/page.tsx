"use client";

import { useUser } from "@clerk/nextjs";
import { useSyncDemo } from "@tldraw/sync";
import { useParams } from "next/navigation";
import { Tldraw, type TLUserPreferences } from "tldraw";
import "tldraw/tldraw.css";

export default function WhiteboardRoomPage() {
	const roomId = useParams().roomId as string;
	const { user, isLoaded } = useUser();

	const userInfo: TLUserPreferences = {
		id: user?.id || "",
		name: user?.fullName || user?.username || "Anonymous",
		color: "palevioletred",
		colorScheme: "dark",
	};

	const store = useSyncDemo({
		roomId,
		userInfo,
	});

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	return (
		<div className="h-screen w-screen fixed inset-0">
			<Tldraw store={store} />
		</div>
	);
}
