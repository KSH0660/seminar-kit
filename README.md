# Seminar Kit

HTML 기반 세미나 발표 자료를 관리하고 GitHub Pages로 자동 배포하는 도구입니다.

## 주요 기능

- **reveal.js 슬라이드** — 브라우저에서 바로 발표 가능한 HTML 프레젠테이션
- **PDF 자동 생성** — `main` push 시 CI가 Playwright로 PDF 변환
- **GitHub Pages 배포** — 별도 서버 없이 슬라이드와 PDF를 웹에 공개
- **세미나 아카이브** — 랜딩 페이지에서 모든 세미나를 카드형 갤러리로 탐색
- **다크 모드** — 시스템 설정 연동 및 수동 토글 지원

## 디렉토리 구조

```
public/
├── index.html                    ← 랜딩 페이지 (세미나 갤러리)
├── seminars.json                 ← 세미나 메타데이터 목록
├── styles.css                    ← reveal.js 공통 테마
├── latest.html                   ← 최신 세미나로 리다이렉트
└── seminars/{id}/
    ├── slides.html               ← reveal.js 슬라이드 (표현 원본)
    └── slides.pdf                ← CI가 자동 생성 (gitignored)
scripts/
├── generate-pdf.js               ← Playwright PDF 변환
└── update-latest-redirect.js     ← latest.html 리다이렉트 갱신
seminar-kit-skill/                ← AI 슬라이드 편집 가이드
```

## 워크플로우

```
내용 작성 → HTML 슬라이드 편집 → push → CI(PDF 생성 + Pages 배포)
```

1. 발표 내용을 구성합니다.
2. `public/seminars/{id}/slides.html`을 reveal.js 형식으로 작성합니다.
3. `main` 브랜치에 push하면 GitHub Actions가 PDF를 생성하고 Pages에 배포합니다.

## 로컬 미리보기

```bash
cd public && python3 -m http.server 8765
# http://localhost:8765/seminars/{id}/slides.html
```

> `file://`로 직접 열면 CDN 리소스 로드가 실패합니다. 반드시 HTTP 서버를 사용하세요.

- **방향키**: 슬라이드 이동
- **`?print-pdf`**: URL 뒤에 추가하면 인쇄용 레이아웃으로 전환
- **`L` 키**: 레이저 포인터 토글
- **`?` 키**: 키보드 단축키 도움말

## 새 세미나 추가

1. `public/seminars/{id}/slides.html` 생성 (기존 세미나를 템플릿으로 활용)
2. `public/seminars.json`에 세미나 메타데이터 추가 (배열 첫 번째 = 최신)
3. `main`에 push → PDF 생성 및 배포 자동 실행

## 기술 스택

| 기술 | 용도 |
|------|------|
| [reveal.js](https://revealjs.com/) v5.1.0 | 슬라이드 프레젠테이션 (CDN) |
| [Playwright](https://playwright.dev/) | PDF 변환 (CI에서 실행) |
| GitHub Actions | 빌드 및 배포 파이프라인 |
| GitHub Pages | 정적 호스팅 |
| Noto Sans KR | 한국어 폰트 (Google Fonts CDN) |

## GitHub Pages 설정

저장소 **Settings → Pages → Source**를 **GitHub Actions**로 설정하세요.
