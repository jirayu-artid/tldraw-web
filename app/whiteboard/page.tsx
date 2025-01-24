"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

function generateRoomId() {
	return Math.random().toString(36).substring(2, 10);
}

export default function WhiteboardPage() {
	useEffect(() => {
		const roomId = generateRoomId();
		redirect(`/whiteboard/${roomId}`);
	}, []);

	return null;
}
