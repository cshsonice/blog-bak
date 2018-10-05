#!/usr/bin/env python3

"""
    针对指定路径在其index.md中生成信息目录
"""
import os
import sys
from func import read_ignore, is_ignore

def build_info(header, *body):
    """生成目录信息"""
    r = ''
    if len(body) == 0:
        # 没有表数据
        h = '| ' + header + 5 * ' ' + '|'
        gap = '|:' + (len(h) - 4) * '-' + ':|'
        b = '| None' + (len(h) - 7) * ' ' + '|'

    else:
        # 存在表数据
        # 找到最长的元素的长度
        m = len(max(body, key=len))  
        m = max(len(header), m)

        h = '| ' + header + (m - len(header) + 5) * ' ' + '|'  # 每一行长度等于m+5
        gap = '|:' + (len(h) - 4) * '-' + ':|'
        b = ''
        for i in body:
            b += '| ' +  i  + (len(h)-len(i)-3) * ' ' + '|\n'

    r = '\n' + h + '\n' + gap + '\n' + b + '\n'
    return r 

def get_index(path):
    """获取目标文件夹的目录信息"""
    # 如果啥也没有
    if len(os.listdir(path)) == 0:
        nofile = build_info('目录', 'None')
        return nofile

    # 如果有货
    else:
        fdlist = os.listdir(path)
        files, dirs = [], []
        for i in fdlist:
            if os.path.isdir(i):
                dirs.append(i)
            elif os.path.isfile(i):
                files.append(i)
        links = []  # 链接信息
        # 生成目录信息
        dirs_info = []
        ignore_rules = read_ignore()

        for i in dirs:
            if not is_ignore(os.path.join(path, i), ignore_rules):
                dirs_info.append(f"[{i}][{len(links)+1}]")
                links.append("[{}]: {}".format(len(links)+1, './'+i+'/index.md'))

        # 生成文件信息
        files_info = []
        for i in files:
            if not is_ignore(os.path.join(path, i), ignore_rules):
                files_info.append(f'[{i}][{len(links)+1}]')
                links.append("[{}]: {}".format(len(links)+1, './'+i))
        
        # index.md
        d = build_info('directory', *dirs_info)
        f = build_info('articles', *files_info)
        l = '\n'.join(links)
        return f'\n{d}\n{f}\n{l}\n'



if __name__ == "__main__":
    if len(sys.argv) == 1:
        print("too less parameter")
        exit(0)
    
    elif len(sys.argv) == 2:
        path = sys.argv[1]
        if not os.path.isdir(path):
            print('error path')
            exit(0)

        info = get_index(path)
        with open(os.path.join(path, 'index.md'), 'a', encoding='utf8') as f:
            f.write(info)

    else:
        pass