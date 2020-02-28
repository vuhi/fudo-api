FROM node:10
RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
EXPOSE 3000

CMD ["npm", "run", "start"]

#docker build -t fudo-api:latest .
#docker save -o fudo-api.tar fudo-api
#scp -i AWS\fudo_aws_hai.pem fudo-apu.tar ec2-user@3.133.139.1
#scp -i ..\AWS\fudo_aws_hai.pem  fudo-api.tar ubuntu@3.15.141.103:.