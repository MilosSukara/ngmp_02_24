import { exec } from 'child_process';
import fs from "node:fs"
import * as rl from 'readline';


const CMD_UNIX = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
const CMD_WIN = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;

const CLI_RATE = 10;
const LOG_RATE = 1 / 5

const cli_formatter = (line) => `${line}`
const log_formatter = (line, date) => `${date} : ${line}\n`;

const COMMAND = (() => {
  if (process.platform === 'win32') {
    return CMD_WIN;
  }
  if (['linux', 'darwin'].includes(process.platform)) {
    return CMD_UNIX;
  }
  console.error("OS not supported");
  process.exit();
})();

const cli_output = (line) => {
  rl.cursorTo(process.stdout, 0, 0);
  rl.clearScreenDown(process.stdout);
  process.stdout.write(cli_formatter(line));
}

const log_output = (line) => {
  const date = (new Date()).getTime().toString();
  try {
    fs.appendFileSync("activityMonitor.log", log_formatter(line, date));
  } catch (err) {
    console.log("Failed to append to file.");
    console.error(err);
  }

};

function execProcess(command, output, delay) {
  exec(command, (e, std, stde) => {
    const line = std.replace(/(\r\n|\n|\r)/gm, "");
    output(line);
  });
  setTimeout(() => execProcess(command, output, delay), delay);
}

execProcess(COMMAND, cli_output, 1000 / CLI_RATE);

execProcess(COMMAND, log_output, 1000 / LOG_RATE);