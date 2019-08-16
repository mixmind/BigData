#!/bin/bash


for i in {1..100}; do

node inv.js > invoice$i.json &&
curl -X POST  -i  -F file=@invoice$i.json  35.208.177.111:8080/upload; 
done

