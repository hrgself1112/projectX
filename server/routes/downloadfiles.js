

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { DatabaseArticles } = require('../models/register');
const JSZip = require('jszip');
const app = express()
const ejs = require('ejs');

const archiver = require('archiver');





router.get('/download-Zipfile-Data', async (req, res) => {

  let QueryIDS = req.query.DownloadAricleByIDs

  const selectedArticleIds = "653130224ce16b78a9a3f411"; // Replace with your selected IDs
  // console.log(req.query.DownloadAricleByIDs)


  const jsonData = await DatabaseArticles.find({ _id: { $in: selectedArticleIds } });

  const outputDirectory = path.join(__dirname, 'generatedFiles');
  const outputDirectoryAMP = path.join(__dirname, 'generatedFiles', 'amp');

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  if (!fs.existsSync(outputDirectoryAMP)) {
    fs.mkdirSync(outputDirectoryAMP, { recursive: true });
  }

  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  archive.on('error', (err) => {
    res.status(500).send({ error: err.message });
  });

  res.attachment('generatedFiles.zip');
  archive.pipe(res);

  for (let i = 0; i < jsonData.length; i++) {
    const data = jsonData[i];
    // console.log(data)
    const filename = data.url.replace(/[^\w\s.-]/gi, '');

   // Add ASP files to the ZIP archive
    archive.file(path.join(outputDirectory, `${filename}.asp`), { name: `generatedFiles/${filename}` });
    archive.file(path.join(outputDirectoryAMP, `${filename}.asp`), { name: `generatedFiles/amp/${filename}` });
  }

  archive.finalize();
});



module.exports = router;

