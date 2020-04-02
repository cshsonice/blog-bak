---
title: linux常用命令
description: linux bash 命令
date: 2018-12-26 16:00:00
---

# Linux常用命令

本文尽可能的收集了常用命令及其常用参数，不足之处还望指正。

## about w

一些特别的命令

```bash
    whatis   # 简单查看命令的作用。如 whatis ls
    whereis  # 查看文件的位置，当安装了同一程序的多个版本时特别有用。如 whereis cat
    which    # 查看指定命令的位置。如 which ps
    who      # 显示系统中有哪些使用者正在上面
             # who     # 查看当前登录系统的用户
             # who -H  # 给显示的列表增加顶部标题栏
    whoami   # 查看当前EUID关联的用户名。可简单理解为查看当前用户名
    whois    # 联网查询whois信息。如 whois example.com, whois 127.0.0.1
    pwd      # 查看当前所在的路径位置
```

## zipinfo-zip-unzip/tar/gzip-gunzip/bzip2-bunzip2

文件压缩与解压 zip,tar,gz,bz2

> zip

```bash
    zip -r a.zip /path/to/dir   # 将dir目录下的所有文件与目录压缩为 a.zip
    zip a.zip s1.file s2.file   # 将s1.file,s2.file合并压缩为 a.zip
    zip -d a.zip a.c            # 从压缩文件 a.zip 中删除文件 a.c
    zip -z a.zip                # 给a.zip添加注释（在随后的交互式输入中输入注释）
        -q                      # 压缩时不显示过程提示。静默模式(quiet)
        -v                      # 显示更详细的压缩信息

    zipinfo t.zip          # 显示t.zip的信息
            -v             # 显示目标zip更详尽的信息
            -z             # 如果目标zip含有注释，则显示注释

    unzip -v t.zip         # 查看t.zip的内容信息，但是不解压（与zipinfo查看的内容不完全相同）
    unzip -l t.zip         # 查看t.zip内的文件，不解压
    unzip t.zip            # 解压
    unzip -o t.zip         # 解压，遇到相同文件名直接覆盖，不询问
    unzip -n t.zip         # 解压，遇到相同文件名直接跳过，不询问
```

> tar

```bash
    tar -czvf t.tar.gz a.c b.c  # 打包a.c,b.c到t.tar.gz
    tar -tzvf t.tar.gz          # 显示t.tar.gz的内容
    tar -xzvf t.tar.gz          # 解包t.tar.gz
```

> gz

```bash
    gzip ./*      # 分别压缩当前目录所有文件
    gzip -d ./*   # 分别解压当前所有文件

    # gunzip 只是 gzip 的一个硬链接
```

> bz2

```bash
    bzip2 ./*      # 分别压缩当前目录所有文件
    bzip2 -d ./*   # 分别解压当前所有文件

    # bunzip2 是 bzip2 的软链接（符号链接）
```

## ls

查看文件或目录信息

```bash
    ls -l         # 查看当前目录的文件及子目录（详细信息）
    ls -a         # 查看...（包括隐藏文件与与隐藏文件夹）
    ls -lh        # 查看...（将信息以人类可读的直观方式显示，单独使用-h效果不明显）
    ls -R         # 递归遍历子文件夹
    ls -d /dir    # 列出指定目录本身，而不是其中的内容，最好结合-l
    ls -lt        # 列出文件与目录详细信息，输出按时间排序
    ls -lrt       # 列出文件与目录详细信息，输出按时间反向排序
    ls -S         # 将文件或目录从大到小排序后输出
    ls --sort=size / ls --sort=time  # 即 ls -S/ls -t
```

## cat/head/tail

查看文件内容

```bash
    cat file       # 查看文件内容
    cat / cat -    # 无参数或-表示cat接受标准输入()
    cat -n file    # 查看文件内容的同时显示行号
        -E / --show-ends  # 在每一行输出的末尾显示一个 $ 符号（用来判断空格或缩进的长度）
        -T / --show-tabs  # 输出时用 ^T 替换缩进

    head file      # 查看文件头部内容（默认前10行）
    head -n 12 file    # 查看文件前12行
    head -c 1024 file  # 查看文件的前1024个字节bytes

    tail file      # 查看文件尾部内容(默认后10行)
         -n
         -c
```

## cd

切换工作目录

```bash
    cd -   # 返回上一个工作目录
    cd ..  # 切换到上级目录
    cd ~   # 切换到当前用户的home目录
    cd target_dir  # 切换到指定目录
```

## cp/mv

拷贝/移动文件或目录

```bash
    cp [OPTION]... [-T] SOURCE DEST
    cp -r /path/dir0 /path/dir1   # 递归的拷贝目录dir0为dir1
    cp file1 file2                # 拷贝file1,新文件为file2
       -i       # cp后默认会覆盖同名文件，-i选项可以使覆盖发生时暂停，进行确认或取消。
                # 建议cp时总使用 -i 选项

    mv [OPTION]... [-T] SOURCE DEST
    # mv 参数与用法基本等同于 cp
```

## rm

删除文件或目录

```bash
    rm -rf /         # 删除系统中所有文件，使用此命令前应获得超级用户权限否则效果不理想
    rm -r /path/dir  # 删除一个指定目录，加-f则在删除时无视一切警告，直接删除
       -i            # 删除时进行确认(建议总是使用这一选项)
       -d            # 删除一个空目录(在删除空目录时应总是选择-d而不是-r,以免意外)
    rm file          # 删除文件file
```

## ps

查看进程信息

```bash
    ps -A / ps -e     # 列出所有进程
    ps -A --forest    # 列出所有进程，以树状形式显示进程间的父子关系
    ps -a             # 显示所有没有tty的进程
    ps -ax            # 显示所有进程  -x: 解除其他命令要求tty的限制。一般用于与-a配合显示所有进程
    ps -aux           # 显示所有包含其他使用者的进程（常用）
```

## grep

匹配与查找

```bash
    grep [options]... pattern [file]...
         -c         # 计算符合样本范式的数目
         -n         # 显示匹配行的行号
         --color    # 高亮输出匹配项
                    #（部分linux默认 alias grep='grep --color=auto'）
         -i         # 忽略大小写
         -v         # 反向匹配，查找不包含指定内容的行
    # 常用例子
    grep pattern ./ -d recurse  # 在当前文件夹查找所有文件匹配pattern的行
                                # -d recurse 进入目录查找
                                # -d read
                                # -d skip   跳过目录（对于此命令相当于啥也不干）
    echo "a123b123b" | grep a.*b  # 默认贪婪匹配，即匹配到全文
    grep m.*n test.c              # 在test.c内查找匹配该正则的行
    grep m.*n test.c -A 2         # 额外再显示匹配行后两行的内容
    grep m.*n test.c -B 3         # 额外再显示匹配行前三行的内容
```

## du

查看文件或目录的占用空间大小

```bash
    du           # 查看当前文件夹的磁盘空间占用（默认即递归显示所有文件）
    du -h        # 将输出信息调整为更易阅读的形式
    du -m /path  # 以Mb为基本单位显示/path的信息
```

## df

显示目前linux上文件系统的磁盘使用情况

```bash
    df -h        # 查看磁盘使用情况。 -h的作用也是优化输出信息，使其更易读
```

## find

查找文件

```bash
    find ./               # 查找当前目录下所有文件（包括所有子目录下的文件）
    find ./ -name "*abc?"  # 查找当前目录下文件名后缀是abc?的文件,?表示任意单字符
            -iname         # 基本等价-name，但是忽略大小写
    find /path/dir -ctime -2   # dir目录下前两天修改过的文件
    find /path/dir -ctime +2   # dir.....两天前........文件
                   -atime -2   # ........前两天被读取过的文件
                   -size +1k   # dir下大于1k的文件
                   -size -10c  # dir下小于10字节的文件
                               # 类似的还有 w:字（双字节），M:MBytes，G:GBytes
```

## kill / killall

终止进程

```bash
    kill 12345     # 终止pid为12345的进程
    kill -9 12345  # 彻底终止进程

    # killall 使用名称终止进程
    killall vi   # 终止所有vi进程
            -r   # 使用正规表达式匹配要杀死的进程名称
```

## chmod

更改文件权限

```bash
    chmod u+x t.py      # 给t.py 加上文件拥有者可执行的权限
    chmod +x t.py       # 给t.py 加上文件拥有者，拥有者当前组，其他组的执行权限
    chmod 777 t.py      # 给t.py所有权限 (-rwxrwxrwx)
                        # 777表示（111,111,111）,每个 111 表示对应的 rwx 权限开启
```

## uname

```bash
    uname -a    # 查看当前系统信息
```

## netstat

```bash
    netstat -t        # 显示tcp相关的选项
            -u        # 显示udp相关的选项
            -s        # 显示每个协议的统计信息（如-st表示tcp相关统计信息）
            -a        # 显示所有端口(如-au表示udp相关的端口)
            -l        # 显示处于监听状态（Listening）的端口
            -r        # 显示核心路由信息
            -p        # 显示socket所属的程序名及pid
    # 示例
    netstat -ap | grep ssh  # 找到程序运行的端口
```

