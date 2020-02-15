FROM ubuntu:16.04
MAINTAINER Kenny "zhouxiaochuan@cgyinfo.com"

# set apt-get sources
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak \
  && mkdir /etc/rapidfs \
  && mkdir /opt/rapidfs \
  && mkdir /var/rapidfs

# add local files/directories
ADD sources.list /etc/apt
COPY rapidfs/* /opt/rapidfs/
ADD start.sh /opt/rapidfs

# main program
RUN apt-get clean \
  && apt-get update -y \
  && apt-get install curl wget vim -y \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && apt-get install -y nodejs \
  && cd /opt/rapidfs \
  && npm install \
  && chmod +x /opt/rapidfs/start.sh

VOLUME /etc/rapidfs
VOLUME /var/rapidfs

EXPOSE 8878 8879
ENTRYPOINT ["/opt/rapidfs/start.sh"]
