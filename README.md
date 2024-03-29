# 1. 프로젝트 소개
### 프로젝트 명
  > 업비트 API 기반 디지털 가상자산 거래소 개발 및 자체적 코인 발행

### 개요
  뉴스를통한 코인 여론 분석 기능을 개발하고, 거래소 내에서 사용할 수 있는 코인과 거래소 유저의 매매내역을 교환할 수 있는 기능을 개발한다.<br/>
  거래소 유저의 매매내역을 교환할 수 있는 기능을 만들 것이다. 그리고 거래 중개 사이트(업비트)에서 제공하는 API를 받아 각종 코인의 차트, 호가창, 코인의 시세 파악 및 매도, 매수 기능을 거래소 웹사이트에 구현하고 웹사이트를 운영하는 방식으로 거래소를 만든다. 또한, 거래소 구현 후 이더리움을 기반으로 하여 자체적으로 코인을 발행하고 역할 부여 후 거래소에 등록한다.

### 목적
  * 뉴스를 통한 여론 분석 기능 개발
  * 자체적인 코인 발행 및 거래
  * 업비트 api기반 자체적 거래소 사이트 개발

# 2. 팀 소개
  - 조원 1
    * 이름 : 유상욱(dbtkddnr000@gmail.com)
    * 역할
      + 거래소 시스템 전반 설계 및 구현
      + 여론 분석 그래프 구현
  - 조원 2
    * 이름 : 용태완(dksskfktnskakfk@gmail.com)
    * 역할
      + 거래소 ui 디자인
      + 코인 생성 및 기능 정리
      + 코인 동향 페이지 구현

# 3. 구성도
  ![Alt Text](구상도.png)
      
# 4. 소개 및 시연 영상

# 5. 사용법
  본 프로젝트는 VScode 및 React를 사용하였다.
  
  - 필요 패키지 설치
  ```
    npm i
  ```
  
  - 개발 서버 실행
  ```
    npm run dev
  ```

  - 페이지 기능 확인
  ```
    http://localhost:3001/ 로 접속하여 거래소 기능 확인
  ```
