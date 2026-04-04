
## 최종 구조

```text
seminar/
├─ README.md
├─ slides/
│  └─ latest.md
├─ site/
│  ├─ latest.html
│  ├─ index.html
│  ├─ styles.css
│  └─ assets/
│     ├─ profile.jpg
│     └─ logo.png
├─ dist/
│  └─ latest.pdf
└─ .github/
   └─ workflows/
      └─ build.yml
```

## 역할

### `slides/latest.md`

* 당신이 직접 만지는 **raw text**
* 발표의 메시지, 순서, 핵심 문장만 담음

### `site/latest.html`

* AI가 바이브하게 수정하는 **실제 발표 원본**
* 레이아웃, 섹션 구성, 강조 스타일 반영

### `dist/latest.pdf`

* 자동 생성되는 **최종 배포본**
* GitHub Pages에서 이걸 보여줌

---

## 최종 흐름

이제 흐름은 딱 이겁니다.

1. 당신이 `slides/latest.md` 수정
2. AI가 `latest.md`를 바탕으로 `site/latest.html` 수정
3. GitHub Actions가 `site/latest.html`을 PDF로 변환해서 `dist/latest.pdf` 생성
4. GitHub Pages는 `dist/latest.pdf`를 보여줌

즉:

**md = 내용 원본**
**html = 표현 원본**
**pdf = 결과물**

이 3단 분리면 충분합니다.

---

## 왜 이게 맞는가

PPT를 없애면 좋은 점이 명확합니다.

* 변환 파이프라인이 단순해짐
* 결과물 품질이 덜 흔들림
* AI가 HTML에 집중 가능
* GitHub Pages와 궁합이 좋아짐
* 유지보수가 쉬움

반대로 PPT를 살리면:

* 변환 품질 이슈
* 구조 복잡도 증가
* “원본이 뭐냐”가 다시 꼬임

버리는 게 맞습니다.

---

## GitHub Pages에서 뭘 보여줄까

여기서도 단순하게 갑니다.

### 추천

* `site/index.html`은 PDF viewer 역할
* 내부에서 `../dist/latest.pdf` 또는 같은 배포 경로의 `latest.pdf`를 띄움

즉 웹에서 들어오면 **항상 최신 PDF 발표본**이 바로 보이게 합니다.

---

## 더 깔끔한 구조도 가능

사실 `site/`와 `dist/`를 나눌 필요도 없습니다.
더 단순하게 하려면 이렇게 해도 됩니다.

```text
seminar/
├─ slides/
│  └─ latest.md
├─ public/
│  ├─ index.html
│  ├─ latest.html
│  ├─ latest.pdf
│  ├─ styles.css
│  └─ assets/
└─ .github/
   └─ workflows/
      └─ build.yml
```

이 구조가 더 실용적일 수도 있습니다.

### 이 경우 역할

* `slides/latest.md`: 초안
* `public/latest.html`: AI 편집본
* `public/latest.pdf`: 자동 생성물
* `public/index.html`: Pages 진입점

이게 더 좋을 가능성이 큽니다.
왜냐면 **배포 대상이 전부 `public/` 아래로 모이기 때문**입니다.

---

## 그래서 진짜 최종 추천

복잡성 줄이려면 이걸 추천합니다.

```text
seminar/
├─ README.md
├─ slides/
│  └─ latest.md
├─ public/
│  ├─ index.html
│  ├─ latest.html
│  ├─ latest.pdf
│  ├─ styles.css
│  └─ assets/
└─ .github/
   └─ workflows/
      └─ build.yml
```

## 운영 규칙

* **당신이 직접 수정**: `slides/latest.md`
* **AI가 수정**: `public/latest.html`, 필요하면 `styles.css`
* **자동 생성**: `public/latest.pdf`
* **GitHub Pages 공개 경로**: `public/`

---

## 한 줄 결론

네. **PPT 옵션은 빼는 게 맞고**,
최종적으로는:

**`latest.md -> AI가 latest.html 수정 -> Actions가 latest.pdf 생성 -> Pages는 latest.pdf 표시`**

이 구조로 가면 됩니다.

원하면 다음으로 바로
**`README.md` / `index.html` / `build.yml` / 폴더 초기 템플릿**
이 4개를 실제로 쓸 수 있게 한 번에 짜드리겠습니다.
