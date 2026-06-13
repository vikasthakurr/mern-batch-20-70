// ============================================================
//          NODE.JS FILE SYSTEM (fs) MODULE - DETAILED NOTES
// ============================================================

// The 'fs' module provides an API for interacting with the file system.
// It allows you to create, read, update, delete files and folders.

// Two ways to import:
// 1. ES Module: import fs from "fs";
// 2. CommonJS: const fs = require("fs");

// ============================================================
//  1. CREATING / WRITING FILES
// ============================================================

// ---- Synchronous (Blocking) ----
// Blocks the code execution until the file is written.
// fs.writeFileSync(filename, content)

// fs.writeFileSync("aryan.txt", "my name is aryan");
// console.log("File created successfully (sync)");

// ---- Asynchronous (Non-Blocking) ----
// Does NOT block code execution. Uses a callback when done.
// fs.writeFile(filename, content, callback)

// fs.writeFile("aryan.txt", "my name is aryan rastogi", (err) => {
//   if (err) return console.log(err);
//   console.log("File written successfully (async)");
// });

// NOTE: writeFile OVERWRITES the entire file content.
// If the file doesn't exist, it creates a new one.

// ============================================================
//  2. APPENDING TO FILES (Add content without overwriting)
// ============================================================

// ---- Synchronous ----
// fs.appendFileSync("aryan.txt", "\nnew line added (sync)");

// ---- Asynchronous ----
// fs.appendFile(filename, content, callback)

// fs.appendFile("aryan.txt", "\nmy name is aryan kumar", (err) => {
//   if (err) return console.log(err);
//   console.log("Content appended successfully");
// });

// ============================================================
//  3. READING FILES
// ============================================================

// ---- Synchronous ----
// const data = fs.readFileSync("aryan.txt", "utf-8");
// console.log(data);

// ---- Asynchronous ----
// fs.readFile(filename, encoding, callback)

// fs.readFile("aryan.txt", "utf-8", (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
// });

// NOTE: "utf-8" encoding returns string. Without it, you get a Buffer (raw binary data).

// ============================================================
//  4. DELETING FILES
// ============================================================

// ---- Synchronous ----
// fs.unlinkSync("aryan.txt");
// console.log("File deleted (sync)");

// ---- Asynchronous ----
// fs.unlink("aryan.txt", (err) => {
//   if (err) return console.log(err);
//   console.log("File deleted (async)");
// });

// ============================================================
//  5. RENAMING FILES
// ============================================================

// ---- Synchronous ----
// fs.renameSync("aryan.txt", "newname.txt");

// ---- Asynchronous ----
// fs.rename("oldname.txt", "newname.txt", (err) => {
//   if (err) return console.log(err);
//   console.log("File renamed successfully");
// });

// ============================================================
//  6. CHECKING IF FILE EXISTS
// ============================================================

// fs.existsSync("aryan.txt"); // Returns true or false

// if (fs.existsSync("aryan.txt")) {
//   console.log("File exists!");
// } else {
//   console.log("File does NOT exist!");
// }

// ============================================================
//  7. CREATING DIRECTORIES (FOLDERS)
// ============================================================

// ---- Synchronous ----
// fs.mkdirSync("myFolder");

// ---- Asynchronous ----
// fs.mkdir("myFolder", (err) => {
//   if (err) return console.log(err);
//   console.log("Folder created");
// });

// ---- Creating Nested Folders ----
// fs.mkdirSync("parent/child/grandchild", { recursive: true });

// ============================================================
//  8. READING DIRECTORIES (List files in a folder)
// ============================================================

// ---- Synchronous ----
// const files = fs.readdirSync("./");
// console.log(files); // Returns an array of filenames

// ---- Asynchronous ----
// fs.readdir("./", (err, files) => {
//   if (err) return console.log(err);
//   console.log(files);
// });

// ============================================================
//  9. DELETING DIRECTORIES
// ============================================================

// ---- Synchronous ----
// fs.rmdirSync("myFolder"); // Only works for EMPTY folders

// ---- Remove folder with content ----
// fs.rmSync("myFolder", { recursive: true, force: true });

// ---- Asynchronous ----
// fs.rm("myFolder", { recursive: true, force: true }, (err) => {
//   if (err) return console.log(err);
//   console.log("Folder deleted");
// });

// ============================================================
//  10. COPYING FILES
// ============================================================

// ---- Synchronous ----
// fs.copyFileSync("source.txt", "destination.txt");

// ---- Asynchronous ----
// fs.copyFile("source.txt", "destination.txt", (err) => {
//   if (err) return console.log(err);
//   console.log("File copied successfully");
// });

// ============================================================
//  11. FILE INFORMATION (Stats)
// ============================================================

// fs.stat gives you details about a file (size, created date, type, etc.)

// fs.stat("aryan.txt", (err, stats) => {
//   if (err) return console.log(err);
//   console.log(stats);
//   console.log("Is File?", stats.isFile());         // true
//   console.log("Is Directory?", stats.isDirectory()); // false
//   console.log("File Size:", stats.size, "bytes");
//   console.log("Created At:", stats.birthtime);
//   console.log("Modified At:", stats.mtime);
// });

// ============================================================
//  12. WATCHING FILES (Detect changes)
// ============================================================

// fs.watch monitors a file/folder for changes in real-time.

// fs.watch("aryan.txt", (eventType, filename) => {
//   console.log(`Event: ${eventType}`);
//   console.log(`File affected: ${filename}`);
// });

// eventType can be: "rename" or "change"

// ============================================================
//  13. STREAMS (For large files - memory efficient)
// ============================================================

// ---- Read Stream ----
// const readStream = fs.createReadStream("largefile.txt", "utf-8");
// readStream.on("data", (chunk) => {
//   console.log("Received chunk:", chunk);
// });
// readStream.on("end", () => console.log("Reading complete"));
// readStream.on("error", (err) => console.log(err));

// ---- Write Stream ----
// const writeStream = fs.createWriteStream("output.txt");
// writeStream.write("Hello ");
// writeStream.write("World!");
// writeStream.end();
// writeStream.on("finish", () => console.log("Writing complete"));

// ---- Piping (Read from one file, write to another) ----
// const readS = fs.createReadStream("input.txt");
// const writeS = fs.createWriteStream("output.txt");
// readS.pipe(writeS); // Copies content from input.txt to output.txt

// ============================================================
//  14. PROMISES API (Modern async/await approach)
// ============================================================

// import fs from "fs/promises";  // Use promises version

// async function fileOperations() {
//   try {
//     await fs.writeFile("test.txt", "Hello from promises!");
//     const data = await fs.readFile("test.txt", "utf-8");
//     console.log(data);
//     await fs.appendFile("test.txt", "\nNew line added");
//     await fs.unlink("test.txt");
//     console.log("All operations done!");
//   } catch (err) {
//     console.log(err);
//   }
// }
// fileOperations();

// ============================================================
//  SUMMARY TABLE
// ============================================================
//
// Operation        | Sync Method          | Async Method
// -----------------+----------------------+---------------------
// Create/Write     | writeFileSync()      | writeFile()
// Append           | appendFileSync()     | appendFile()
// Read             | readFileSync()       | readFile()
// Delete File      | unlinkSync()         | unlink()
// Rename           | renameSync()         | rename()
// Check Exists     | existsSync()         | (use stat/access)
// Create Folder    | mkdirSync()          | mkdir()
// Read Folder      | readdirSync()        | readdir()
// Delete Folder    | rmdirSync() / rmSync | rm()
// Copy File        | copyFileSync()       | copyFile()
// File Info        | statSync()           | stat()
// Watch            | -                    | watch()
// Streams          | -                    | createReadStream/WriteStream
//
// ============================================================
//  KEY POINTS TO REMEMBER
// ============================================================
//
// 1. Sync methods BLOCK the event loop - avoid in production/server code
// 2. Async methods are NON-BLOCKING - preferred for server applications
// 3. Always handle errors in callbacks (err first pattern)
// 4. Use "utf-8" encoding when reading text files
// 5. Use Streams for large files to avoid memory issues
// 6. fs/promises API is the modern way (async/await friendly)
// 7. writeFile OVERWRITES, appendFile ADDS to existing content
// 8. unlink = delete file, rmdir/rm = delete folder
// 9. Use { recursive: true } for nested folder operations
// 10. fs.watch() is useful for building live-reload tools
//
// ============================================================
