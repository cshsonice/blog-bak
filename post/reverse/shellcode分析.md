---
title: shellcode
description: shellcode 实战
date: 2018-12-11 00:25:00
---

# shellcode

段选择字FS保存着当前TEB的地址

PE头地址 0x768c_00f0 = 0x768c_0000 + 0x0000_00f0

导出表地址 0x76a5_fca0 = 0x768c_0000 + 0x0019_fca0

函数名称列表 0x76A5_E6D8 = 0x768C_0000 + 0x0019_E6D8