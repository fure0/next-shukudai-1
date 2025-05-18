# GitHub Issues & Pull Requests Dashboard

GitHub Issues와 Pull Requests를 확인할 수 있는 대시보드 애플리케이션입니다.

## 기능

- GitHub Issues 목록 및 상세 보기
- Pull Requests 목록 및 상세 보기
- 최근 활동 타임라인
- 다크 모드 지원
- 반응형 디자인

## 프로젝트 구조

```
src/
├── app/                 # 페이지 컴포넌트
│   ├── page.tsx        # 메인 대시보드 페이지
│   ├── issues/         # Issues 관련 페이지
│   │   ├── page.tsx    # 이슈 목록 페이지
│   │   └── [number]/   # 이슈 상세 페이지
│   └── pulls/          # Pull Requests 관련 페이지
│       ├── page.tsx    # PR 목록 페이지
│       └── [number]/   # PR 상세 페이지
├── components/         # 재사용 가능한 컴포넌트
│   ├── IssueItem.tsx   # 이슈 항목 컴포넌트
│   └── PullRequestItem.tsx # PR 항목 컴포넌트
└── lib/               # 유틸리티 함수들
    ├── github.ts      # GitHub API 호출 함수
    └── types/         # 타입 정의
        └── github.ts  # GitHub 관련 타입 정의
```

## 설정

1. `.env.local` 파일 생성:
```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
NEXT_PUBLIC_GITHUB_OWNER=your_github_username
NEXT_PUBLIC_GITHUB_REPO=your_repository_name
```

2. 의존성 설치:
```bash
npm install
```

3. 개발 서버 실행:
```bash
npm run dev
```

## 주요 기술 스택

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- GitHub REST API (@octokit/rest)
- date-fns

## 페이지 구조

1. **메인 대시보드** (`/`):
   - Issues와 Pull Requests 개요
   - 최근 활동 타임라인
   - 각 섹션으로 이동할 수 있는 링크

2. **Issues** (`/issues`):
   - 전체 이슈 목록
   - 이슈 상태 및 라벨 표시
   - 작성자 정보와 생성일
   - 댓글 수 표시

3. **Issue 상세** (`/issues/[number]`):
   - 이슈 제목과 내용
   - 상태 및 라벨
   - 작성자 정보
   - 생성일 및 업데이트 정보

4. **Pull Requests** (`/pulls`):
   - 전체 PR 목록
   - PR 상태 (Open/Closed/Merged/Draft)
   - 작성자 정보와 생성일
   - 브랜치 정보

5. **Pull Request 상세** (`/pulls/[number]`):
   - PR 제목과 내용
   - 상태 정보
   - 작성자 정보
   - 브랜치 정보
   - 생성일 및 머지 정보

## 스타일링

- Tailwind CSS를 사용한 반응형 디자인
- 시스템 설정에 따른 다크 모드 지원
- GitHub 스타일의 상태 표시 (색상 및 아이콘)
