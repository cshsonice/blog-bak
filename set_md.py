#!/usr/bin/env python3

"""
    对一篇普通的markdown文件加入预设的信息(包括js等)，使之能规范化显示在网页上
    本部分只显示在本地
"""
import sys

in_include = "/assets/js/customize.js"  # include的一小段，用来判断是否存在include
include = """\n\n\n<script type="text/javascript" src="/assets/js/customize.js"></script>\n"""

def add_include(file):
    with open(file, encoding='utf8') as f:
        r = f.readlines()
    for i in range(len(r)-1, -1, -1):
        if in_include in r[i]:
            return False  # 已存在，不用管
    # 插入尾部
    with open(file, 'a', encoding='utf8') as f:
        f.write(include)
    return True  # 插入成功


if __name__ == "__main__":
    if len(sys.argv) == 1:
        print('require argument filename, but not found.')
        exit(0)

    elif len(sys.argv) == 2:
        print('Start format the file ' + sys.argv[1])
        status = add_include(sys.argv[1])
        if status:
            print('插入成功')
        else:
            print('插入失败')
    else:
        print("too much argument, can't to analysis.")
        exit(0)
    


