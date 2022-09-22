const fs = require('fs');
const path = require('path');

let destPath;
if (process.argv[2] != null) {
  destPath = process.argv[2];
}

function moveFiles(relativePath, folders, base) {
  fs.promises.rename(
    `${relativePath}${path.sep}${base}`,
    `${relativePath}${path.sep}${folders}${path.sep}${base}`,
    (error) => {
      if (!error) console.log(`${base} has been moved successfully`);
      if (error) console.log(error);
    }
  );
}

function createFolder(relativePath, folderName) {
  let folderPath = `${relativePath}${path.sep}${folderName}`;
  console.log(folderPath);
  try {
    if (!fs.existsSync(folderPath)) {
      fs.promises.mkdir(folderPath).catch(console.error);
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
  }
}

const relativePath = path.join(`../${destPath}`);
console.log(relativePath);
fs.promises
  .readdir(`${relativePath}`) //
  .then((data) => {
    data.forEach((item) => {
      itemDetail = path.parse(item);
      if (
        itemDetail.ext != '' &&
        (itemDetail.ext === '.mp4' || itemDetail.ext === '.mov')
      ) {
        createFolder(relativePath, 'videos');
        moveFiles(relativePath, 'videos', itemDetail.base);
      } else if (
        itemDetail.ext != '' &&
        (itemDetail.ext === '.aae' || itemDetail.ext === '.png')
      ) {
        createFolder(relativePath, 'captured');
        moveFiles(relativePath, 'captured', itemDetail.base);
      } else if (itemDetail.ext != '' && itemDetail.ext === '.jpg') {
        let regex = /(_E)/gm;
        let base = itemDetail.base;
        let test;
        if (base.match(regex)) {
          test = base.replace(regex, '_');
          createFolder(relativePath, 'duplicated');
          moveFiles(relativePath, 'duplicated', test);
        }
      }
    });
  }) //
  .catch(console.error);
