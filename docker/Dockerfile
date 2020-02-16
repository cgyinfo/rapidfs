FROM ubuntu:16.04
MAINTAINER Kenny "zhouxiaochuan@cgyinfo.com"

# set apt-get sources
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak \
&& mkdir /etc/rapidfs \
&& mkdir /var/rapidfs

# add local files/directories
ADD sources.list /etc/apt
ADD start.sh /usr/local/bin

# main program
RUN apt-get clean && apt-get update -y \
&& apt-get install -y curl wget vim git \
&& curl -sL https://deb.nodesource.com/setup_12.x | bash - \
&& apt-get install -y nodejs \
&& chmod +x /usr/local/bin/start.sh

WORKDIR /opt
RUN git clone --depth=1 https://github.com/cgyinfo/rapidfs.git
WORKDIR /opt/rapidfs
RUN npm install

VOLUME /etc/rapidfs
VOLUME /var/rapidfs

EXPOSE 8878 8879
ENTRYPOINT ["/usr/local/bin/start.sh"]
