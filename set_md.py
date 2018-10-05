#!/usr/bin/env python3

"""
    对一篇普通的markdown文件加入预设的信息(包括js等)，使之能规范化显示在网页上
    本部分只显示在本地
"""
import sys
import os
from func import read_ignore, is_ignore

in_include = "/assets/js/customize.js"  # include的一小段，用来判断是否存在include
include = """\n\n\n<script type="text/javascript" src="/assets/js/customize.js"></script>\n"""


def add_include(file):
    """给文件加入必要的引用信息"""
    with open(file, encoding='utf8') as f:
        r = f.readlines()
    for i in range(len(r)-1, -1, -1):
        if in_include in r[i]:
            return False  # 已存在，不用管
    # 插入尾部
    with open(file, 'a', encoding='utf8') as f:
        f.write(include)
    return True  # 插入成功


def find_md(directory, func=None):
    """从指定文件夹开始，递归找到所有的文章: md
        若func非None，则对每个找到的filename执行func
        return: r (list)
    """
    ignore_rules = read_ignore()  # 获取忽略规则 - list
    r = []
    for root, _dirs, files in os.walk('.'):
        # 首先判断根目录
        if is_ignore(root, ignore_rules):  # 忽略的目录
            continue
        # 其次判断文件
        for file in files:
            if file.endswith('.md'):  # 文件不应该被忽略, 且以.md结尾(省略检查忽略规则)
                f = os.path.join(root, file)
                if func:
                    func(f)
                r.append(f)
    return r


if __name__ == "__main__":
    if len(sys.argv) == 1:
        print('automatic scan current directory, and append include to the file which is end with .md')
        r = find_md('.', add_include)  # 搜索当前目录，对找到的文件进行插入
        print('found directory:\n', r)

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
    


