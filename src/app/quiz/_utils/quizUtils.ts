const SCORE_KEY = "quiz_score";

/** @description 선택지를 무작위로 섞습니다. */
export function shuffle<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

/** @description 로컬스토리지에서 점수를 읽어옵니다. */
export function readScore() {
	try {
		const raw = localStorage.getItem(SCORE_KEY);
		if (!raw) return { correct: 0, total: 0, updatedAt: Date.now() };
		return JSON.parse(raw);
	} catch {
		return { correct: 0, total: 0, updatedAt: Date.now() };
	}
}

/** @description 로컬스토리지에 점수를 저장합니다. */
export function writeScore(next: any) {
	localStorage.setItem(SCORE_KEY, JSON.stringify(next));
}
