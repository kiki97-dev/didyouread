import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<section className="main01">
			<div className="main01__inner main-common-inner">
				<Image src="/images/main01.png" alt="설명 문구" width={1536} height={1024} />
				<h1>
					공지사항, <br />
					어디까지 읽어봤니?
				</h1>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, quis
					necessitatibus. Accusamus, commodi labore molestias voluptates quam dolorem non
					totam distinctio, quia ab omnis aperiam exercitationem dolore temporibus!
					Asperiores, id.
				</p>
				<Link className="common-btn" href={"/"}>시작하기</Link>
			</div>
		</section>
	);
}
