export default {
  title: 'Generative AI에서 Agentic AI로',
  revealConfig: {
    hash: true,
    width: 1280,
    height: 1080,
    margin: 0.05,
    transition: 'none',
    pdfSeparateFragments: false,
    center: false,
    slideNumber: 'c/t',
  },
  slides: [
    // Slide 0: Title
    {
      id: 'slide-00',
      type: 'title',
      title: 'LLM을 학습하고<br>Agentic AI를 설계하다',
      subtitle: '2026 &middot; Samsung DS AI 센터',
    },

    // Slide 1: Introduction
    {
      id: 'slide-01',
      type: 'standard',
      title: 'Introduction',
      content: [
        {
          type: 'timeline',
          items: [
            { period: '2018 &ndash; 2020', org: 'KAIST M.S.', desc: '뇌 종양 영상 MRI 데이터 증강' },
            { period: '2020 &ndash; 2022', org: 'VUNO (전문연구요원)', desc: '다양한 의료 도메인 ML 모델 학습' },
            { period: '2023 &ndash; 2024', org: 'Samsung SAIT (구 종합기술원)', desc: '반도체 불량 영상 / 바이오 에피스 RAG' },
            { period: '2025 &ndash;', org: 'Samsung DS AI 센터', desc: 'LLM Training / Agentic AI', current: true },
          ],
        },
        {
          type: 'journey-flow',
          fragment: 1,
          nodes: [
            { text: 'GAN' },
            { text: 'Diffusion' },
            { text: 'LLM' },
            { text: 'Agentic AI', accent: true },
          ],
        },
        {
          type: 'two-column',
          fragment: 2,
          className: 'intro-topics',
          columnClassName: 'intro-topic-item',
          columns: [
            { html: '<p class="intro-topic-label">Topic 1</p><p class="intro-topic-title">LLM 학습</p>' },
            { html: '<p class="intro-topic-label">Topic 2</p><p class="intro-topic-title">Agentic AI 설계</p>' },
          ],
        },
      ],
    },

    // Slide 3: My First LLM
    {
      id: 'slide-03',
      type: 'standard',
      title: 'My First LLM',
      content: [
        {
          type: 'html',
          html: '<p class="slide-date">2024.06 &middot; 반도체 도메인 특화 &middot; 작은 LLM 학습부터 시작</p>',
        },
        {
          type: 'two-column',
          columns: [
            {
              html: `<h3>Safeguard</h3>
<p class="sub-note">입출력 필터 &middot; 유해 / 보안 위험 쿼리 탐지</p>
<div class="token-box">
  <span class="token-in">query</span>
  <span class="token-sep">&rarr;</span>
  <span class="token-out">&lt;answer&gt;safe/unsafe&lt;/answer&gt;</span>
</div>
<p class="sub-note" style="color:var(--color-fail); margin-top:0.4em;">&#9888; False positive 문제</p>`,
            },
            {
              html: `<h3>API Router</h3>
<p class="sub-note">usecase 분기 &middot; 함수명 + 인자 &rarr; 해당 모델로 라우팅</p>
<div class="token-box">
  <span class="token-in">query</span>
  <span class="token-sep">&rarr;</span>
  <span class="token-out">uc1_rag(query=~~)</span>
</div>
<p class="sub-note" style="color:var(--color-fail); margin-top:0.4em;">&#9888; Use case 확장 시 모델 재학습 필요</p>`,
            },
          ],
        },
        {
          type: 'html',
          html: `<div class="problem" style="font-size:0.82em; margin-top:0.6em;">
  모델 관리 복잡도 증가 &rarr; <strong>지속가능하지 않다고 판단</strong>
</div>
<p class="takeaway">공통 &middot; 8B 스케일 &nbsp;|&nbsp; A100 &times; 8</p>`,
        },
      ],
    },

    // Slide 4: Turning Point
    {
      id: 'slide-04',
      type: 'standard',
      title: 'Turning Point',
      content: [
        {
          type: 'html',
          html: '<p class="slide-date">2025.01 &middot; DeepSeek R1</p>',
        },
        {
          type: 'html',
          html: `<h3>R1 Insights</h3>
<ul>
  <li><strong>Insight 1</strong> &mdash; 뛰어난 모델 base에 명확한 reward를 설계해주면, 스스로 exploration을 한다</li>
  <li><strong>Insight 2</strong> &mdash; 비교적 작은 모델 base에는 스스로 exploration보다는 뛰어난 모델의 CoT를 입히는게 효과적이다</li>
</ul>`,
        },
        {
          type: 'html',
          fragment: 1,
          html: `<h3>우리 상황 &amp; 계획</h3>
<ul>
  <li>사내에서 반도체 특화 추론 모델을 만들어야 함</li>
  <li>H/W 리소스 상 비교적 작은 base 모델을 써야 하는 상황</li>
</ul>
<div class="journey-flow" style="font-size:0.9em;">
  <span class="journey-node accent">Insight 2 적용</span>
  <span class="journey-arrow">&rarr;</span>
  <span class="journey-node">R1으로부터 수학 &middot; 과학<br>추론데이터를 입히고</span>
  <span class="journey-arrow">&rarr;</span>
  <span class="journey-node">반도체 CoT를<br>만들어서 입히자</span>
</div>`,
        },
        {
          type: 'metric-highlight',
          fragment: 2,
          big: 'Goal',
          text: '우선 수학 &middot; 과학 데이터를 입히는걸 연습해보고, 반도체 도메인에 적용해보자',
          after: '<p class="takeaway">목표 &nbsp; MATH ~95 &nbsp;&middot;&nbsp; GPQA ~65 &nbsp;&nbsp;<span class="sub-note">&asymp; DeepSeek-R1-Distill-Llama-70B 수준</span></p>',
        },
      ],
    },

    // Slide 5: 1차 시도 → 정제 & 결과
    {
      id: 'slide-05',
      type: 'standard',
      title: '1차 시도 &rarr; 정제 &amp; 결과',
      content: [
        {
          type: 'html',
          html: '<p class="sub-note">1차 시도</p>',
        },
        {
          type: 'two-column',
          columns: [
            {
              html: `<h3>데이터</h3>
<ul class="checklist">
  <li>2M+ 혼합 <span class="fail-mark">&cross;</span></li>
  <li>다양한 출처 수집 <span class="fail-mark">&cross;</span></li>
  <li>낮은 검증 기준 <span class="fail-mark">&cross;</span></li>
  <li>양 우선 <span class="fail-mark">&cross;</span></li>
</ul>`,
            },
            {
              html: `<h3>학습</h3>
<ul class="checklist">
  <li>전 구간 단일 런 <span class="fail-mark">&cross;</span></li>
  <li>32k 토큰 고정 <span class="fail-mark">&cross;</span></li>
  <li>배치 사이즈 고정 <span class="fail-mark">&cross;</span></li>
</ul>`,
            },
          ],
        },
        {
          type: 'html',
          fragment: 1,
          html: `<p class="sub-note" style="margin-top:0.6em;">정제</p>
<div class="two-column">
  <div>
    <h3>데이터</h3>
    <ul>
      <li>correctness == True</li>
      <li>verifier == 1.0</li>
      <li>verifiable question</li>
      <li><strong>200k 정제</strong></li>
    </ul>
    <p class="takeaway">데이터 &gt; 모델</p>
  </div>
  <div>
    <h3>학습</h3>
    <ul>
      <li>Round 1 &nbsp; 8k / batch S</li>
      <li>Round 2 &nbsp; 16k / batch M</li>
      <li>Round 3 &nbsp; 32k / batch L</li>
    </ul>
  </div>
</div>`,
        },
        {
          type: 'metric-highlight',
          fragment: 2,
          big: 'MATH 95.0 &nbsp;&middot;&nbsp; GPQA 65.0',
          text: '수능 2025 수학 &nbsp; 85점',
          after: '<p>반도체 원서 &nbsp; 챕터별 5문항</p>',
        },
      ],
    },

    // Slide 7: RL & 전환
    {
      id: 'slide-07',
      type: 'standard',
      title: 'RL &amp; 전환',
      content: [
        {
          type: 'two-column',
          columns: [
            {
              html: `<h3>우리 팀의 원래 계획</h3>
<p><strong>SFT 완료</strong></p>
<p class="flow-arrow">&darr;</p>
<p>RL Phase</p>
<p>수학 &middot; 과학 &rarr; Tool Calling</p>`,
            },
            {
              fragment: 1,
              className: 'world-context',
              html: `<h3>세상</h3>
<ul>
  <li>Qwen3 Tool Calling 공개</li>
  <li>Claude MCP 확산</li>
  <li>OpenAI Agents SDK</li>
</ul>
<p class="takeaway">Tool 학습 &lt; Tool 사용</p>`,
            },
          ],
        },
      ],
    },

    // Slide 8: The Problem
    {
      id: 'slide-08',
      type: 'standard',
      title: 'The Problem',
      content: [
        {
          type: 'html',
          html: `<div class="journey-flow" style="font-size:1em; margin-bottom:0.6em;">
  <span class="journey-node">Agentic AI 패러다임 전환</span>
  <span class="journey-arrow">&rarr;</span>
  <span class="journey-node accent">DRAM 검증</span>
  <span style="font-size:0.8em; color:var(--color-muted);">첫 번째 타깃 &middot; 레거시 코드 수십 년치 축적</span>
</div>`,
        },
        {
          type: 'html',
          fragment: 1,
          html: `<p style="font-size:0.8em; color:var(--color-muted); margin-bottom:0.3em; text-align:left;">DRAM 검증이 안고 있던 문제</p>
<div class="three-column">
  <div class="problem" style="text-align:center;">
    <h3>수동 작성</h3>
    <p>케이스당 수 일</p>
  </div>
  <div class="problem" style="text-align:center;">
    <h3>재사용 불가</h3>
    <p>과거 코드 누적만 될 뿐</p>
  </div>
  <div class="problem" style="text-align:center;">
    <h3>툴 장벽</h3>
    <p>EDA 직접 실행 자동화 불가</p>
  </div>
</div>`,
        },
        {
          type: 'html',
          fragment: 2,
          html: `<div class="journey-flow" style="font-size:0.9em; margin-top:0.6em;">
  <span class="journey-node">DRAM 팀<br><span class="sub-note">EDA &middot; 검증 전문</span></span>
  <span class="journey-arrow">&larr; 공백 &rarr;</span>
  <span class="journey-node">AI 팀<br><span class="sub-note">LLM &middot; 에이전트 전문</span></span>
</div>
<p class="takeaway" style="text-align:center; margin-top:0.4em;">수개월간 DRAM 직접 학습 &rarr; 두 도메인을 연결</p>`,
        },
      ],
    },

    // Slide 9: Why Agentic
    {
      id: 'slide-09',
      type: 'standard',
      title: 'Why Agentic',
      content: [
        {
          type: 'html',
          html: '<p style="font-size:0.85em; color:var(--color-muted); margin-bottom:0.4em;">도메인 특화, 두 가지 길</p>',
        },
        {
          type: 'two-column',
          columns: [
            {
              html: `<h3>모델 파인튜닝</h3>
<ul>
  <li>데이터 수집</li>
  <li>정제 &middot; 학습</li>
  <li>긴 시계열</li>
  <li>제품마다 반복</li>
</ul>
<p class="takeaway">&rarr; 병목 &middot; 고비용</p>`,
            },
            {
              html: `<h3>Agentic AI</h3>
<ul>
  <li>강력한 Frontier 모델</li>
  <li>툴 실행 &middot; 결과 확인</li>
  <li>자가 수정 루프</li>
</ul>`,
            },
          ],
        },
        {
          type: 'html',
          fragment: 1,
          html: `<h3>DRAM 도메인에서 Fine-tuning이 특히 안 맞는 이유</h3>
<div class="three-column">
  <div>
    <h4>레거시 코드</h4>
    <p>정답 라벨 없음<br>패턴이 아니라 의미를 알아야</p>
  </div>
  <div>
    <h4>제품 사이클</h4>
    <p>매 세대 스펙 변경<br>&rarr; 학습 데이터 금방 outdated</p>
  </div>
  <div>
    <h4>EDA 툴</h4>
    <p>실행 결과가 정답<br>모델이 직접 실행해야 앎</p>
  </div>
</div>`,
        },
        {
          type: 'table',
          fragment: 2,
          heading: 'Agentic이 이 조건에 정확히 맞는다',
          className: 'fit-table',
          headers: ['조건', 'Agentic의 대응'],
          rows: [
            ['정답 라벨 없음', '시뮬레이터가 정답을 준다'],
            ['스펙 변경', '컨텍스트로 흡수, 재학습 불필요'],
            ['EDA 툴 실행 필요', '툴 호출이 곧 스킬'],
            ['자가 수정 필요', 'Feedback Loop가 내장'],
          ],
        },
      ],
    },

    // Slide 10: Architecture
    {
      id: 'slide-10',
      type: 'standard',
      title: 'Architecture',
      content: [
        {
          type: 'html',
          html: '<p class="lead">LangGraph와 파일 R/W &middot; EDA 툴을 결합한 Agentic Workflow를 직접 구축하기로 결정했습니다.</p>',
        },
        {
          type: 'html',
          fragment: 1,
          html: `<div class="architecture-diagram">
  <div class="arch-orchestrator">
    <div class="arch-orchestrator-label">Orchestrator</div>
    <div class="arch-orchestrator-inner">
      <div class="arch-role">Planner<br><span style="font-size:0.8em;opacity:0.85">계획 수립</span></div>
      <span class="arch-role-arrow">&rarr;</span>
      <div class="arch-role">Supervisor<br><span style="font-size:0.8em;opacity:0.85">위임 &middot; 검토</span></div>
    </div>
  </div>
  <div class="arch-flow-arrows">
    <span>&darr; 위임</span>
    <span>&uarr; 검토</span>
  </div>
  <div class="arch-skills">
    <div class="arch-skill">
      <h4>Worker 1: Retrieval</h4>
      <p>레거시 코드 검색<br>Hierarchical RAG</p>
      <p class="metric-inline">검색 정확도 <strong>91.2%</strong></p>
    </div>
    <div class="arch-skill">
      <h4>Worker 2: Generation</h4>
      <p>벡터 코드 생성<br>FSM Verifier &middot; Xcelium</p>
      <p class="metric-inline">Syntax Pass Rate <strong>99.7%</strong></p>
    </div>
  </div>
</div>`,
        },
        {
          type: 'html',
          fragment: 2,
          html: `<div class="dynamic-skill-section">
  <h3>Dynamic Skill Loading</h3>
  <p style="font-size:0.8em;margin-bottom:0.4em;">Worker는 범용 실행 환경 &mdash; Supervisor가 위임하는 <strong>업무 성격에 맞는 Skill이 자동 로딩</strong></p>
  <div class="skill-loading-flow">
    <div class="skill-loading-box">&ldquo;검색하라&rdquo;<br><strong>Retrieval Skill</strong><br><span style="font-size:0.9em;">RAG &middot; 메타데이터</span></div>
    <div class="skill-loading-arrow">&vert;</div>
    <div class="skill-loading-box">&ldquo;생성하라&rdquo;<br><strong>Generation Skill</strong><br><span style="font-size:0.9em;">FSM Verifier &middot; EDA</span></div>
  </div>
  <p style="font-size:0.75em;color:var(--color-muted);margin-top:0.3em;">&rarr; 컨텍스트 간섭 제거 + 각 Worker가 전문가 수준으로 동작</p>
</div>`,
        },
      ],
    },

    // Slide 11: 컨텍스트 · 결과
    {
      id: 'slide-11',
      type: 'standard',
      title: '컨텍스트 &middot; 결과',
      content: [
        {
          type: 'html',
          html: `<p>두 태스크를 하나의 컨텍스트에 &rarr; 간섭 &middot; 정확도 하락</p>
<div class="flow-vertical">
  <p><strong>Supervisor</strong>가 컨텍스트 분리</p>
  <p>&rarr; Retrieval Worker 완료 &rarr; 결과 <strong>검토</strong></p>
  <p>&rarr; 핵심만 추출하여 Generation Worker에게 전달</p>
</div>`,
        },
        {
          type: 'two-column',
          style: 'margin-top: 0.8rem;',
          columns: [
            {
              fragment: 1,
              html: `<h3>Skill 1 &middot; Retrieval</h3>
<ul>
  <li>레거시 코드에 <strong>LLM으로 메타데이터 자동 생성</strong></li>
  <li>모듈 &rarr; 파일 &rarr; 함수 계층 검색</li>
  <li>&rarr; 검색 정확도 <strong class="metric-inline">91.2%</strong></li>
</ul>`,
            },
            {
              fragment: 2,
              html: `<h3>Skill 2 &middot; Generation</h3>
<ul>
  <li>EDA 실행 &rarr; 에러 직접 노출 &rarr; 자가 수정</li>
  <li>결과 로그 1&ndash;2 GB <span class="sub-note">(웨이브폼 포함)</span></li>
  <li>핵심 추출 &rarr; Context 적재</li>
</ul>`,
            },
          ],
        },
        {
          type: 'table',
          fragment: 3,
          heading: 'Pass Rate (구조적 접근의 효과)',
          className: 'fit-table results-table',
          rows: [
            ['단일 LLM (GPT-4 Turbo)', '<td class="metric-cell">60.3%</td>'],
            ['Frontier + Agentic', '<td class="metric-cell accent">94.2%</td>'],
          ],
          highlightRows: [2],
          rawRows: true,
          rawHtml: `<h3>Pass Rate (구조적 접근의 효과)</h3>
<table class="fit-table results-table">
  <tr>
    <td>단일 LLM (GPT-4 Turbo)</td>
    <td class="metric-cell">60.3%</td>
  </tr>
  <tr>
    <td>Frontier + Agentic</td>
    <td class="metric-cell accent">94.2%</td>
  </tr>
  <tr class="highlight-row">
    <td>우리 (DRAM 도메인 특화)</td>
    <td class="metric-cell accent"><strong>99.7%</strong></td>
  </tr>
</table>
<p class="footnote">
  * VerilogCoder, AAAI 2025 (RTL 코딩 벤치마크)<br>
  * 벤치마크 상이 (VerilogEval-Human v2 vs. DRAM 내부 검증) &mdash; 델타 방향성 참고용
</p>`,
        },
        {
          type: 'html',
          html: '<p class="bridge">루프가 반복될수록 &mdash; 무언가가 쌓인다</p>',
        },
      ],
    },

    // Slide 12a: 자기주도적 지식 축적 시스템
    {
      id: 'slide-12a',
      type: 'standard',
      title: '자기주도적 지식 축적 시스템',
      subtitle: '실행할수록 똑똑해지는 시스템',
      content: [
        {
          type: 'two-column',
          columns: [
            {
              className: 'problem',
              html: `<h3 style="color:var(--color-fail);">기존 AI 시스템</h3>
<ul>
  <li>모델 고정</li>
  <li>지식 = 학습 시점</li>
  <li>도메인 망각</li>
</ul>`,
            },
            {
              className: 'success-box',
              html: `<h3 style="color:var(--color-success);">우리 시스템</h3>
<ul>
  <li>실행 &rarr; 지식 생성</li>
  <li>지식 = 누적 자산</li>
  <li>도메인 심화</li>
</ul>`,
            },
          ],
        },
        {
          type: 'html',
          fragment: 1,
          html: `<h3>툴 3개 &rarr; 5개</h3>
<div class="two-column">
  <div class="arch-skill">
    <h4>기본 툴</h4>
    <p class="sub-note">파일 R/W &middot; EDA &middot; 터미널</p>
  </div>
  <div class="arch-skill" style="border-color:var(--color-success);">
    <h4 style="color:var(--color-success);">+ 지식 툴</h4>
    <p class="sub-note">Knowledge 저장 &middot; Knowledge 조회</p>
  </div>
</div>
<p class="takeaway">에이전트 입장에서 지식도 "툴" &mdash; Orchestrator가 동일하게 호출</p>`,
        },
        {
          type: 'html',
          html: '<p class="bridge">지식이 쌓인다면 &mdash; 정제는 어떻게?</p>',
        },
      ],
    },

    // Slide 12b: 지식 정제 파이프라인
    {
      id: 'slide-12b',
      type: 'standard',
      title: '지식 정제 파이프라인',
      subtitle: '초안에서 자산까지, 자동으로',
      content: [
        {
          type: 'journey-flow',
          style: 'font-size:1.3em; margin:1.5em 0;',
          nodes: [
            { text: '실행 중 초안 저장<br><span class="sub-note">속도 우선</span>' },
            { text: '자정 Batch 정제<br><span class="sub-note">정확도 우선</span>' },
            { text: 'Git 저장<br><span class="sub-note">버전 관리</span>', accent: true },
            { text: 'Fine-tuning Dataset', accent: true },
          ],
        },
        {
          type: 'metric-highlight',
          fragment: 1,
          big: '에이전트 = 데이터 생산자',
          compare: '실행 &rarr; 초안 &rarr; 정제 &rarr; 재학습, 사람 개입 없이 반복',
        },
      ],
    },
  ],
};
