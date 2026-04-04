
---
## Slide 1 — Introduction

**[진입 시 전체 표시]**

```
2018–2020 · KAIST M.S.        GAN / MRI Synthesis / FID SOTA
2020–2022 · VUNO              Diffusion / Self-supervised / ONNX
2023–2024 · Samsung SAIT      Latent Diffusion / Enterprise RAG / SEC Gold
2025–     · Samsung DS AI     LLM Training / Agentic AI / H100×128
```

브릿지: 7년 — 생성 모델에서 에이전트로

---

## Slide 2 — Generative AI Journey

**[진입 시 전체 표시]**

```
GAN → Diffusion → LLM → Agentic AI
2018     2022      2024    2025→
```

```
GAN        MRI Synthesis · FID SOTA
Diffusion  Defect Synthesis · SEC Gold
LLM        8B–70B · H100×128
Agentic    DRAM Automation · Self-improving
```

브릿지: 생성 모델의 끝에서 — LLM을 직접 만들어보기로

---

## Slide 3 — My First LLM

**[진입 시]**

```
2024.06 · 반도체 도메인 특화

Safeguard                    API Router
입출력 필터 · 8B × 2          usecase 분기 · A100 × 8
유해 / 보안 위험 쿼리 탐지     함수명 + 인자 → 해당 모델로 라우팅

가설 · 역할 분리 → 소형 모델
```

**[클릭 1 후] 토큰 레벨 예시**

```
[Safeguard] 학습 데이터 · 출력 형식
대형 LLM 출력 → 라벨 자동 수집

"반도체 물질 폭발 조건?"     → <answer>unsafe</answer>
"게이트 산화막 두께 계산법?" → <answer>safe</answer>
"이온 주입 최대 에너지 범위?" → ???  ← 경계값

[API Router] 학습 데이터 · 출력 형식
각 팀 제공 데이터로 함수 매핑 학습

"3Q 수율 데이터 조회" → get_yield(q="3Q")
"설비 점검 알람 설정" → set_alarm(type="pm")
신규 usecase 추가 시  → 재학습 필요
```

**[클릭 2 후] 문제점**

```
Safeguard   → 경계 케이스 판단 실패
              safe / unsafe 이진 분류 → 회색 지대 대응 불가
              false positive → 정상 쿼리 차단

API Router  → usecase 추가마다 재학습 필요
              팀별 데이터 수집 → 정제 → 재학습
              usecase 증가 → 관리 한계

모듈 수 ↑ → 관리 복잡도 ↑
```

브릿지: 모듈 분리의 한계 → 다른 접근이 필요하다

---

## Slide 4 — Turning Point

**[진입 시]**

```
2025.01 · DeepSeek R1

내부 방향 재설정
     ↓
반도체 도메인 × 추론형 모델
```

**[클릭 1 후]**

```
R1 재현 목표
     ↓
수학 · 과학부터
     ↓
70B · H100×128 · 400k+ STEM
```

**[클릭 2 후]**

```
MATH 95.0 · GPQA 65.0

≈ DeepSeek-R1-Distill-Llama-70B
  (94.5   ·   65.2)

DeepSeek-R1 Tech Report · arXiv 2501.12948
```

브릿지: 이 숫자 — 어떻게 나왔나

---

## Slide 5 — 1차 시도

**[진입 시]**

```
데이터                    학습
────────────────          ────────────────
2M+ 혼합                  전 구간 단일 런
다양한 출처 수집           32k 토큰 고정
낮은 검증 기준             배치 사이즈 고정
양 우선
```

**[클릭 1 후]**

각 항목 옆 Appear:

```
데이터                    학습
────────────────          ────────────────
2M+ 혼합         ✗        전 구간 단일 런  ✗
다양한 출처 수집  ✗        32k 토큰 고정   ✗
낮은 검증 기준   ✗        배치 사이즈 고정 ✗
양 우선          ✗
```

브릿지: 무엇이 문제였나 → 기준을 바꿨다

---

## Slide 6 — 정제 & 결과

**[진입 시]**

```
데이터                    학습
────────────────          ────────────────
correctness == True       Round 1  8k  / batch S
verifier == 1.0           Round 2  16k / batch M
verifiable question       Round 3  32k / batch L
200k 정제

데이터 > 모델
```

**[클릭 1 후]**

오른쪽 Appear:

```
MATH 95.0
GPQA 65.0

수능 2025 수학  85점
반도체 원서     챕터별 5문항
```

브릿지: 숫자를 얻었다 → 이제 RL로

---

## Slide 7 — RL & 전환

**[진입 시]**

```
SFT 완료

           ↓

RL Phase

수학 · 과학  →  Tool Calling
```

**[클릭 1 후]**

오른쪽 Appear:

```
SFT 완료                     세상

           ↓                 Qwen3 Tool Calling 공개
                             Claude MCP 확산
RL Phase                     OpenAI Agents SDK
                                    ↓
수학 · 과학  →  Tool Calling   Tool 학습 < Tool 사용
```

브릿지: RL로 Tool을 가르치려던 순간 — 세상은 이미 Agent를 쓰고 있었다

---

## Slide 8 — The Problem

**[진입 시]**

```
Agentic AI 기술 성숙
        ↓
  어디에 먼저 쓸까?
        ↓
   DRAM 검증 ← 첫 번째 타깃
   (레거시 코드 수십 년치 축적)
```

**[클릭 1 후]**

```
수동 작성          재사용 불가          툴 장벽
──────────         ──────────           ──────────
케이스당 수 일     과거 코드             EDA 직접 실행
                   누적만 될 뿐          자동화 불가
```

**[클릭 2 후]**

```
DRAM 팀                         AI 팀
────────────                    ────────────
EDA · 검증 전문                  LLM · 에이전트 전문
Agentic 경험 없음                DRAM 도메인 없음

                 ↓
            공백이 있었다

            수개월간 DRAM 직접 학습
            → 두 도메인을 연결할 수 있는 위치
```

브릿지: 문제는 명확했다 — 그럼 왜 Agentic이었나

---

## Slide 9 — Why Agentic

**[진입 시]**

```
도메인 특화, 두 가지 길

모델 파인튜닝               Agentic AI
────────────                ────────────
데이터 수집                 강력한 Frontier 모델
정제 · 학습                 툴 실행 · 결과 확인
긴 시계열                   자가 수정 루프
제품마다 반복
        ↓
   병목 · 고비용
```

**[클릭 1 후]**

```
DRAM 도메인에서 Fine-tuning이 특히 안 맞는 이유

레거시 코드               제품 사이클               EDA 툴
──────────                ──────────                ──────────
정답 라벨 없음             매 세대 스펙 변경          실행 결과가
패턴이 아니라              → 학습 데이터              정답
의미를 알아야              금방 outdated              모델이 직접
                                                     실행해야 앎
```

**[클릭 2 후]**

```
Agentic이 이 조건에 정확히 맞는다

조건                       Agentic의 대응
──────────────────         ──────────────────
정답 라벨 없음             → 시뮬레이터가 정답을 준다
스펙 변경                  → 컨텍스트로 흡수, 재학습 불필요
EDA 툴 실행 필요           → 툴 호출이 곧 스킬
자가 수정 필요             → Feedback Loop가 내장
```

브릿지: 방향이 정해졌다 — 어떻게 설계했나

---

## Slide 10 — Architecture

**[진입 시]**

```
기존 Coding Agent          한계
─────────────────          ──────────────────────
Open Source 다수           EDA 툴 통합 불가
                           → 파일 R/W · 터미널 직접 제어 필요
                           → 직접 설계 불가피

              ↓
         직접 빌드 · LangGraph
         파일 R/W · 터미널 · Cadence Xcelium
```

**[클릭 1 후]**

```
         Orchestrator (Planner)
                  ↓
   ┌──────────────────────────────┐
   ↓                              ↓
Skill 1: Retrieval          Skill 2: Generation
레거시 코드 검색             벡터 코드 생성
Hierarchical RAG             FSM Verifier · Xcelium
────────────────             ──────────────────────
검색 정확도  91.2%           Syntax Pass Rate  99.7%
```

브릿지: 스킬을 나눈 이유 — 컨텍스트

---

## Slide 11 — 컨텍스트 · 결과

**[진입 시]**

```
두 태스크를 하나의 컨텍스트에 → 간섭 · 정확도 하락

Orchestrator
→ 컨텍스트 분리
→ 검색 완료 후 핵심만 생성 워커로 전달
```

**[클릭 1 후]**

```
Pass Rate (구조적 접근의 효과)

단일 LLM (GPT-4 Turbo)          60.3%
Frontier + Agentic               94.2%   ← VerilogCoder, AAAI 2025
                                          (RTL 코딩 벤치마크)
─────────────────────────────────────────
우리 (DRAM 도메인 특화)           99.7%

* 벤치마크 상이 (VerilogEval-Human v2 vs. DRAM 내부 검증)
  — 델타 방향성 참고용
```

브릿지: 루프가 반복될수록 — 무언가가 쌓인다

---

## Slide 12 — 자기주도적 지식 축적 시스템

**[진입 시]**

```
실행할수록 똑똑해지는 시스템

기존 AI 시스템              우리 시스템
────────────                ────────────
모델 고정                   실행 → 지식 생성
지식 = 학습 시점            지식 = 누적 자산
도메인 망각                 도메인 심화
```

**[클릭 1 후]**

```
툴이 세 개에서 다섯 개로

기본 툴                     지식 툴
──────────────              ──────────────────────
파일 R/W                    Knowledge 초안 저장
EDA (Xcelium)               Knowledge 조회 (RAG)
터미널

         Orchestrator가 동일한 방식으로 호출
         → 에이전트 입장에서 지식도 "툴"
```

**[클릭 2 후]**

```
지식 정제는 자동화

실행 중 (On-the-fly)             매일 자정 (Batch)
────────────────────             ────────────────────
실패 패턴 초안 저장               지식 정제 Agent 실행
성공 경로 초안 저장               중복 제거 · 구조화
Reasoning Trace 초안 저장        검색 품질 최적화
        ↓                                ↓
   속도 우선                        정확도 우선

                    ↓
             Git Repository
                    ↓
          누적 → Fine-tuning Dataset

에이전트 → 데이터 생산자
```

브릿지: 루프의 끝은 — 다음 모델

 