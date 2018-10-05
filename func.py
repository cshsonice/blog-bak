"""一些公用函数"""
import os

def is_ignore(root_or_file, ignore_rules):
    """判读目录或文件是否应当被忽略
    
    只支持两种.gitignore规则：*.file 与 dir/
    """
    if os.path.isdir(root_or_file):
        for i in ignore_rules:
            if i.endswith('/'):
                i = i[:-1]  # 去除最后的'/'
                # i为目录名
                # 这里有个神奇的事 '\\'与'/'都只算一个符号所以linux也兼容
                if root_or_file[2:].startswith(i):
                    return True
    elif os.path.isfile(root_or_file):
        for i in ignore_rules:
            if i.startswith('*'):
                i = i[1:]  # 去除首位的'*'
                # i为文件后缀
                if root_or_file.endswith(i):
                    return True
    else:
        # 既不是文件也不是目录，应该是符号链接啥的
        print(root_or_file, 'is not file and is not dir')
        return True
        
    return False

def read_ignore(filename='.gitignore'):
    """读取忽略规则文件"""
    with open('.gitignore', encoding='utf8') as f:
        ignore_rules = f.readlines()
        for i in range(len(ignore_rules)):
            ignore_rules[i] = ignore_rules[i].strip()
        ignore_rules.append('.git/')  # .gitignore不忽略.git/,但这里需要忽略
    return ignore_rules
