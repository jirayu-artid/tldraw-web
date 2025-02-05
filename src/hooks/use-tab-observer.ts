// AlignUI useTabObserver v0.0.0

import { useCallback, useEffect, useRef, useState } from "react";

interface TabObserverOptions {
	onActiveTabChange?: (index: number, element: HTMLElement) => void;
}

export function useTabObserver({ onActiveTabChange }: TabObserverOptions = {}) {
	const [mounted, setMounted] = useState(false);
	const listRef = useRef<HTMLDivElement>(null);
	const onActiveTabChangeRef = useRef(onActiveTabChange);

	useEffect(() => {
		onActiveTabChangeRef.current = onActiveTabChange;
	}, [onActiveTabChange]);

	const handleUpdate = useCallback(() => {
		if (listRef.current) {
			const tabs = listRef.current.querySelectorAll('[role="tab"]');
			tabs.forEach((el, i) => {
				if (el.getAttribute("data-state") === "active") {
					onActiveTabChangeRef.current?.(i, el as HTMLElement);
				}
			});
		}
	}, []);

	useEffect(() => {
		setMounted(true);

		const resizeObserver = new ResizeObserver(handleUpdate);
		const mutationObserver = new MutationObserver(handleUpdate);

		if (listRef.current) {
			resizeObserver.observe(listRef.current);
			mutationObserver.observe(listRef.current, {
				childList: true,
				subtree: true,
				attributes: true,
			});
		}

		handleUpdate();

		return () => {
			resizeObserver.disconnect();
			mutationObserver.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { mounted, listRef };
}
