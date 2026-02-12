import { useState, useEffect } from "react";

/**
 * @description 사용자가 페이지를 읽기 위해 화면을 조작(스크롤 등)했는지 감지하는 훅입니다.
 */
export function useUserInteraction() {
  // 사용자의 움직임 여부를 저장 (기본값: false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    // 이미 움직임이 감지되었다면 불필요한 감시를 하지 않고 종료합니다.
    if (hasUserInteracted) return;

    // 상호작용이 확인되면 상태를 true로 변경하는 함수
    const mark = () => setHasUserInteracted(true);

    const onWheel = () => mark();
    const onTouchMove = () => mark();
    
    /** @description 키보드 입력 중 스크롤과 관련된 키만 체크합니다. */
    const onKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = ["ArrowDown", "PageDown", " ", "End"];
      if (scrollKeys.includes(e.key)) mark();
    };

    // 브라우저에 스크롤 의도를 파악하기 위한 이벤트 리스너를 등록합니다.
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    // [Clean-up] 컴포넌트가 사라질 때 브라우저 메모리 관리를 위해 리스너를 제거합니다.
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [hasUserInteracted]);

  return hasUserInteracted;
}