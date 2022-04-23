const fs = require("fs");
const makeDir = require("make-dir");
const sharp = require("sharp");

const targetResize = Number(process.argv[2]); // コマンドの引数が入る

const resizedDir = "./src/img/resized";
const srcDir = "./src/img";

makeDir(resizedDir).then((path) => {
  const filelist = fs.readdirSync(srcDir);
  filelist.forEach((file) => {
    if (file !== ".DS_Store") {
      if (fs.statSync(srcDir + "/" + file).isFile()) {
        sharp(srcDir)
          .resize(targetResize)
          .toFile(`${path}/${file}`, (err, info) => {
            if (err) throw err;
            console.log(info);
          });
      }
    }
  });
});
