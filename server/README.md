# サーバーの起動

```
$ cargo run --bin helloworld-server
```

# サーバーへのリクエスト

```
$ grpcurl -plaintext -d '{"name": "pokotyan"}' -proto proto/helloworld.proto localhost:50051 helloworld.Greeter.SayHello
```

or

```
$ cargo run --bin helloworld-client pokotyan
```
