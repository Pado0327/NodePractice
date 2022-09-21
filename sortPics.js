const fs = require('fs').promises;
const path = require('path');

let destPath;
if (process.argv[2] != null) {
  destPath = process.argv[2];
}

const relativePath = path.join(`../${destPath}`);

fs.readdir(`${relativePath}`) //
  .then((data) => {
    // 오브젝트로 정리?
    let videos = [];
    let picsFromApple = [];
    let picsFromAndroid = [];

    data.forEach((item) => {
      itemDetail = path.parse(item);
      if (
        itemDetail.ext != '' &&
        (itemDetail.ext === '.mp4' || itemDetail.ext === '.mov')
      ) {
        fs.rename(
          `${relativePath}${path.sep}${itemDetail.base}`,
          `${relativePath}${path.sep}videos${path.sep}${itemDetail.base}`,
          (error) => {
            if (!error)
              console.log(`${itemDetail.base} has been moved successfully`);
            if (error) console.log(error);
          }
        );
      }
    });
  }) //
  .catch(console.error);

// 1 정리 파일 나누기
//  확장자.. 동영상 나누기.  ->  이동
// 확장자 png, aee -> 캡쳐
//안드로이드 e 가 있다? -> duplicate 폴더
