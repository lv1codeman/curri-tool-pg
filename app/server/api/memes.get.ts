import { readdir } from "fs/promises";
import path from "path";

export default defineEventHandler(async (event) => {
  // path.resolve('.') 會指向專案根目錄，所以可以直接找到 public
  const storagePath = path.resolve("public/memes");

  try {
    const files = await readdir(storagePath);
    const imageFiles = files.filter((file) =>
      /\.(png|jpe?g|gif|webp)$/i.test(file)
    );

    return imageFiles.map((file) => ({
      title:
        file.split("-").slice(1).join("-").split(".")[0] || file.split(".")[0], // 嘗試過濾掉時間戳顯示標題
      url: `/memes/${file}`,
    }));
  } catch (error) {
    return [];
  }
});
