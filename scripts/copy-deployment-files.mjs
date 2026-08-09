import { access, copyFile } from "node:fs/promises";
import { constants } from "node:fs";

const source = new URL("../public/.htaccess", import.meta.url);
const destination = new URL("../dist/.htaccess", import.meta.url);

await access(source, constants.R_OK);
await copyFile(source, destination);

console.log("Copied .htaccess into dist/");
