import React, { useState } from "react";
import { ClientReadableStream } from "grpc-web";
import { HelloRequest, HelloReply } from "./proto/helloworld_pb";
import { GreeterClient } from "./proto/HelloworldServiceClientPb";
import "./App.css";

const sayHello = (name: string): ClientReadableStream<HelloReply> => {
  const request = new HelloRequest();
  request.setName(name);

  const client = new GreeterClient("http://localhost:8080", {}, {});
  return client.sayHello(request, {}, (err, res) => {
    if (err || !res) {
      throw err;
    }
  });
};

function App() {
  const [name, setName] = useState("");
  const [reply, setReply] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <div style={{}}>
          <input
            type="text"
            placeholder="your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const stream = sayHello(name);

              stream.on("data", (response: HelloReply) => {
                const message = response.getMessage();

                setReply(message);
              });
            }}
          >
            say hello
          </button>
        </div>
        <div>{reply}</div>
      </header>
    </div>
  );
}

export default App;
