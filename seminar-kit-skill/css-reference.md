# CSS 클래스 레퍼런스 (public/styles.css)

## 컬러 시스템

```css
--color-text: #1a1a2e         /* 본문 */
--color-accent: #1428a0       /* 강조 (Samsung blue) */
--color-accent-light: #e8ebf7 /* 강조 연한 (배경용) */
--color-muted: #6b7280        /* 보조 텍스트 */
--color-border: #d1d5db       /* border */
--color-success: #059669      /* 성공 */
--color-fail: #dc2626         /* 실패 */
```

테마 변경: `:root` CSS 변수만 수정하면 전체 적용.

## 레이아웃

| 클래스 | 용도 |
|--------|------|
| `.two-column` | 2열 그리드 (`<div class="two-column"><div>좌</div><div>우</div></div>`) |
| `.three-column` | 3열 그리드 |
| `.flow-vertical` | 세로 흐름도 (`.flow-arrow`와 함께) |
| `.timeline` | 커리어 타임라인 (`.timeline-item` > `.timeline-period` + `.timeline-org` + `.timeline-desc`) |
| `.journey-flow` | 가로 여정 (`.journey-node` + `.journey-arrow`) |
| `.architecture-diagram` | 아키텍처 (`.arch-orchestrator` + `.arch-skills` > `.arch-skill`) |

## 강조/데이터

| 클래스 | 용도 |
|--------|------|
| `.metric-highlight` | 수치 강조 블록 (좌측 파란 border) |
| `.metric-big` | 큰 수치 |
| `.metric-compare` | 비교 수치 (작은 회색) |
| `.metric-inline` | 인라인 수치 |
| `.takeaway` | 핵심 포인트 (파란 볼드) |
| `.problem` | 문제 영역 (빨간 border) |
| `.fail-mark` | ✗ 마크 (빨간) |
| `.world-context` | 외부 맥락 박스 (연한 파란 배경) |

## 텍스트

| 클래스 | 용도 |
|--------|------|
| `.bridge` | 브릿지 (하단 이탤릭) |
| `.slide-date` | 날짜/부제 |
| `.slide-subtitle` | 부제목 |
| `.sub-note` | 보조 텍스트 |
| `.footnote` | 각주 |

## 테이블

| 클래스 | 용도 |
|--------|------|
| `.fit-table` | 기본 테이블 |
| `.results-table` | 결과 비교 |
| `.highlight-row` | 강조 행 |
| `.metric-cell` | 수치 셀 (우정렬, 볼드) |
| `.metric-cell.accent` | 파란 강조 수치 |
