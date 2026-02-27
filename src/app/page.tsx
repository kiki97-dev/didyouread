import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<section className="main01">
			<div className="main01__inner main-common-inner">
				<Image src="/images/main01.png" alt="설명 문구" width={1536} height={1024} />
				<h1>
					읽은 줄 알았지? <br />
					진짜 읽었는지 확인해 보기
				</h1>
				<p>
					공지사항 읽는 척만 하고 있진 않으신가요? <br />
					지금 바로 확인해 보세요! <br /><br />
					실제 공지 형식으로 만든 2개의 글, <br />
					읽고 나면 짧은 퀴즈가 기다리고 있어요.
				</p>

				<Link href="/notification" className="common-btn">지금 도전하기</Link>
			</div>
		</section>
	);
}
