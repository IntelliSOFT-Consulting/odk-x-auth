FROM node:alpine AS builder
WORKDIR /usr/odk-x-auth

RUN npm install yarn -g --force

COPY ui ui
WORKDIR ui
RUN yarn install
RUN yarn build




# Stage 2
FROM python:3.7-stretch
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential


# Add UI build
RUN mkdir -p /ui/build
COPY --from=builder /usr/odk-x-auth/ui/build /ui/build

COPY ./api /app
WORKDIR /app
RUN pip install -r requirements.txt



EXPOSE 8080

CMD ["gunicorn", "-b", "0.0.0.0:8080", "app"]
