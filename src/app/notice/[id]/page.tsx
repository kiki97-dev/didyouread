import { notFound } from "next/navigation";
import UrlCleaner from "../_components/UrlCleaner";
import path from "path";
import { readFile } from "fs/promises";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * @description 주소의 id와 type을 기반으로 마크다운 파일을 읽어와 공지사항 본문을 렌더링합니다.
 */
export default async function NoticePage({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ type?: string }>;
}) {
	const { id } = await params; //(id): 퀴즈 번호 (예: 1번 퀴즈, 2번 퀴즈)
	const { type } = await searchParams; //(type): 퀴즈의 버전 (예: A안, B안)

	// 1. 유효하지 않은 id나 type인 경우 404 페이지로 보냅니다.
	if (!["1", "2"].includes(id) || !type || !["a", "b", "c", "d"].includes(type)) {
		return notFound();
	}

	// 2. 파일 경로 설정 (예: src/app/notice/content/Q01_A.md)
	const fileName = `Q0${id}_${type.toUpperCase()}.md`;
	const filePath = path.join(process.cwd(), "src", "app", "notice", "content", fileName);

	let file;
	try {
		// 3. 서버에서 파일을 텍스트 형식으로 읽어옵니다.
		file = await readFile(filePath, "utf8");
	} catch {
		// 파일이 물리적으로 없는 경우에도 404 처리
		return notFound();
	}

	return (
		<div>
			{/* 4. 화면이 로드되면 주소창을 깔끔하게 정리합니다. */}
			<UrlCleaner />

			{/* 5. 마크다운 텍스트를 HTML로 변환하여 출력합니다. */}
			<div className="notice-wrap">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{file}</ReactMarkdown>
			</div>
		</div>
	);
}
