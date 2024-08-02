const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const XLSX = require('xlsx');
const path = require('path');
const cors=require("cors")
const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(cors())

// https://script.google.com/macros/s/AKfycbx4uE6uj9KkOQ9m6r4578iqPlsI8fqY6OOXyMCmxm4tb59Cf2fqWtOomBEFiCtlQTZT/exec



app.post('/submit-form', (req, res) => {
    const formData = req.body;

    const dirPath = path.join(__dirname, 'data');
    const filePath = path.join(dirPath, 'form-data.xlsx');

    // Ensure the directory exists
    fs.ensureDirSync(dirPath);

    let workbook;
    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
    } else {
        workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'FormData');
    }

    const worksheet = workbook.Sheets['FormData'];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Append the new data
    jsonData.push(formData);
    const updatedWorksheet = XLSX.utils.json_to_sheet(jsonData);
    workbook.Sheets['FormData'] = updatedWorksheet;

    XLSX.writeFile(workbook, filePath);

    res.send('Form data saved to Excel file.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
