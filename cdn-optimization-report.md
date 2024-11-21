# CDN을 이용한 최적화 보고서

## 목차

1. [비교대상](#비교대상)
2. [CDN-사용-후의-차이점](#CDN-사용-후의-차이점)
3. [CDN-사용-시-문서-사이즈-크기](#CDN-사용-시-문서-사이즈-크기)
4. [CDN-사용-시-이미지-파일의-전송속도](#CDN-사용-시-이미지-파일의-전송속도)
5. [CDN-사용-시-전체-페이지-로딩-속도](#CDN-사용-시-전체-페이지-로딩-속도)

## 비교대상

- S3 버킷 웹사이트: http://azamwa.s3-website.ap-northeast-2.amazonaws.com/
- 배포된 사이트(CloudFront를 이용한 배포): https://hhplusfront3rd.shop/

## CDN 사용 후의 차이점

<div align="center">
 <img src="/public/compareCloudFront/compareXCache.png" alt="파이프라인 다이어그램" width="50%">
</div>

위의 사진처럼 네트워크탭에서 렌더링된 페이지의 문서를 보고 판단할 수 있다.

X-Cache[^1]: Hit from cloudfront가 S3배포사이트에선 없었던 방면, cloudfront를 이용한 배포사이트에선 생겨난 것을 확인할 수 있다.

[^1]: 요청된 데이터가 CloudFront 엣지 서버의 캐시에서 제공되었음을 의미

## CDN 사용 시 문서 사이즈 크기

<div align="center">
 <img src="/public/compareCloudFront/compareDocument.png" alt="파이프라인 다이어그램" width="50%">
</div>

페이지의 HTML문서와 js 청크파일의 크기를 비교한 사진이다.
CloudFront는 해당 파일을 클라이언트에 제공하기 전에 Gzip 또는 Brotli로 압축한 후 전송하기 때문에, 파일의 크기가 상당히 줄어든 모습을 볼 수 있다.
클라이언트에서 압축을 받아 해제하므로, 전송속도는 빨라지고 네트워크 트래픽은 감소한다.

## CDN 사용 시 이미지 파일의 전송속도

<div align="center">
 <img src="/public/compareCloudFront/compareImageTimes.png" alt="파이프라인 다이어그램" width="50%">
</div>

위의 사진은 배포 후 최초 로딩 시 S3배포사이트와 CloudFront배포사이트 이미지 요청시간을 측정한 것인데, 크게 차이가 나지 않는 것을 볼 수 있다.
최초로딩 시, 캐시 서버에 요청한 파일이 없으면 원본 서버(S3)에서 파일을 가져와야 하기에 응답시간이 길어질 수 있기 때문이다.

<div align="center">
 <img src="/public/compareCloudFront/compareImageCache.png" alt="파이프라인 다이어그램" width="50%">
</div>

이 사진은 CloudFront배포사이트의 이미지 요청 시간인데, 위의 사진에 비해 확연히 빨라진 것을 볼 수 있다. CDN 엣지서버에 캐싱이 된 상태이므로, 원본 서버를 거칠 필요가 없기 때문이다.

## CDN 사용 시 전체 페이지 로딩 속도

<div align="center">
 <img src="/public/compareCloudFront/compareRendering.png" alt="파이프라인 다이어그램" width="50%">
</div>

S3배포사이트와 CloudFront 배포사이트의 전체 페이지 로딩속도를 비교한 사진이다.

- S3배포사이트: 약 740ms
- CloudFront 배포사이트: 약 520ms

S3배포사이트에 비해 CloudFront가 약 30% 빠른 페이지 렌더링을 확인 할 수 있다.
사용자의 요청빈도가 더 많아질수록 더 큰 효율을 기대할 수 있다.

- 사용자의 요청이 많아질수록 동일한 정적 리소스에 대한 캐시적중룔(Cache-Hit)가 높아짐.
- 대규모 트래픽이 발생하면 S3는 단일서버에 모든 요청을 해야하는데 비해, CloudFront는 요청을 여러 엣지서버에서 병렬로 처리할 수 있기 때문.
