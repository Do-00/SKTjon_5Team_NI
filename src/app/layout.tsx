import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { MSWProvider as MSWComponent } from "./MSWComponent";

// NOTE: 디자인 시스템의 A2Z 디스플레이 서체(700/900)는 추출된 TTF 바이너리가
// 잘려 있어(196,608바이트 절단) next/font/local 로딩이 불가능하다. 완전한
// 원본을 확보하면 localFont({ variable: "--font-a2z" })를 복원할 것.
// 그 전까지 디스플레이 서체는 globals.css의 --font-display 폴백 스택
// (Noto Sans KR 굵은 웨이트)을 사용한다.
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "에코체크",
    template: "%s | 에코체크",
  },
  description:
    "주소 하나로 건물 에너지 상태를 확인하고, 맞춤형 절감 방법과 지원사업을 찾아보세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MSWComponent>{children}</MSWComponent>
      </body>
    </html>
  );
}
