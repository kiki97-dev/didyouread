import type { Metadata } from "next";
import "./reset.css";
import "./globals.css";
import ShareButton from "./components/ShareButton";
import Link from "next/link";

export const metadata: Metadata = {
	title: "DIDYOUREAD | 디쥬릿",
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
									<Link href="/">개인정보처리 방침</Link>
								</li>
								<li>
									<p>© 2026 DIDYOUREAD. All rights reserved.</p>
								</li>
							</ul>
						</div>
					</footer>
				</section>
			</body>
		</html>
	);
}
