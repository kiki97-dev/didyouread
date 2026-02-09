import { notFound } from "next/navigation";

export default async function NoticePage({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ type?: string }>;
}) {
	const { id } = await params;
	const { type } = await searchParams;

	// 1. 먼저 퀴즈 번호(id)가 맞는지 확인
	if (id !== "1" && id !== "2") {
		notFound();
	}

	// 2. 퀴즈 번호 안에서 다시 A안/B안 분기 처리
	return (
		<div>
			{/* 1번 퀴즈일 때 */}
			{id === "1" && (
				<div
					style={{
						padding: "20px",
						maxWidth: "500px",
						margin: "0 auto",
						fontFamily: "sans-serif",
						color: "#333",
						lineHeight: "1.6",
					}}
				>
					{/* 헤더 섹션 */}
					<div style={{ marginBottom: "30px" }}>
						<h2
							style={{
								fontSize: "1.2rem",
								fontWeight: "bold",
								marginBottom: "8px",
							}}
						>
							[안내] 디쥬릿 서비스 이용약관 개정 및 개인정보 처리방침 변경
						</h2>
						<p style={{ color: "#999", fontSize: "0.9rem" }}>2026. 02. 09</p>
					</div>

					<hr
						style={{
							border: "0",
							borderTop: "1px solid #eee",
							marginBottom: "30px",
						}}
					/>

					{/* 본문 섹션 */}
					<section style={{ fontSize: "1rem" }}>
						<p style={{ marginBottom: "20px" }}>안녕하세요, 디쥬릿입니다.</p>

						{type === "a" ? (
							/* --- A안: 매우 긴 줄글 형태 (대조군) --- */
							<>
								<p style={{ marginBottom: "20px" }}>
									언제나 저희 디쥬릿 서비스를 아껴주시고 이용해 주시는 회원
									여러분께 진심으로 감사의 말씀을 드립니다. 디쥬릿은 회원님들께
									보다 투명하고 안전한 서비스를 제공해 드리기 위하여, 관련 법령의
									개정 사항을 반영하고 현재 운영 중인 서비스의 변화된 특성에
									맞추어 이용약관 및 개인정보 처리방침을 개정하게 되었습니다.
								</p>

								<p style={{ marginBottom: "20px" }}>
									이번 개정의 핵심적인 목적은 회원님의 개인정보를 보호하기 위한
									보안 기술 표준을 한 단계 높이고, 서비스 이용 과정에서 발생할 수
									있는 다양한 상황들에 대해 더욱 명확한 기준을 제시함으로써
									이용상의 혼란을 최소화하는 데 있습니다. 개정된 약관은 다가오는
									2026년 3월 15일부터 정식으로 효력이 발생될 예정이며, 본 공지가
									게시된 시점부터 효력 발생 전일까지 사전 안내 기간을 가집니다.
								</p>

								<p style={{ marginBottom: "20px" }}>
									구체적인 변경 내용을 살펴보면, 먼저 제3조 서비스 이용 권한 및
									제한 항목에 있어서 기존의 모호했던 부정 사용 방지 로직에 대한
									설명이 보다 구체화되었습니다. 또한, 개인정보 처리방침 중 수집
									항목 부분에 있어 기존에 수집하던 마케팅 활용 동의 항목 중
									불필요하다고 판단된 일부 데이터를 삭제하고, 대신 서비스 보안
									강화를 위한 접속 로그 보관 주기를 기존 6개월에서 1년으로
									연장하는 내용이 포함되었습니다.
								</p>

								<p style={{ marginBottom: "20px" }}>
									만약 이번 개정안에 대해 동의하지 않으시는 경우에는 서비스 내
									고객센터를 통해 이의제기를 신청하시거나 회원 탈퇴를 진행하실 수
									있습니다. 다만, 효력 발생일인 3월 15일 이전까지 별도의 거부
									의사를 표시하지 않으시고 서비스를 계속해서 이용하시는 경우에는
									이번 개정 약관 및 처리방침에 동의하신 것으로 간주됨을
									알려드리오니 이 점 유의하시어 이용에 차질 없으시길 바랍니다.
								</p>

								<p style={{ marginBottom: "20px" }}>
									저희 디쥬릿 팀은 앞으로도 회원님들의 소중한 정보를 안전하게
									보호하고, 더욱 쾌적하고 편리한 읽기 경험을 제공해 드리기 위해
									최선의 노력을 다할 것을 약속드립니다. 관련하여 더 궁금하신
									사항이나 상세한 문의가 필요하신 경우 언제든지 저희 공식 고객센터
									메일 혹은 앱 내 1:1 문의하기 기능을 이용해 주시기 바랍니다.
								</p>
							</>
						) : (
							/* --- B안: 핵심만 담은 짧은 글 (실험군) --- */
							<>
								<p style={{ marginBottom: "20px" }}>
									디쥬릿 서비스 이용약관 및 개인정보 처리방침이{" "}
									<b>2026년 3월 15일</b>부로 개정됩니다.
								</p>

								<p style={{ marginBottom: "20px" }}>
									이번 개정은 보안 시스템 강화와 접속 로그 보관 주기 연장(6개월 →
									1년)을 주요 내용으로 하고 있습니다. 변경된 약관의 전체 내용은
									고객센터 메뉴의 '약관 전체보기'를 통해 확인하실 수 있습니다.
								</p>

								<p style={{ marginBottom: "20px" }}>
									개정일에 서비스 이용 중이신 경우 본 변경 사항에 동의하신 것으로
									간주됩니다. 동의하지 않으실 경우 회원 탈퇴를 요청하실 수
									있습니다.
								</p>
							</>
						)}

						<p style={{ marginBottom: "40px" }}>
							항상 디쥬릿을 이용해 주셔서 감사합니다.
							<br />
							<br />
							<strong>디쥬릿팀 드림</strong>
						</p>
					</section>

					{/* 하단 버튼 */}
					<button
						style={{
							width: "100%",
							padding: "15px",
							backgroundColor: "#f2f4f6",
							border: "none",
							borderRadius: "8px",
							color: "#4e5968",
							fontWeight: "bold",
							cursor: "pointer",
							marginBottom: "50px",
						}}
					>
						목록으로 돌아가기
					</button>
				</div>
			)}

			{/* 2번 퀴즈일 때 (나중에 1번 풀고 일로 넘어올 거야) */}
			{id === "2" && (
				<div
					style={{
						padding: "20px",
						maxWidth: "500px",
						margin: "0 auto",
						fontFamily: "sans-serif",
						color: "#333",
						lineHeight: "1.6",
					}}
				>
					{/* 헤더 섹션 */}
					<div style={{ marginBottom: "30px" }}>
						<h2
							style={{
								fontSize: "1.2rem",
								fontWeight: "bold",
								marginBottom: "8px",
							}}
						>
							[공지] 시스템 점검에 따른 서비스 일시 중단 안내
						</h2>
						<p style={{ color: "#999", fontSize: "0.9rem" }}>2026. 02. 09</p>
					</div>

					<hr
						style={{
							border: "0",
							borderTop: "1px solid #eee",
							marginBottom: "30px",
						}}
					/>

					{/* 본문 섹션 */}
					<section style={{ fontSize: "1rem" }}>
						<p style={{ marginBottom: "20px" }}>안녕하세요, 디쥬릿입니다.</p>

						{type === "a" ? (
							/* --- D안: 일반 문단형 공지 (대조군) --- */
							<>
								<p style={{ marginBottom: "20px" }}>
									디쥬릿은 더욱 안정적인 서비스 제공과 서버 최적화를 위하여
									다가오는 2월 14일 토요일에 시스템 정기 점검을 실시할 예정입니다.
									이번 점검은 새벽 시간인 오전 2시부터 오전 6시까지 총 4시간 동안
									진행될 예정이며, 점검이 진행되는 동안에는 디쥬릿 앱 접속 및 모든
									서비스 이용이 일시적으로 중단되오니 회원님들의 양해를
									부탁드립니다.
								</p>
								<p style={{ marginBottom: "20px" }}>
									특히 이번 점검 과정에서는 데이터베이스 보안 업데이트와 함께 서버
									로그 최적화 작업이 병행됩니다. 이로 인해 점검 시간 동안에는 푸시
									알림 수신이 지연될 수 있으며, 점검 완료 직후에는 일시적인 접속량
									증가로 인해 로딩 속도가 평소보다 느려질 수 있습니다.
								</p>
								<p style={{ marginBottom: "20px" }}>
									회원님들께서는 서비스 이용에 차질이 없도록 점검 시간을 미리
									확인해 주시기 바라며, 작업 상황에 따라 점검 종료 시간이 다소
									앞당겨지거나 지연될 수 있음을 알려드립니다. 관련하여 문의사항이
									있으실 경우 고객센터를 통해 접수해 주시면 점검 종료 후
									순차적으로 답변해 드리겠습니다.
								</p>
							</>
						) : (
							/* --- C안: 구조화된 공지 (실험군) --- */
							<>
								{/* 상단 요약 */}
								<div
									style={{
										backgroundColor: "#f2f4f6",
										padding: "15px 20px",
										borderRadius: "12px",
										marginBottom: "25px",
									}}
								>
									<p
										style={{
											margin: 0,
											fontSize: "0.95rem",
											fontWeight: "600",
										}}
									>
										내용 요약: 2월 14일(토) 새벽 2시~6시 정기 점검으로 인해
										서비스가 중단됩니다.
									</p>
								</div>

								<h3
									style={{
										fontSize: "1.05rem",
										fontWeight: "bold",
										marginBottom: "10px",
									}}
								>
									1. 점검 상세 일정
								</h3>
								<ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
									<li style={{ marginBottom: "5px" }}>
										<b>일시:</b> 2026년 2월 14일(토) 02:00 ~ 06:00 (4시간)
									</li>
									<li style={{ marginBottom: "5px" }}>
										<b>영향:</b> 앱 접속 및 모든 서비스 이용 불가
									</li>
								</ul>

								<h3
									style={{
										fontSize: "1.05rem",
										fontWeight: "bold",
										marginBottom: "10px",
									}}
								>
									2. 주요 작업 및 참고사항
								</h3>
								<ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
									<li style={{ marginBottom: "5px" }}>
										DB 보안 업데이트 및 서버 최적화
									</li>
									<li style={{ marginBottom: "5px" }}>
										점검 중 푸시 알림 수신 지연 가능성
									</li>
									<li style={{ marginBottom: "5px" }}>
										상황에 따라 종료 시간 변동 가능
									</li>
								</ul>
							</>
						)}

						<p style={{ marginBottom: "40px" }}>
							안전하고 쾌적한 서비스를 위해 최선을 다하겠습니다.
							<br />
							<br />
							<strong>디쥬릿팀 드림</strong>
						</p>
					</section>

					{/* 하단 버튼 */}
					<button
						style={{
							width: "100%",
							padding: "15px",
							backgroundColor: "#f2f4f6",
							border: "none",
							borderRadius: "8px",
							color: "#4e5968",
							fontWeight: "bold",
							cursor: "pointer",
							marginBottom: "50px",
						}}
					>
						목록으로 돌아가기
					</button>
				</div>
			)}
		</div>
	);
}
