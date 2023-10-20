import { promisify } from "util";
import fs from "fs";

const unlinkAsync = promisify(fs.unlink);
export const deleteImage = async (path: string) => {
  await unlinkAsync(path);
};
