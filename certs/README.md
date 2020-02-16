# CGYINFO: Self-signed SSL Certificate Script

## Statement
This is a self-signed SSL certificate building script.

## Usage

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

## Epilogue
