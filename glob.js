const fs = require("fs");
const sharp = require("sharp");
const glob = require("glob");

const targetResize = Number(process.argv[2]); // コマンドの引数が入る

const allowExtensions = ".(jpeg|jpg|png|bmp|gif)$";
const pattern = "./src/**/*";

try {
  if (targetResize) {
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
          const replacedPath = file.replace("src", "dist");
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

          if (!fs.existsSync(outPutPath))
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
    throw new Error("サイズが指定されていません");
  }
} catch (error) {
  console.error(error);
}
