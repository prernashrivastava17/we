const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

var utility = {};

utility.getOtp = (length) => {
  var chars = "0123456789";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
};

utility.fileupload = async (files) => {
    return new Promise(async (resolve, reject) => {
        let listKeys = Object.keys(files);
        var currentPath = process.cwd();
        var file_path = path.join(currentPath, '/public/images');
        var filedata = files[listKeys[0]].mv(file_path + '/'+ files[listKeys[0]].name, (error, data) => {
            if (error) {
                reject(null);
            } else {
                resolve(files[listKeys[0]].name);
            }
        })
    })
  }

utility.uploadBase64Image = (imgBase64) => {
  return new Promise(async (resolve, reject) => {
    let name = await utility.randomString(12);
    let mimeType = imgBase64.match(/[^:/]\w+(?=;|,)/)[0];
    let filename = "img_" + name + "." + mimeType;
    var currentPath = process.cwd();
    var file_path = path.join(currentPath, "/public/images");

    // Remove header
    let base64Image = imgBase64.split(";base64,").pop();

    fs.writeFile(
      file_path + "/" + filename,
      base64Image,
      "base64",
      function (err) {
        if (err) {
          reject(filename);
        }
      }
    );
    resolve(filename);
  });
};

module.exports = utility;
