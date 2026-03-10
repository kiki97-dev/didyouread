import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<section className="main01">
			<div className="main01__inner main-common-inner">
				<Image src="/images/main01.png" alt="설명 문구" width={1536} height={1024} />
				<h1 style={{color:'#111'}}>
					당신의 <span style={{color:'#54759a'}}>문해력</span>은 <br />
					<span style={{color:'#FE6F43'}}>상위 몇%</span>일까요?
				</h1>
				<p>
					대부분은 &lsquo;읽었다고 착각&rsquo;합니다. 
				</p>
				<div className="main01__img-wrap">
				<Image src="/images/main02_02.png" alt="설명 문구" width={142} height={166} />
				<Image src="/images/main02_03.png" alt="설명 문구" width={40} height={40} />
				<Image src="/images/main02_04.png" alt="설명 문구" width={132} height={122} />
				</div>
				<p>
					실제 공지 형식으로 만든 글, <br />
					읽고 나면 짧은 퀴즈가 기다리고 있어요.
				</p>

				<Link href="/notification" className="common-btn common-btn--02">1분만에 확인하기</Link>
			</div>
		</section>
	);
}
