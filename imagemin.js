const fs = require("fs");
const imagemin = require("imagemin-keep-folder");
const imageminPngquant = require("imagemin-pngquant");
const imageminWebp = require("imagemin-webp");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminSvgo = require("imagemin-svgo");
const sharp = require("sharp");

const srcDir = "./src/img";
const outDir = "./dist/img";
const resizedDir = "./dist/img/resized";

const targetResize = Number(process.argv[2]); // コマンドの引数が入る

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
})
  .then(() => {
    convertWebp(`${outDir}/**/*`);
    console.log("Images optimized!");
  })
  .then(() => {
    // リサイズ処理
    if (!targetResize) throw new Error();
    const filelist = fs.readdirSync(outDir);
    filelist.forEach((file) => {
      if (fs.statSync(outDir + "/" + file).isFile()) {
        fs.mkdirSync(resizedDir, { recursive: true });
        sharp(outDir + "/" + file)
          .resize(targetResize)
          .toFile(`${resizedDir}/${file}`, (err, info) => {
            if (err) throw err;
            console.log(info);
          });
      }
    });
  })
  .then(() => {
    convertWebp(`${resizedDir}/**/*`);
    console.log("Images resized!");
  })
  .catch(() => {
    console.log("Resize Failed.");
  });
