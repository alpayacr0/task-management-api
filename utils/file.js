const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "tasks.json");

const readFile = () => {
  try {
    if (!fs.existsSync(filePath)) {
      return { lastId: 0, tasks: [] };
    }
    const veri = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(veri);
  } catch (error) {
    console.error("Okuma hatası:", error);
    return { lastId: 0, tasks: [] };
  }
};

const writeFile = (tasks) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.log("Yazma hatası:", error);
    return false;
  }
};

module.exports = {
  readFile,
  writeFile,
};
