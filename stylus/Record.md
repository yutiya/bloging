** 单例

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

** NSURLSeesion

```
    #define DOWNLAOD_RELOAD_DATA    @"NSURLSessionDownloadTaskResumeData"
    
    NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
    [config setTimeoutIntervalForRequest:3];
    _session = [NSURLSession sessionWithConfiguration:config delegate:self delegateQueue:[NSOperationQueue mainQueue]];
    
    self.downloadTask = [self.session downloadTaskWithURL:self.downloadUrl];
    [self.downloadTask resume];
    
    //  暂停
    - (void)pauseAction
    {
        __weak typeof(self) myself = self;
        [self.downloadTask cancelByProducingResumeData:^(NSData * _Nullable resumeData) {
            [resumeData writeToFile:[self resumeDataPath:self.url] atomically:YES];
        }];
    }
    
    //  恢复下载
    - (void)resumeDownloadTask
    {
        //  根据续传数据发起下载任务，那么任务的下载就从续传数据指定的位置开始下载
        self.downloadTask = [self.session downloadTaskWithResumeData:self.resumeData];
        [self.downloadTask resume];
    }
    
    #pragma mark - download delegate
    - (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didFinishDownloadingToURL:(NSURL *)location
    
    - (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didWriteData:(int64_t)bytesWritten totalBytesWritten:(int64_t)totalBytesWritten totalBytesExpectedToWrite:(int64_t)totalBytesExpectedToWrite
    
    - (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error
        [error.userInfo objectForKey:DOWNLAOD_RELOAD_DATA];
```
