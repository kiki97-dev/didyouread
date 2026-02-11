import { notFound } from "next/navigation";
import UrlCleaner from "../_components/UrlCleaner";
import path from "path";
import { readFile } from "fs/promises";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function NoticePage({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ type?: string }>;
}) {
	const { id } = await params;
	const { type } = await searchParams;

	// 🔥 id + type 같이 검증
	if (!["1", "2"].includes(id) || !type || !["a", "b"].includes(type)) {
		return notFound();
	}

	// 🔥 파일 이름 자동 생성
	const fileName = `Q0${id}_${type.toUpperCase()}.md`;
	const filePath = path.join(process.cwd(), "src", "app", "notice", "content", fileName);

	let file;

	try {
		file = await readFile(filePath, "utf8");
	} catch {
		return notFound();
	}

	// 2. 퀴즈 번호 안에서 다시 A안/B안 분기 처리
	return (
		<div>
			{/* 주소창을 청소합니다) */}
			<UrlCleaner />

			<div className="notice-wrap">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{file}</ReactMarkdown>
			</div>
		</div>
	);
}
