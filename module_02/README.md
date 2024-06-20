# Practical task 02

## Acceptance criteria

- Program uses system shell command output (see Hints) to retrieve process name, CPU, and memory usage details.
- Refresh rate is ten times per second.
- The program uses only the standard library; any third-party modules are prohibited.
- Each update will NOT start from the new line. It is always displayed only in one row.
- Once per minute program appends the output to the log file activityMonitor.log in the format <unixtime> : <process info>. If the file doesn't exist - the program creates it.
- Program supports Linux, macOS, and Windows operating systems.

## Evaluation criteria	
- Only standard library is used
- System command is used to retrieve process name, CPU, and memory usage (from Hints)
- Refresh rate is ten times per second
- Command output is written to activityMonitor.log file in the proper format
- Command output is written to activityMonitor.log file every 1 minute
- Program supports Linux, macOS, and Windows operating systems.

## Run
`npm run start`