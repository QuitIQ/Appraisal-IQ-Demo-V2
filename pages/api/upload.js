// pages/api/upload.js

import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Important: Disables Next.js's body parsing so that formidable can handle it
  },
};

const uploadDir = path.join(process.cwd(), '/public/assets');

// Ensure the upload directory exists
fs.mkdirSync(uploadDir, { recursive: true });

const handler = (req, res) => {
  const form = formidable({
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => {
      // Keep the original filename
      return part.originalFilename;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Formidable error:', err);
      return res.status(500).json({ error: 'File upload failed.' });
    }

    const file = files.file[0]; // Assuming `file` is the key used for the uploaded file
    const filePath = `/assets/${file.newFilename}`; // Construct the relative file path

    res.status(200).json({ filePath }); // Return the file path in the response
  });
};

export default handler;
