# CGYINFO: RapidFS Docker Image

## Statement

rapidfs docker image based Ubuntu 16.04

## Usage

Note that you need to specify parameters REDIS_IPADDR and REDIS_PORT when running the container. Example:

```
docker run -d --name rapidfs -v /d/RES/rapidfs:/var/rapidfs -e REDIS_ADDRESS='192.168.1.58' -e REDIS_PORT=3306 -p 8878:8878 cgyinfo/rapidfs
```

There are two volumes can be mounted by the local directories: /var/rapidfs: storage for file uploading, /opt/rapidfs/certs: your ssl certificate: server.key and server.crt.

The rapidfs need to connect the redis server, this image don't contain redis, so you should install it independently. **REDIS_ADDRESS** and **REDIS_PORT** are two environment variables of connecting the redis,You can define the variable and its value when running the container.

The rapidfs service exposed port **8878**,you can bind the local port.

## Epilogue

![LOGO](https://www.cgyinfo.com/logo.png)

Please refer to the official website for details: [https://www.cgyinfo.com](https://www.cgyinfo.com)
