---
title: gdb-手册
description: gdb调试工具的使用与介绍
date: 2018-11-25 13:55:00
---

# gdb命令

| 命令          | 解释             | 示例     |
|:--------------|:-----------------|:--------|
| file \<filename> | 加载被调试的文件  | file a.out |
| r            | run 运行程序        |              |
| c            | continue 继续执行直到遇到断点 |       |
| b <行号>     | 在指定行下断点                |       |
| b <函数名>   | 给指定函数下断点               |       |
| b *<函数名>  | 表示将断点设置在"由编译器生成的prolog代码处" |        |
| b *<地址>    | 给指定的内存地址下断点           | b *0x12345678 |
| d <编号>     | 函数指定编号的断点或所有断点 |           |
| s            | 单步进入(遇到函数进入)      |           |
| n            | 单步执行(不进入函数)        |           |
| si           | 等效于s(针对于汇编)         |           |
| ni           | 等效于ni(针对于汇编)        |           |
| disas        | 反汇编一段内存,不带参数则显示当前执行位置反汇编  |           |
| finish       | 执行到返回                  |         |

# gdb插件

## gdb-peda

### 介绍

PEDA是为GDB设计的一个强大的插件，全称是Python Exploit Development Assistance for GDB。它提供了很多人性化的功能，比如高亮显示反汇编代码、寄存器、内存信息，提高了debug的效率。同时，PEDA还为GDB添加了一些实用新的命令，比如checksec可以查看程序开启了哪些安全机制等等

### 安装

```bash
pip install peda

git clone https://github.com/longld/peda.git ~/peda
echo "source ~/peda/peda.py" >> ~/.gdbinit
```