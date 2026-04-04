# seminar-kit Skill

HTML 기반 세미나 발표 자료 관리 + GitHub Pages 호스팅.
**md = 내용 원본 / html = 표현 원본 / pdf = 결과물**

## Quick Reference

| Task | Guide |
|------|-------|
| 슬라이드 내용 수정/추가 | Read [html-conventions.md](html-conventions.md) |
| 디자인/스타일 변경 | Read [css-reference.md](css-reference.md) |
| 디자인 아이디어 | Read [design-guide.md](design-guide.md) |

---

## 구조

```
slides/latest.md          ← 사용자 편집 (내용 원본, AI는 읽기만)
public/latest.html        ← AI 편집 (reveal.js 프레젠테이션)
public/styles.css         ← AI 편집 (테마)
public/index.html         ← 랜딩 페이지 (거의 수정 안 함)
scripts/generate-pdf.js   ← PDF 변환 (수정 안 함)
.github/workflows/        ← CI/CD (수정 안 함)
```

---

## 워크플로우

1. 사용자가 `slides/latest.md` 수정
2. AI가 md를 참조하여 `public/latest.html` 수정
3. push → GitHub Actions가 PDF 생성 → Pages 배포

---

## 로컬 미리보기

```bash
cd public && python3 -m http.server 8765
# http://localhost:8765/latest.html
```

> `file://`로 직접 열면 CDN 로드 실패. 반드시 HTTP 서버 경유.

---

## 기술 스택

- **reveal.js v5.1.0** (CDN, 로컬 설치 없음)
- **Noto Sans KR** (Google Fonts CDN)
- **Playwright** (PDF 생성, `?print-pdf` 모드)
- **GitHub Pages** (Actions artifact 배포)

---

## QA (Required)

슬라이드 수정 후 반드시 시각적 확인을 수행한다.

### 미리보기 확인

```bash
cd public && python3 -m http.server 8765
```

Playwright MCP가 가능하면:
1. `http://localhost:8765/latest.html`로 navigate
2. 각 슬라이드 스크린샷 촬영 (`ArrowRight`로 이동)
3. fragment 애니메이션도 확인 (클릭마다 `ArrowRight`)

### 체크리스트

- 모든 슬라이드가 뷰포트(1280x720) 안에 들어오는가
- fragment 순서가 `slides/latest.md`의 애니메이션 순서와 일치하는가
- 텍스트가 잘리거나 겹치지 않는가
- 한국어 폰트가 정상 렌더링되는가
- 컬럼 레이아웃이 균등하게 배치되는가

---

## 주의사항

1. `slides/latest.md`는 **읽기만** — 사용자 관리 원본
2. HTML 수정 시 **기존 CSS 클래스 재활용** 우선 ([css-reference.md](css-reference.md) 참조)
3. `<!-- Slide N: 제목 -->` 주석 반드시 유지
4. reveal.js CDN 버전 `@5.1.0` 고정, 임의 변경 금지
5. `public/latest.pdf`는 `.gitignore` 대상 — 커밋하지 않음
