FROM rust:1.40 as builder

WORKDIR /app

RUN rustup component add rustfmt

RUN USER=root cargo init

COPY . .
RUN cargo build --release

FROM debian:stretch-slim

WORKDIR /bin

COPY --from=builder /app/target/release/helloworld-server .

RUN apt update && \
    apt install -y ca-certificates

CMD helloworld-server
