"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * @description 주소창의 쿼리 스트링(?...)을 제거하여 URL을 깔끔하게 유지하는 컴포넌트
 */
export default function UrlCleaner() {
	const pathname = usePathname(); // 쿼리 스트링이 없는 순수 경로 추출

	useEffect(() => {
		// pathname이 바뀔 때마다 실행 (페이지 이동 시 포함)
		// 현재 주소 기록을 쿼리 스트링이 없는 주소로 덮어씌웁니다.
		window.history.replaceState(null, "", pathname);
	}, [pathname]);

	return null; // 화면에는 아무것도 렌더링하지 않음
}
