# seminar-kit

HTML 기반 세미나 자료 관리 + GitHub Pages 호스팅

## 구조

```
slides/latest.md     ← 내용 원본 (사용자 편집)
public/latest.html   ← 표현 원본 (AI 편집, reveal.js)
public/latest.pdf    ← 결과물 (CI 자동 생성)
```

## 워크플로우

1. `slides/latest.md` 수정 (발표 내용 작성)
2. AI가 `public/latest.html` 수정 (reveal.js 슬라이드)
3. `main`에 push → GitHub Actions가 PDF 생성 + Pages 배포

## 로컬 미리보기

`public/latest.html`을 브라우저에서 열면 바로 확인 가능.

- 방향키로 슬라이드 이동
- `?print-pdf` 쿼리 파라미터로 인쇄 레이아웃 확인

## 기술 스택

- [reveal.js](https://revealjs.com/) v5 (CDN)
- [Playwright](https://playwright.dev/) (PDF 생성)
- GitHub Actions + GitHub Pages

## GitHub Pages 설정

저장소 Settings → Pages → Source를 **GitHub Actions**로 설정
