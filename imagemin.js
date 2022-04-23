const fs = require("fs");
const writeFileSync = require("fs");
const imagemin = require("imagemin-keep-folder");
const imageminPngquant = require("imagemin-pngquant");
const imageminWebp = require("imagemin-webp");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminSvgo = require("imagemin-svgo");

const srcDir = "./src/img";
const outDir = "./dist/img";

// dist配下の画像ファイルをwebp変換
function convertWebp(targetFiles) {
  imagemin([targetFiles], {
    use: [imageminWebp()],
  });
}

imagemin([`${srcDir}/**/*`], {
  plugins: [
    imageminMozjpeg({ quality: 80 }),
    imageminPngquant(),
    imageminGifsicle(),
    imageminSvgo(),
  ],
  replaceOutputDir: (output) => {
    return output.replace(/img\//, "../dist/img/");
  },
}).then(() => {
  convertWebp(`${outDir}/**/*`);
  console.log("Images optimized!");
});
