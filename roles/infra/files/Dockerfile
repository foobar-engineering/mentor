FROM docker:18.09.1-dind

## add some useful tools
RUN apk update && apk add bash htop vim iftop iotop iperf net-tools iputils postgresql-client git tmux ansible openssh-keygen openssh tzdata py-pip

RUN pip3 install docker-compose

## build gotty
ENV GLIBC_VERSION=2.26-r0 LANG=C.UTF-8

# Install everything in a single step
RUN set -ex && \
    # Step 1: install glibc \
    \
    #--- install build dependencies --- \
    apk add --no-cache ca-certificates curl libstdc++ && \
    \
    #--- install glibc --- \
    curl -o /etc/apk/keys/sgerrand.rsa.pub -sSL https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    for pkg in glibc-${GLIBC_VERSION} glibc-bin-${GLIBC_VERSION} glibc-i18n-${GLIBC_VERSION}; do curl -sSL https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/${pkg}.apk -o /tmp/${pkg}.apk; done && \
    apk add /tmp/*.apk && \
    \
    #--- set locale to UTF-8 --- \
    ( /usr/glibc-compat/bin/localedef --force --inputfile POSIX --charmap UTF-8 C.UTF-8 || true ) && \
    echo "export LANG=C.UTF-8" > /etc/profile.d/locale.sh && \
    /usr/glibc-compat/sbin/ldconfig /lib /usr/glibc-compat/lib && \
    \
    \
    # Step 2: install GoTTY pre-compiled binary \
    \
    #--- install binary --- \
    curl -sSL -O https://github.com/yudai/gotty/releases/download/v1.0.1/gotty_linux_amd64.tar.gz && \
    tar xvf /gotty_linux_amd64.tar.gz && \
    rm -f /gotty_linux_amd64.tar.gz && \
    \
    \
    # Step 3: install additional dependencies and packages \
    apk add --no-cache jq python && \
    \
    #--- remove build dependencies --- \
    apk del glibc-bin glibc-i18n && \
    rm -rf /tmp/* /var/cache/apk/*
RUN echo $'[defaults] \n\
    host_key_checking = False' > /root/.ansible.cfg

EXPOSE 8080
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
WORKDIR /workshop
CMD []
