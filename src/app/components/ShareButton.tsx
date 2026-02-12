"use client";

import React from "react";

export default function ShareButton() {
	
	/**
	 * @description 현재 사이트의 메인 주소를 복사하는 함수입니다.
	 * @async 비동기 방식으로 작동하여 복사 완료를 기다립니다.
	 */
	const handleCopy = async () => {
		try {
			/** @constant {string} rootUrl - 브라우저에서 알아낸 현재 사이트의 루트 URL */
			const rootUrl = window.location.origin;

			// 클립보드에 주소를 복사 (완료될 때까지 대기)
			await navigator.clipboard.writeText(rootUrl);

			alert("URL이 복사되었습니다.");
		} catch (err) {
			/** @todo 복사 실패 시 사용자에게 알림 및 에러 로그 출력 */
			console.error("복사 실패:", err);
			alert("URL 복사에 실패했습니다.");
		}
	};

	return (
		<button className="header__share" onClick={handleCopy} aria-label="공유하기">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
				<path d="M448 256C501 256 544 213 544 160C544 107 501 64 448 64C395 64 352 107 352 160C352 165.4 352.5 170.8 353.3 176L223.6 248.1C206.7 233.1 184.4 224 160 224C107 224 64 267 64 320C64 373 107 416 160 416C184.4 416 206.6 406.9 223.6 391.9L353.3 464C352.4 469.2 352 474.5 352 480C352 533 395 576 448 576C501 576 544 533 544 480C544 427 501 384 448 384C423.6 384 401.4 393.1 384.4 408.1L254.7 336C255.6 330.8 256 325.5 256 320C256 314.5 255.5 309.2 254.7 304L384.4 231.9C401.3 246.9 423.6 256 448 256z" />
			</svg>
		</button>
	);
}
