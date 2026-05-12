import { writeFile, mkdir } from "fs/promises";
import path from "path";

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);
  if (!files) throw createError({ statusCode: 400, statusMessage: "無資料" });

  const file = files.find((item) => item.name === "file");
  const titleData = files.find((item) => item.name === "title");

  if (!file || !file.filename)
    throw createError({ statusCode: 400, statusMessage: "檔案遺失" });

  const storagePath = path.resolve("public/memes");
  await mkdir(storagePath, { recursive: true });

  // 檔名加上時間戳避免重複
  const safeFilename = `${Date.now()}-${file.filename}`;
  await writeFile(path.join(storagePath, safeFilename), file.data);

  return { success: true, url: `/memes/${safeFilename}` };
});
