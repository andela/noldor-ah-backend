import fileSystem from 'fs';
import root from 'app-root-path';
import util from 'util';
import path from 'path';


const logger = {};

const isDir = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fileSystem.existsSync(dirname)) return true;
  isDir(dirname);
  fileSystem.mkdirSync(dirname);
};

isDir(`${root}/logs/info.log`);
isDir(`${root}/logs/error.log`);

const infoStream = fileSystem.createWriteStream(`${root}/logs/info.log`, { flags: 'a' });
const errorStream = fileSystem.createWriteStream(`${root}/logs/error.log`, { flags: 'a' });

fileSystem.readdir(`${root}/logs/`, (error, items) => {
  if (error) throw error;
  items.forEach((file) => {
    const fileSizeInBytes = fileSystem.statSync(`${root}/logs/${file}`).size;
    // Check if file size is greater than a certain amount
    if (fileSizeInBytes > 1048576) {
      // truncate file content
      fileSystem.writeFile(`${root}/logs/${file}`, '', () => null);
    }
  });
});


logger.info = (info) => {
  const message = `[${new Date()}] : ${util.inspect(info)}\n`;
  infoStream.write(message);
};

logger.error = (error) => {
  const message = `[${new Date()}] : ${util.inspect(error)}\n`;
  errorStream.write(message);
};

export default logger;
