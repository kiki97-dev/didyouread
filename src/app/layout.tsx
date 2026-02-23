import type { Metadata, Viewport } from "next";
import "./globals.css";
import ShareButton from "./components/ShareButton";
import Link from "next/link";
import Script from "next/script";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export const metadata: Metadata = {
	title: "디주릿",
	description: "읽은 줄 알았지? 공지 읽기 3분 서바이벌",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<head>
				{/* suit 폰트 */}
				<link
					href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
					rel="stylesheet"
				></link>
			</head>
			<body>
				<section className="mo-wrap">
					<header className="header">
						<div className="header__inner">
							<h1 className="header__title">
								<Link href="/">DIDYOUREAD</Link>
							</h1>
							<ShareButton />
						</div>
					</header>
					{children}
					<footer className="footer">
						<div className="footer__inner">
							<ul className="footer-list">
								<li>
									<Link href={"/"}>개인정보</Link>
								</li>
								<li>
									<Link href={"/"}>문의(오픈채팅)</Link>
								</li>
								<li>
									<p>
										{/* 방문자 수 (같은 사람이 새로고침해도 하루 한 번만 카운트) */}
										today : <span id="busuanzi_value_site_uv">--</span> &nbsp;
										{/* 전체 페이지 뷰 (새로고침하면 올라감) */}
										total : <span id="busuanzi_value_site_pv">--</span>
									</p>
								</li>
								<li>
									<p>© 2026 DIDYOUREAD. All rights reserved.</p>
								</li>
							</ul>
						</div>
					</footer>
				</section>
				{/* 방문자수 스크립트 */}
				<Script
					src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
					strategy="afterInteractive"
				/>
			</body>
		</html>
	);
}
