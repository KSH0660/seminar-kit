# seminar-kit Skill

HTML 기반 세미나 발표 자료 관리 + GitHub Pages 호스팅.
**js = source of truth / html·pptx·pdf = 생성물**

## Quick Reference

| Task | Guide |
|------|-------|
| 슬라이드 내용 수정/추가 | `slides/latest.js` 편집 후 `npm run build:html` |
| 디자인/스타일 변경 | Read [css-reference.md](css-reference.md) |
| 디자인 아이디어 | Read [design-guide.md](design-guide.md) |
| HTML 컨벤션 (참고) | Read [html-conventions.md](html-conventions.md) |

---

## 구조

```
slides/latest.js              ← source of truth (슬라이드 정의)
scripts/build-html.js          ← JS → HTML 빌드
scripts/build-pptx.js          ← JS → PPTX 빌드
scripts/generate-pdf.js        ← HTML → PDF 빌드
scripts/build.js               ← 오케스트레이터 (전체 빌드)
scripts/lib/html-renderer.js   ← 콘텐츠 블록 → HTML
scripts/lib/pptx-renderer.js   ← 콘텐츠 블록 → PPTX
scripts/lib/html-utils.js      ← HTML → 텍스트 유틸
public/styles.css              ← AI 편집 (테마)
public/index.html              ← 랜딩 페이지 (거의 수정 안 함)
.github/workflows/             ← CI/CD (수정 안 함)
```

---

## 워크플로우

1. `slides/latest.js` 수정 (슬라이드 추가/변경/삭제)
2. `npm run build:html` → `public/latest.html` 생성
3. 로컬 미리보기로 확인
4. push → GitHub Actions가 HTML, PDF, PPTX 생성 → Pages 배포

---

## 빌드 명령어

```bash
npm run build          # 전체 빌드 (HTML → PDF + PPTX)
npm run build:html     # JS → HTML만
npm run build:pptx     # JS → PPTX만
npm run build:pdf      # HTML → PDF만 (HTML 빌드 선행 필요)
```

---

## 로컬 미리보기

```bash
npm run build:html
cd public && python3 -m http.server 8765
# http://localhost:8765/latest.html
```

> `file://`로 직접 열면 CDN 로드 실패. 반드시 HTTP 서버 경유.

---

## 슬라이드 JS 구조

```js
export default {
  title: '발표 제목',
  revealConfig: { width: 1280, height: 1080, ... },
  slides: [
    {
      id: 'slide-00',
      type: 'title',           // 'title' | 'standard'
      title: '제목',
      subtitle: '부제',
    },
    {
      id: 'slide-01',
      type: 'standard',
      title: '슬라이드 제목',
      content: [
        { type: 'timeline', items: [...] },
        { type: 'journey-flow', fragment: 1, nodes: [...] },
        { type: 'two-column', columns: [{ html: '...' }, { html: '...' }] },
        { type: 'table', headers: [...], rows: [...] },
        { type: 'metric-highlight', big: '99.7%', text: '설명' },
        { type: 'html', html: '<p>자유 형식</p>' },
      ],
    },
  ],
};
```

### 콘텐츠 블록 타입

| Type | 주요 속성 |
|------|----------|
| `timeline` | `items: [{period, org, desc, current?}]` |
| `journey-flow` | `nodes: [{text, accent?}]` |
| `two-column` | `columns: [{html, className?, fragment?}]` |
| `three-column` | `columns: [{html}]`, `heading?` |
| `table` | `headers?, rows, className?, highlightRows?` |
| `metric-highlight` | `big, text?, compare?, after?` |
| `html` | `html` (raw HTML pass-through) |

공통 옵션: `fragment?: number`, `style?: string`, `className?: string`

---

## 기술 스택

- **reveal.js v5.1.0** (CDN, 로컬 설치 없음)
- **Noto Sans KR** (Google Fonts CDN)
- **pptxgenjs** (PPTX 생성)
- **Playwright** (PDF 생성, `?print-pdf` 모드)
- **GitHub Pages** (Actions artifact 배포)

---

## QA (Required)

슬라이드 수정 후 반드시 시각적 확인을 수행한다.

### 미리보기 확인

```bash
npm run build:html
cd public && python3 -m http.server 8765
```

Playwright MCP가 가능하면:
1. `http://localhost:8765/latest.html`로 navigate
2. 각 슬라이드 스크린샷 촬영 (`ArrowRight`로 이동)
3. fragment 애니메이션도 확인 (클릭마다 `ArrowRight`)

### 체크리스트

- 모든 슬라이드가 뷰포트(1280x720) 안에 들어오는가
- fragment 순서가 올바른가
- 텍스트가 잘리거나 겹치지 않는가
- 한국어 폰트가 정상 렌더링되는가
- 컬럼 레이아웃이 균등하게 배치되는가

---

## 주의사항

1. `slides/latest.js`가 **유일한 source of truth** — HTML/PPTX/PDF는 모두 생성물
2. `public/latest.html`, `public/latest.pptx`는 `.gitignore` 대상
3. HTML 수정 시 **기존 CSS 클래스 재활용** 우선 ([css-reference.md](css-reference.md) 참조)
4. reveal.js CDN 버전 `@5.1.0` 고정, 임의 변경 금지
5. `public/latest.pdf`도 `.gitignore` 대상 — 커밋하지 않음
