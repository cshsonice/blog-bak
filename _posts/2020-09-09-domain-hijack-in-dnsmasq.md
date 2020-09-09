---
title: Arbitrary domain name hijacking caused by misconfiguration in dnsmasq
date: 2020-09-09 16:50:00
tags: [dns, dnsmasq]
description: Arbitrary domain name hijacking caused by misconfiguration in dnsmasq
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
# 
```

3. check hijack

![poc][2]

[1]: http://www.thekelleys.org.uk/dnsmasq/doc.html
[2]: /assets/images/poc.jpeg