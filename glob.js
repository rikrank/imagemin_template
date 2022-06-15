const fs = require("fs");
const sharp = require("sharp");
const glob = require("glob");

// const targetResize = Number(process.env.npm_package_config_width);
const targetResize = Number(process.argv[2]); //// コマンドの第一引数が入る

const allowExtensions = ".(jpeg|jpg|JPG|png|webp|bmp|gif)$";
const pattern = "./dist/img/**/*";

if (targetResize) {
  console.log(`サイズ指定：アリ ▶︎ 幅${targetResize}pxでリサイズします。`)
  glob(pattern, (err, files) => {
    if (err) {
      console.log(err);
    }

    const allFilesArr = files.map((file) => {
      const file_type = file.split(".").pop();
      if (allowExtensions.includes(file_type)) return file;
    });

    const filterdFiles = allFilesArr.filter((file) => file);

    filterdFiles.forEach((file) => {
      if (fs.statSync(file).isFile()) {

        // ファイル名だけを抽出
        const replacedPath = file.replace("dist/img", "dist/img/resize");
        const replacedPathArr = replacedPath.split("/");

        const outPutPathArr = replacedPathArr.reduce(
          (previousValue, currentValue, index) => {
            if (index !== replacedPathArr.length - 1) {
              previousValue.push(currentValue + "/");
            }
            return previousValue;
          },
          []
        );

        const outPutPath = outPutPathArr.join("");
        fs.mkdirSync(outPutPath, { recursive: true });
        sharp(file)
          .resize(targetResize)
          .toFile(`${replacedPath}`, (err, info) => {
            if (err) throw err;
            console.log(info);
          });
      }
    });
  });
} else {
  console.log('サイズ指定：ナシ ▶︎ リサイズ処理をスキップします。')
}
