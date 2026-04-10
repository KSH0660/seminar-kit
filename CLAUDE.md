# CLAUDE.md

이 레포지토리에서 작업하는 AI 에이전트를 위한 컨텍스트 문서입니다.

## 프로젝트 개요

HTML(reveal.js) 기반 세미나 발표 자료를 관리하고 GitHub Pages로 배포하는 시스템입니다. `package.json`은 없으며, Node.js 의존성(Playwright)은 CI에서만 설치됩니다.

## 디렉토리 구조

```
public/                           ← GitHub Pages로 배포되는 정적 파일 루트
├── index.html                    ← 랜딩 페이지 (세미나 갤러리, 수정 거의 없음)
├── landing.css / landing.js      ← 랜딩 페이지 스타일/스크립트
├── seminars.json                 ← 세미나 메타데이터 매니페스트
├── styles.css                    ← reveal.js 공통 테마 (CSS 변수 기반)
├── latest.html                   ← 최신 세미나로 리다이렉트 (CI가 자동 갱신)
└── seminars/{id}/
    ├── slides.html               ← reveal.js 슬라이드 (주요 편집 대상)
    └── slides.pdf                ← CI 자동 생성 (gitignored)

scripts/
├── generate-pdf.js               ← Playwright로 slides.html → slides.pdf 변환
└── update-latest-redirect.js     ← seminars.json 첫 항목 기준으로 latest.html 갱신

seminar-kit-skill/                ← 슬라이드 편집 시 참조할 가이드
├── SKILL.md                      ← 퀵 레퍼런스 (워크플로우, QA 체크리스트)
├── html-conventions.md           ← HTML 구조 규칙 (section, fragment 등)
├── css-reference.md              ← CSS 클래스 사전 (레이아웃, 강조, 텍스트 등)
└── design-guide.md               ← 디자인 원칙 및 컬러 팔레트

.agents/skills/pptx/              ← PPTX 생성 관련 스킬 (별도 용도)
.github/workflows/build.yml      ← CI/CD 파이프라인
.claude/settings.local.json      ← Claude Code 권한 설정
```

## 기술 스택

- **reveal.js v5.1.0** — CDN(`cdn.jsdelivr.net`)으로 로드, 로컬 설치 없음. 버전 고정, 임의 변경 금지
- **Noto Sans KR** — Google Fonts CDN, 한국어 기본 폰트
- **Playwright** — CI에서 `?print-pdf` 모드로 PDF 생성. 로컬에는 설치 불필요
- **GitHub Actions + GitHub Pages** — `main` push 시 `public/` 전체를 빌드·배포
- **Node.js 20** — CI 런타임 (스크립트 실행용)

## 슬라이드 편집 규칙

### HTML 구조

```html
<!-- Slide N: 슬라이드 제목 -->
<section data-slide-id="slide-NN">
  <h2>제목</h2>
  <!-- Entry: 진입 시 바로 보이는 콘텐츠 -->
  <p>내용</p>
  <!-- Click 1 -->
  <div class="fragment" data-fragment-index="1">...</div>
</section>
```

- `<!-- Slide N: 제목 -->` 주석 필수 유지
- `data-slide-id="slide-NN"` 순번 순차적으로 유지
- Fragment: 블록은 `<div class="fragment">`, 인라인은 `<span class="fragment">`
- 같은 `data-fragment-index` 공유 시 동시 표시

### CSS 컨벤션

- 기존 CSS 클래스를 **재활용 우선** (`seminar-kit-skill/css-reference.md` 참조)
- 테마 색상은 `styles.css`의 `:root` CSS 변수로 관리
- 새 스타일이 필요하면 `styles.css`에 추가 (인라인 스타일 지양)
- 뷰포트: 1280×1080

### 주요 CSS 변수

```css
--color-text: #1a1a2e;           /* 본문 */
--color-accent: #1428a0;         /* 강조 (Samsung Blue) */
--color-accent-light: #e8ebf7;   /* 강조 연한 (배경용) */
--color-muted: #6b7280;          /* 보조 텍스트 */
--color-border: #d1d5db;         /* 테두리 */
--color-success: #059669;        /* 성공 */
--color-fail: #dc2626;           /* 실패 */
```

## seminars.json 구조

```json
{
  "seminars": [
    {
      "id": "2026-04-agentic-ai",
      "title": "제목",
      "subtitle": "부제목",
      "date": "2026-04",
      "description": "설명",
      "slideCount": 17,
      "tags": ["LLM", "Agentic AI"]
    }
  ]
}
```

- 배열 첫 번째 항목이 **최신 세미나**로 취급됨 (`latest.html` 리다이렉트, `latest.pdf` 복사 대상)
- `id`는 `public/seminars/` 하위 디렉토리명과 일치해야 함

## CI/CD 파이프라인

- **트리거**: `main` 브랜치 push (`public/**`, `scripts/**`, `.github/workflows/**` 변경 시)
- **빌드 단계**: 한국어 폰트 설치 → Playwright 설치 → PDF 생성 → latest.html 갱신 → Pages 배포
- `slides.pdf`는 CI가 생성하므로 **커밋하지 않음** (`.gitignore` 대상)

## 로컬 미리보기

```bash
cd public && python3 -m http.server 8765
# http://localhost:8765/seminars/{id}/slides.html
```

`file://` 프로토콜로는 CDN 리소스 로드가 실패하므로 반드시 HTTP 서버 경유.

## QA 체크리스트

슬라이드 수정 후 반드시 확인:

- 모든 슬라이드가 뷰포트(1280×1080) 안에 들어오는지
- Fragment 순서가 의도와 일치하는지
- 텍스트가 잘리거나 겹치지 않는지
- 한국어 폰트가 정상 렌더링되는지
- 컬럼 레이아웃이 균등하게 배치되는지

Playwright MCP 사용 가능 시 스크린샷으로 시각적 확인 수행.

## 주의사항

1. `seminar-kit-skill/` 내 가이드 파일들은 슬라이드 편집 시 **반드시 참조**
2. reveal.js CDN 버전 `@5.1.0` **고정** — 임의 변경 금지
3. `latest.html`과 `latest.pdf`는 CI가 자동 관리 — 수동 편집 불필요
4. `index.html`, `landing.css`, `landing.js`는 랜딩 페이지 전용 — 슬라이드와 무관
5. `scripts/` 하위 파일은 CI 전용 — 일반적으로 수정 불필요
