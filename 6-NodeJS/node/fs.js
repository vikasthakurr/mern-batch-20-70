// --- NODE.JS FILE SYSTEM (fs) MODULE ---

// The 'fs' module provides an API for interacting with the file system.
// It allows you to create, read, update, delete files and folders.

// --- CREATING / WRITING FILES ---

// Synchronous (Blocking) - Blocks execution until file is written:
// fs.writeFileSync("aryan.txt", "my name is aryan");
// console.log("File created successfully (sync)");

// Asynchronous (Non-Blocking) - Uses a callback when done:
// fs.writeFile("aryan.txt", "my name is aryan rastogi", (err) => {
//   if (err) return console.log(err);
//   console.log("File written successfully (async)");
// });

// NOTE: writeFile OVERWRITES entire content. Creates file if doesn't exist.

// --- APPENDING TO FILES ---

// fs.appendFileSync("aryan.txt", "\nnew line added (sync)");

// fs.appendFile("aryan.txt", "\nmy name is aryan kumar", (err) => {
//   if (err) return console.log(err);
//   console.log("Content appended successfully");
// });

// --- READING FILES ---

// Synchronous:
// const data = fs.readFileSync("aryan.txt", "utf-8");
// console.log(data);

// Asynchronous:
// fs.readFile("aryan.txt", "utf-8", (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
// });

// NOTE: "utf-8" encoding returns string. Without it, you get a Buffer.

// --- DELETING FILES ---

// fs.unlinkSync("aryan.txt");
// fs.unlink("aryan.txt", (err) => {
//   if (err) return console.log(err);
//   console.log("File deleted (async)");
// });

// --- RENAMING FILES ---

// fs.renameSync("aryan.txt", "newname.txt");
// fs.rename("oldname.txt", "newname.txt", (err) => {
//   if (err) return console.log(err);
//   console.log("File renamed successfully");
// });

// --- CHECKING IF FILE EXISTS ---

// if (fs.existsSync("aryan.txt")) {
//   console.log("File exists!");
// } else {
//   console.log("File does NOT exist!");
// }

// --- CREATING DIRECTORIES ---

// fs.mkdirSync("myFolder");
// fs.mkdirSync("parent/child/grandchild", { recursive: true });
// fs.mkdir("myFolder", (err) => {
//   if (err) return console.log(err);
//   console.log("Folder created");
// });

// --- READING DIRECTORIES ---

// const files = fs.readdirSync("./");
// console.log(files);

// fs.readdir("./", (err, files) => {
//   if (err) return console.log(err);
//   console.log(files);
// });

// --- DELETING DIRECTORIES ---

// fs.rmdirSync("myFolder"); // Only for EMPTY folders
// fs.rmSync("myFolder", { recursive: true, force: true });

// --- COPYING FILES ---

// fs.copyFileSync("source.txt", "destination.txt");
// fs.copyFile("source.txt", "destination.txt", (err) => {
//   if (err) return console.log(err);
//   console.log("File copied successfully");
// });

// --- FILE INFORMATION (Stats) ---

// fs.stat("aryan.txt", (err, stats) => {
//   if (err) return console.log(err);
//   console.log("Is File?", stats.isFile());
//   console.log("Is Directory?", stats.isDirectory());
//   console.log("File Size:", stats.size, "bytes");
//   console.log("Created At:", stats.birthtime);
// });

// --- WATCHING FILES ---

// fs.watch("aryan.txt", (eventType, filename) => {
//   console.log(`Event: ${eventType}, File: ${filename}`);
// });

// --- STREAMS (For large files - memory efficient) ---

// Read Stream:
// const readStream = fs.createReadStream("largefile.txt", "utf-8");
// readStream.on("data", (chunk) => console.log("Chunk:", chunk));
// readStream.on("end", () => console.log("Reading complete"));

// Write Stream:
// const writeStream = fs.createWriteStream("output.txt");
// writeStream.write("Hello ");
// writeStream.write("World!");
// writeStream.end();

// Piping (copy one file to another):
// const readS = fs.createReadStream("input.txt");
// const writeS = fs.createWriteStream("output.txt");
// readS.pipe(writeS);

// --- PROMISES API (Modern async/await approach) ---

// import fs from "fs/promises";
//
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

// --- SUMMARY TABLE ---

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
// Delete Folder    | rmSync()             | rm()
// Copy File        | copyFileSync()       | copyFile()
// File Info        | statSync()           | stat()

// --- KEY POINTS ---

// 1. Sync methods BLOCK the event loop - avoid in production/server code
// 2. Async methods are NON-BLOCKING - preferred for server applications
// 3. Always handle errors in callbacks (err first pattern)
// 4. Use "utf-8" encoding when reading text files
// 5. Use Streams for large files to avoid memory issues
// 6. fs/promises API is the modern way (async/await friendly)
// 7. writeFile OVERWRITES, appendFile ADDS to existing content
// 8. unlink = delete file, rm = delete folder
// 9. Use { recursive: true } for nested folder operations
// 10. fs.watch() is useful for building live-reload tools
