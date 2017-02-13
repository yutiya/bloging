-- 单例

```
static DownLoadControl *shareDownLoad = nil;

+ (instancetype)shareInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        shareDownLoad = [[DownLoadControl alloc] init];
    });
    return shareDownLoad;
}

+ (id)allocWithZone:(struct _NSZone *)zone
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        shareDownLoad = [super allocWithZone:zone];
    });
    return shareDownLoad;
}

- (id)copyWithZone:(struct _NSZone *)zone 
{
    return [DownLoadControl shareInstance];
}
```
