FROM golang:alpine as builder
RUN apk update && \
    apk add --virtual build-deps make git
# Build gotty
RUN go env -w GO111MODULE=off && go get -d github.com/yudai/gotty && \
    git -C /go/src/github.com/yudai/gotty checkout release-1.0 && \
    go install github.com/yudai/gotty


FROM docker:20.10-dind

COPY --from=builder /go/bin/gotty /gotty
RUN apk update && apk add bash htop vim iftop iotop iperf net-tools iputils postgresql-client git tmux ansible openssh-keygen openssh tzdata py-pip python2

RUN pip3 install docker-compose
RUN apk del libc6-compat
RUN echo $'[defaults] \n\
    host_key_checking = False' > /root/.ansible.cfg

EXPOSE 8080
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
WORKDIR /workshop
CMD []