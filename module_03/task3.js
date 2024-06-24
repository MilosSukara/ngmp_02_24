import csv from 'csvtojson'
import fs from 'fs'

const INPUT_PATH = 'csv/nodejs-hw1-ex1.csv';
const OUTPUT_PATH = 'output.txt'

const writeableStream = fs.createWriteStream(OUTPUT_PATH)

const onError = err => console.log(err);
const onComplete = () => writeableStream.end();

csv()
  .fromFile(INPUT_PATH)
  .subscribe((json) => {
    const line = Object.entries(json).map(pair => [pair[0].toLocaleLowerCase(), pair[1]]);
    writeableStream.write(`${JSON.stringify(Object.fromEntries(line))}\n`)
  }, onError, onComplete);