const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const args = process.argv.slice(2);

const deleteStuff = () => {
    args.forEach((arg) => {
        console.log(arg);
        const directoryPath = path.join(process.cwd(), arg);
        rimraf.sync(directoryPath);
    });
};

deleteStuff();

console.log('Cleanup completed successfully.');
