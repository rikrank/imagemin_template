const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

const newWidth = 800;

const inDir = "src/img/"; // 変換前の保存先フォルダ
const outDir = "out/img"; // 変換後の保存先フォルダ

const filelist = fs.readdirSync(inDir);

// filelist.forEach((filename) => {
//   const filepath = inDir + filename;

//   // ファイルがあるかどうかの確認
//   if (fs.statSync(filepath).isFile()) {
//     if (path.extname(filepath) === ".jpg") {
//       sharp(filepath)
//         .resize(750)
//         .toFile(`out/img/${filename}`, (err, info) => {
//           if (err) throw err;
//         });
//       console.log("foo");
//     }
//   }
// });

fs.mkdir("out/img", { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
});
