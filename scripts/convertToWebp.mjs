import fs from "fs";
import path from "path";
import sharp from "sharp";

const convertToWebp = async () => {
  const inputDirectory = path.join(process.cwd(), "public");
  const outputDirectory = path.join(process.cwd(), "public", "convert_webp");

  const fileNames = fs.readdirSync(inputDirectory);
  const supportedFormats = [".jpg", ".jpeg", ".png"];

  //　画像のファイル名の一覧を取得
  const supportedFileNames = fileNames.filter((fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    return supportedFormats.includes(ext);
  });

  const convertedFileNameList = path.join(
    process.cwd(),
    "scripts",
    "convertedFileNameList.json"
  );

  let convertedFileNames = [];

  //　変換済みのファイル名の一覧を取得
  if (fs.existsSync(convertedFileNameList)) {
    const data = fs.readFileSync(convertedFileNameList);
    convertedFileNames = JSON.parse(data);
  }

  //　変換していない画像のファイル名の一覧を抽出
  const beforeConvertFileNames = supportedFileNames.filter(
    (fileName) => !convertedFileNames.includes(fileName)
  );

  try {
    await Promise.all(
      beforeConvertFileNames.map(async (fileName) => {
        const inputPath = path.join(inputDirectory, fileName);
        const outputPath = path.join(
          outputDirectory,
          `${fileName.replace(/\.(jpe?g|png)$/, ".webp")}`
        );

        await sharp(inputPath).webp({ quality: 100 }).toFile(outputPath);
        convertedFileNames.push(fileName);
      })
    );
    console.log("画像の変換に成功しました");
  } catch (error) {
    console.log("画像の変換に失敗しました", error);
  }

  fs.writeFileSync(
    convertedFileNameList,
    JSON.stringify(convertedFileNames, null, 2)
  );
  console.log("webpに変換したファイル", beforeConvertFileNames);
};

convertToWebp();
