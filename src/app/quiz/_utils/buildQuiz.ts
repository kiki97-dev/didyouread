import type { RawQuizItem } from "../_data/quizData";

export type BuiltQuizItem = {
	question: string;
	options: string[];
	correctIndex: number;
};

export function shuffle<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

export function buildQuizData(raw: RawQuizItem[]): BuiltQuizItem[] {
	return raw.map((q) => {
		const mixed = shuffle([q.correct, ...q.wrong]);
		return {
			question: q.question,
			options: mixed,
			correctIndex: mixed.indexOf(q.correct),
		};
	});
}
