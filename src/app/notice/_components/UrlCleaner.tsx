'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function UrlCleaner() {
  const pathname = usePathname();

  useEffect(() => {
    // 페이지 로드 시 주소창에서 쿼리 스트링(?...)을 즉시 제거
    window.history.replaceState(null, '', pathname);
  }, [pathname]);

  return null; // 화면에는 아무것도 렌더링하지 않음
}