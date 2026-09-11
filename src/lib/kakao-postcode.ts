/**
 * Typed wrapper around the Kakao postcode service (우편번호 서비스).
 * https://postcode.map.kakao.com/guide
 *
 * The script is loaded with `next/script` (see `AddressSearch`); these types
 * describe the `window.kakao.Postcode` global it installs.
 */

export const KAKAO_POSTCODE_SRC = "https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

/** Payload passed to `oncomplete` when the user picks an address. */
export interface KakaoPostcodeData {
  zonecode: string;
  address: string;
  addressEnglish: string;
  /** Type of `address`: `R` = 도로명, `J` = 지번. */
  addressType: "R" | "J";
  /** Which address row the user actually clicked. */
  userSelectedType: "R" | "J";
  roadAddress: string;
  jibunAddress: string;
  /** Filled in when `roadAddress`/`jibunAddress` is empty because the match was ambiguous. */
  autoRoadAddress: string;
  autoJibunAddress: string;
  buildingName: string;
  /** 건물관리번호 (25 digits). */
  buildingCode: string;
  apartment: "Y" | "N";
  /** 시·도, e.g. `"서울"`, `"강원특별자치도"`. */
  sido: string;
  sigungu: string;
  sigunguCode: string;
  bname: string;
  /** 법정동코드 (10 digits). */
  bcode: string;
  roadname: string;
  query: string;
}

export interface KakaoPostcodeOptions {
  oncomplete: (data: KakaoPostcodeData) => void;
  onclose?: (state: "FORCE_CLOSE" | "COMPLETE_CLOSE") => void;
  width?: string | number;
  height?: string | number;
}

export interface KakaoPostcodeOpenOptions {
  /** Pre-filled search query. */
  q?: string;
  popupTitle?: string;
  /** Reuses one popup window instead of opening a new one per call. */
  popupKey?: string;
  autoClose?: boolean;
}

interface KakaoPostcode {
  open(options?: KakaoPostcodeOpenOptions): void;
  embed(element: HTMLElement, options?: Pick<KakaoPostcodeOpenOptions, "q" | "autoClose">): void;
}

declare global {
  interface Window {
    kakao?: {
      Postcode: new (options: KakaoPostcodeOptions) => KakaoPostcode;
    };
  }
}

/**
 * Opens the postcode popup. Call it synchronously from a click handler —
 * browsers block popups opened after an `await`.
 */
export function openKakaoPostcode(options: KakaoPostcodeOptions, openOptions?: KakaoPostcodeOpenOptions): void {
  const Postcode = window.kakao?.Postcode;
  if (!Postcode) {
    throw new Error("카카오 우편번호 스크립트가 아직 로드되지 않았어요.");
  }
  new Postcode(options).open(openOptions);
}

/** Builds the `/report?...` URL that looks the picked address up against the energy-grade API. */
export function toReportLookupHref(data: KakaoPostcodeData): string {
  const params = new URLSearchParams();
  const jibunAddress = data.jibunAddress || data.autoJibunAddress;
  const roadAddress = data.roadAddress || data.autoRoadAddress;
  if (jibunAddress) params.set("jibunAddress", jibunAddress);
  if (roadAddress) params.set("roadAddress", roadAddress);
  if (data.buildingName) params.set("buildingName", data.buildingName);
  if (data.sido) params.set("sido", data.sido);
  params.set("apartment", data.apartment);
  return `/report?${params.toString()}`;
}
