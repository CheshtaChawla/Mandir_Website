const admin = require('firebase-admin');
const fs = require('fs');
const XLSX = require('xlsx');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin SDK
const serviceAccount = require('./mandir-website-c9eb7-firebase-adminsdk-oee6u-f089d2b449.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function exportData() {
  const contactFormData = [];
  const enquiriesData = [];
  
  // Fetch data from Firestore
  const contactFormSnapshot = await db.collection('contact_form').get();
  const enquiriesSnapshot = await db.collection('enqueries').get();


  console.log(enquiriesSnapshot)
  // Process contact_form data
  contactFormSnapshot.forEach(doc => {
    contactFormData.push({ id: doc.id, ...doc.data() });
  });

  // Process enquiries data
  enquiriesSnapshot.forEach(doc => {
    enquiriesData.push({ id: doc.id, ...doc.data() });
  });

  // Convert JSON to worksheets
  const contactFormWorksheet = XLSX.utils.json_to_sheet(contactFormData);
  const enquiriesWorksheet = XLSX.utils.json_to_sheet(enquiriesData);

  // Create workbooks
  const contactFormWorkbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(contactFormWorkbook, contactFormWorksheet, 'ContactForm');
  
  const enquiriesWorkbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(enquiriesWorkbook, enquiriesWorksheet, 'Enquiries');

  // Write to Excel files
  const contactFormFilePath = 'contact-form.xlsx';
  const enquiriesFilePath = 'enquiries.xlsx';

  XLSX.writeFile(contactFormWorkbook, contactFormFilePath);
  XLSX.writeFile(enquiriesWorkbook, enquiriesFilePath);

  console.log('Excel files created successfully!');

  // Send email with the Excel files
  await sendEmailWithAttachments([contactFormFilePath, enquiriesFilePath]);
}

async function sendEmailWithAttachments(filePaths) {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gouravinsaan@gmail.com', // replace with your email
      pass: 'lhoa wyjt rscs qlie' // replace with your app-specific password
    }
  });

  // Setup email data
  const mailOptions = {
    from: 'gouravinsaan@gmail.com',
    to: 'cheshtachawlagroobe@gmail.com', // replace with recipient's email
    subject: 'Firestore Data',
    text: 'Please find the attached Firestore data.',
    attachments: filePaths.map(filePath => ({
      filename: filePath,
      path: filePath
    }))
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

exportData().catch(console.error);
