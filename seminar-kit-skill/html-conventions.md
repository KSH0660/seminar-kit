# HTML 컨벤션 (public/latest.html)

## 슬라이드 기본 구조

```html
<!-- Slide N: 슬라이드 제목 -->
<section data-slide-id="slide-NN">
  <h2>제목</h2>

  <!-- Entry: 진입 시 바로 보이는 콘텐츠 -->
  <p>내용...</p>

  <!-- Click 1 -->
  <div class="fragment" data-fragment-index="1">
    <p>클릭 1에 나타남</p>
  </div>

  <!-- Click 2 -->
  <div class="fragment" data-fragment-index="2">
    <p>클릭 2에 나타남</p>
  </div>

  <p class="bridge">브릿지 텍스트</p>
</section>
```

## 규칙

1. **슬라이드 래퍼**: `<section data-slide-id="slide-NN">`
2. **주석 필수**: `<!-- Slide N: 제목 -->`, `<!-- Entry -->`, `<!-- Click N -->`
3. **Fragment**:
   - 블록 요소: `<div class="fragment" data-fragment-index="N">`
   - 인라인 요소: `<span class="fragment fail-mark" data-fragment-index="N">`
   - 같은 `data-fragment-index`를 공유하면 동시에 나타남
4. **브릿지**: `<p class="bridge">` — 슬라이드 맨 아래, 다음 슬라이드 연결 문구
5. **한국어**: UTF-8 그대로. HTML 엔티티는 특수문자만 사용:
   - `&rarr;` `&larr;` `&darr;` `&uarr;` (화살표)
   - `&times;` (곱하기) `&middot;` (가운뎃점) `&ndash;` (대시)

## reveal.js 설정

```javascript
Reveal.initialize({
  hash: true,
  width: 1280, height: 720,    // 16:9
  margin: 0.05,
  transition: 'none',
  pdfSeparateFragments: false,  // PDF에서 fragment 합침
  center: true,
});
```

## 슬라이드 추가 절차

1. `slides/latest.md`에서 내용 확인 (읽기만)
2. `<div class="slides">` 안에 새 `<section>` 추가
3. `data-slide-id` 순번 맞추기
4. 기존 CSS 클래스 재활용 → 없으면 `styles.css`에 추가
