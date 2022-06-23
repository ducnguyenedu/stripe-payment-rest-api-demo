FROM node:14.18.1
ENV NODE_ENV production
ENV PORT=8351
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY ./ ./
EXPOSE 8351
RUN npm run build
CMD ["node", "dist/app.js"]