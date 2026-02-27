"use client";

import Link from "next/link";
import React from "react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import { useState } from "react";

export default function Footer() {
	const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
	return (
		<>
			<footer className="footer">
				<div className="footer__inner">
					<ul className="footer-list">
						<li>
							<button type="button" onClick={() => setIsPrivacyOpen(true)}>
								개인정보처리방침
							</button>
						</li>
						<li>
							<Link
								href={"https://open.kakao.com/o/su37zPfi"}
								target="_blank"
								rel="noopener noreferrer"
							>
								문의(오픈채팅)
							</Link>
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
			<PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
		</>
	);
}
