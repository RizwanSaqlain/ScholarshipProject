const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Tesseract = require('tesseract.js');
const Groq = require('groq-sdk');
const cors = require('cors');
const pdfParse = require('pdf-parse');
const { exec } = require('child_process'); 
const { PersonalDetails, FamilyIncomeDetails, AddressContactDetails } = require('./models/studentDetail.model');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/StudentDetails')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create an absolute path for the uploads directory
const uploadsDir = path.resolve(__dirname, '../uploads');

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

// Initialize Groq client with hardcoded API key
const groq = new Groq({ apiKey: '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' });

// Function to convert PDF to image using pdf-poppler (or another tool)
function convertPdfToImage(pdfPath, outputPath) {
  return new Promise((resolve, reject) => {
    const command = `pdftoppm -png -singlefile -r 300 "${pdfPath}" "${outputPath}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(`Error converting PDF to image: ${stderr}`);
      }
      resolve(`${outputPath}.png`);
    });
  });
}

// Function to extract text from PDFs
async function extractTextFromPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  let extractedText = data.text.trim();

  if (!extractedText) {
    console.log('No text found, converting PDF to image...');

    // Convert PDF to image
    const outputPath = path.join(__dirname, 'uploads', 'pdf_image_output');
    const imagePath = await convertPdfToImage(filePath, outputPath);

    // Extract text from the image
    extractedText = await extractTextFromImage(imagePath);

    // Clean up generated image file after processing
    fs.unlinkSync(imagePath);
  }

  return extractedText;
}

// Function to extract text from images using Tesseract
function extractTextFromImage(imagePath) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(
      imagePath,
      'eng',
      {
        logger: info => console.log(info), 
      }
    ).then(({ data: { text } }) => {
      resolve(text);
    }).catch(err => {
      reject(err);
    });
  });
}

// Function to classify document using Groq
async function classifyDocument(extractedText, filename) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          "role": "system",
          "content": `You are an AI document classification assistant. You will receive text extracted from a document named "${filename}" using OCR (Optical Character Recognition). The text may contain errors or incomplete information due to the nature of OCR. Your task is to determine the most likely type of document from the following categories:
          <documents> 
          Passport Size Photo, Signature (this will not be more than 1 or 2 words), Marksheet, Domicile Certificate, Income Certificate, Undertaking Certificate, Aadhaar Card, Diploma Certificate(documents may contain words like graduation certificate)
          </documents>.
          You can use the help of document name as well. If the text does not strongly match any of these categories, respond with 'Unknown'. Provide a clear and concise classification based on the content provided, keep the responses short to just the name of document or unknown, DONT ADD ANY EXTRA WORDS.`
        },
        {
          role: 'user',
          content: `${extractedText}`,
        }
      ],
      model: 'llama3-8b-8192',
    });
    
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error('Error classifying document:', error);
    throw error;
  }
}


// Handle batch file uploads and processing
app.post('/upload-batch', upload.fields([
  { name: 'Passport Size Photo' },
  { name: 'Scanned Signature' },
  { name: 'SSC Marksheet' },
  { name: 'Domicile Certificate' },
  { name: 'Income Certificate' },
  { name: 'Undertaking Certificate' },
  { name: 'Caste Certificate (other than Open OP)' },
  { name: 'Aadhaar Card' },
  { name: '12th Marksheet' },
  { name: 'Diploma Certificate' }
]), async (req, res) => {
  try {
    const files = req.files;
    const classifications = {
      'Passport Size Photo' : 'Not Uploaded yet',
      'Scanned Signature' : 'Not Uploaded yet',
      'SSC Marksheet' : 'Not Uploaded yet',
      'Domicile Certificate' : 'Not Uploaded yet',
      'Income Certificate' : 'Not Uploaded yet',
      'Undertaking Certificate' : 'Not Uploaded yet',
      'Caste Certificate (other than Open OP)' : 'Not Uploaded yet',
      'Aadhaar Card' : 'Not Uploaded yet',
      '12th Marksheet' : 'Not Uploaded yet',
      'Diploma Certificate' : 'Not Uploaded yet',
    };

    // Iterate over each file in the batch
    for (const fieldName in files) {
      const file = files[fieldName][0];
      const filePath = path.resolve(__dirname, '../uploads', file.filename);
      const fileExtension = path.extname(filePath).toLowerCase();

      let extractedText = '';

      // Extract text from each file
      if (['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
        extractedText = await extractTextFromImage(filePath);
      } else if (fileExtension === '.pdf') {
        extractedText = await extractTextFromPDF(filePath);
      } else {
        return res.status(400).send('Unsupported file format. Please use PNG, JPG, JPEG, or PDF.');
      }

      console.log(`Extracted Text from ${fieldName}:`, extractedText);
      
      if(extractedText != ''){
         // Classify the document based on the extracted text
        const fileName = file.filename;
        console.log(fileName);
        const classification = await classifyDocument(extractedText, fileName);
        console.log(`Classification Result:${classification}`)
        if (classification.toLowerCase().includes("unknown" || "unknown.")){
          classifications[fieldName] = "Unable to classify"; 
        } else {
          classifications[fieldName] = classification; 
        }
      } else {
        classifications[fieldName] = "Unable to extract text";
      }

      // Clean up the uploaded file
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
      }
    }

    // Send the classification results
    console.log(classifications)
    res.status(200).json({ classifications });

  } catch (error) {
    console.error('Error processing batch upload:', error);
    res.status(500).json({ error: 'An error occurred while processing the files.', details: error.message });
  }
});


// Sample data (You would fetch this from MongoDB in real implementation)
const addressDetails = {
  mobileNumber: '9906191257',
  alternateMobileNumber: '',
  email: 'vs25122004vs@gmail.com',
  alternateEmail: '',
  permanentAddress: 'VILLAGE RAJWALTA POST OFFICE GALAK',
  currentAddress: 'VILLAGE RAJWALTA POST OFFICE GALAK',
  state: 'Jammu and Kashmir',
  currentState: 'Jammu and Kashmir',
};

const attachmentDetails = [
  { name: "Photo", uploaded: true, verified: true },
  { name: "Signature", uploaded: true, verified: true },
  { name: "Father/Guardian Photo", uploaded: false, verified: false },
  { name: "Mother/Guardian Photo", uploaded: false, verified: false },
  { name: "SSC Marksheet", uploaded: true, verified: true },
  { name: "Domicile Certificate", uploaded: true, verified: true },
  { name: "Income Certificate", uploaded: true, verified: true },
  { name: "Undertaking Certificate", uploaded: true, verified: true },
  { name: "Caste Certificate", uploaded: true, verified: true },
  { name: "Aadhar Card", uploaded: true, verified: true }
];

const familyDetails = {
  "fatherName": "Baldev Raj",
  "motherName": "Neelam Devi",
  "fatherOccupation": "Employed",
  "motherOccupation": "Home Maker",
  "fatherDesignation": "CONSTABLE",
  "motherDesignation": null,
  "fatherMobile": "9682190551",
  "motherMobile": "6005098448",
  "familyIncome": "6,00,001 - 8,00,000"
}

const personalDetails =  {
  "candidateId": "2022335233",
  "candidateName": "VISHAL SINGH",
  "gender": "Male",
  "domicileJk": true,
  "dob": "25-12-2004",
  "aadhar": "123456753425",
  "casteCategory": "",
  "subCasteCategory": "",
  "physicallyDisabled": false
}



app.get('/api/address-details', (req, res) => {
  res.json(addressDetails);
});

app.get('/api/attachments', (req, res) => {
  res.json(attachmentDetails);
});

app.get('/api/family-details', (req, res) => {
  res.json(familyDetails);
});

app.get('/api/personal-details', (req, res) => {
  res.json(personalDetails);
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
