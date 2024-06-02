const fs = require('fs');
const zlib = require('zlib');

const compressFile = (filePath) => {
    const fileContents = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(`${filePath}.gz`);
    const zip = zlib.createGzip();

    fileContents.pipe(zip).pipe(writeStream).on('finish', (err) => {
        if (err) {
            console.error('Error compressing file', err);
        } else {
            console.log('File successfully compressed');
        }
    });
};

const decompressFile = (filePath) => {
    const fileContents = fs.createReadStream(`${filePath}.gz`);
    const writeStream = fs.createWriteStream(filePath);
    const unzip = zlib.createGunzip();

    fileContents.pipe(unzip).pipe(writeStream).on('finish', (err) => {
        if (err) {
            console.error('Error decompressing file', err);
        } else {
            console.log('File successfully decompressed');
        }
    });
};

module.exports = { compressFile, decompressFile };
