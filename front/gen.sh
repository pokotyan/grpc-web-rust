#!/bin/sh

parentdir=$(dirname `pwd`)
protodir="${parentdir}/server/proto"
outputpath="${parentdir}/front/src/proto"

protoc -I=${protodir} ${protodir}/helloworld.proto \
  --js_out=import_style=commonjs:${outputpath} \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${outputpath}