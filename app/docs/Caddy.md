

### Caddyfile

```

localhost:80 {
  proxy /wushu localhost:8080
  proxy /wuyue localhost:1323
}

localhost:2017 {
    log ./2017.log

    proxy /app localhost:8080
    proxy /wuyue localhost:1323
}

```