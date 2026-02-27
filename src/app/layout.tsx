import type { Metadata, Viewport } from "next";
import "./globals.css";
import ShareButton from "./components/ShareButton";
import Link from "next/link";
import Script from "next/script";
import Footer from "./components/Footer";

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
					<Footer />
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
