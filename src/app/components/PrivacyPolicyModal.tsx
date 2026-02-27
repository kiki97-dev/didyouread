"use client";

import React from "react";

type Props = {
	isOpen: boolean; // 열려있는지 여부
	onClose: () => void; // 닫기 함수
};

export default function PrivacyPolicyModal({ isOpen, onClose }: Props) {
	return (
		// isOpen이 true일 때만 'on' 클래스가 추가됩니다.
		<div className={`policy-modal ${isOpen ? "on" : ""}`}>
			{/* 배경 클릭 시 닫히게 설정 */}
			<div className="policy-modal__bg modal-close" onClick={onClose}></div>

			<div className="policy-modal__inner">
				<div className="policy-modal__title">
					<h5>개인정보처리방침</h5>
					<button className="modal-close" onClick={onClose}>
						닫기
					</button>
				</div>
				<div className="policy-modal__text-box">
					<p>
						<b>제1조 수집하는 정보 항목</b> <br />
						본 서비스는 사용자 경험 개선 및 서비스 운영을 위해 다음 정보를 처리할 수
						있습니다. <br />
						브라우저 로컬 스토리지(LocalStorage) 저장 식별값 — 재방문 여부 확인을 위해
						자동 생성되는 임시 ID입니다.
						<br />
						테스트 이용 기록 및 응답 데이터 — 익명 처리된 형태로만 보관됩니다.
						<br />
						회원가입 없이 서비스 이용 과정에서 자동으로 생성·저장되며, 이메일·전화번호
						등 직접 식별 가능한 개인정보는 수집하지 않습니다.
						<br />
						<br />
						<b>제2조 정보의 이용 목적</b> <br />
						수집된 정보는 아래 목적에 한해서만 사용되며, 목적 외 활용은 하지 않습니다.
						<br />
						재방문 여부 식별 및 이용 흐름 최적화
						<br />
						서비스 품질 개선 및 익명 통계 분석
						<br /><br />
						<b>제3조 저장 방식 및 보유 기간</b> <br />
						모든 정보는 사용자의 브라우저 로컬 스토리지에만 저장되며, 외부 서버에 개인을
						식별할 수 있는 형태로 저장되지 않습니다. 사용자가 브라우저 데이터 또는 로컬
						스토리지를 삭제하면 해당 정보는 즉시 소멸됩니다.
					</p>
				</div>
			</div>
		</div>
	);
}
