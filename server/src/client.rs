pub mod hello_world {
    tonic::include_proto!("helloworld");
}

use hello_world::greeter_client::GreeterClient;
use hello_world::HelloRequest;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = env::args().collect();
    let arg = args.get(1);
    let name;

    if arg.is_none() {
        name = "World".to_string();
    } else {
        name = args[1].clone();
    }

    let mut client = GreeterClient::connect("http://0.0.0.0:50051").await?;

    let request = tonic::Request::new(HelloRequest { name });

    let response = client.say_hello(request).await?;

    println!("{:?}", response.get_ref());

    Ok(())
}
