# CGYINFO: FastDFS 6.0.6 based Ubuntu 16.04

## Statement
FastDFS 6.0.6 docker image based Ubuntu 16.04

## Catalogue introduction

## Usage
Note that you need to specify the host IP when running the container with the parameter FASTDFS_IPADDR
Here's a sample docker run instruction:

```
docker run -d --name rapidfs -v /d/RES/rapidfs:/var/rapidfs -e REDIS_ADDRESS='192.168.1.58' -p 8878:8878 cgyinfo/rapidfs
```

## Epilogue

