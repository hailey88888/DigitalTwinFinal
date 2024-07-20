const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get files
app.get('/api/files/:siteNo', (req, res) => {
    const siteNo = req.params.siteNo;
    const directoryPath = path.join(__dirname, 'public', 'site', siteNo, 'model');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        res.json(files);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
