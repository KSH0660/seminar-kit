# Next Plan — 남은 작업

## 완료된 작업

- [x] 디렉토리 구조 생성 (slides/, public/, scripts/, .github/)
- [x] reveal.js 12슬라이드 프레젠테이션 (`public/latest.html`)
- [x] CSS 테마 (`public/styles.css`)
- [x] 랜딩 페이지 (`public/index.html`)
- [x] PDF 생성 스크립트 (`scripts/generate-pdf.js`)
- [x] GitHub Actions CI/CD (`.github/workflows/build.yml`)
- [x] README.md
- [x] seminar-kit-skill/ 가이드 작성

## 남은 작업

### 1. GitHub Pages 설정 (수동)
- GitHub 저장소 Settings → Pages → Source를 **"GitHub Actions"**로 변경
- 이건 GitHub 웹 UI에서 직접 해야 함

### 2. 디자인 개선
- 현재 디자인이 기본적인 수준 — 사용자 피드백에 따라 개선 필요
- 다크 테마, 그라데이션, 모던 레이아웃 등 방향 결정 후 진행
- `seminar-kit-skill/design-guide.md`의 팔레트/레이아웃 아이디어 참고

### 3. 에셋 추가
- `public/assets/`에 프로필 사진, 로고 등 이미지 추가
- 슬라이드에서 이미지 참조 연결

### 4. PDF 로컬 테스트
- `npm install playwright` 후 `node scripts/generate-pdf.js` 실행
- 한국어 렌더링, 페이지 수(12페이지), 레이아웃 확인

### 5. GitHub Actions 동작 확인
- push 후 Actions 탭에서 빌드 성공 확인
- Pages 배포 URL 접속 확인

### 6. plan.md / previous_seminar_plan.md 정리
- 초기 기획 파일들 — 보관할지 삭제할지 결정 필요
