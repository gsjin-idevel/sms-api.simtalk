# 1) Node.js 공식 경량 이미지 사용
FROM node:22.16.0-alpine

# 2) 작업 디렉터리 설정
WORKDIR /usr/src/app

# 3) package.json, package-lock.json 복사
COPY package*.json tsconfig.json ./

# 4) 의존성 설치
RUN npm install

# 5) 소스코드 복사
COPY . .

# 6) NestJS 빌드
RUN npm run build
RUN npm install pm2 -g && \
    pm2 install pm2-logrotate && \
#    pm2 set pm2-logrotate:retain 14 && \ 14일 주기로 로그 삭제
#    pm2 set pm2-logrotate:max_size 10M && \ 로그 파일 사이즈 제한(넘으면 분할)
    pm2 set pm2-logrotate:compress true && \
    pm2 set pm2-logrotate:dateFormat YYMMDD && \
    pm2 set pm2-logrotate:rotateInterval '0 0 * * *'

# 7) 앱 실행
CMD ["pm2-runtime", "ecosystem.config.js"]

# 8) 포트 노출
EXPOSE 3002
