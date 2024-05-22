const path = require("path");
const { google } = require("googleapis");
const stream = require("stream");

exports.uploads = async (req, res) => {
    try {
        // Check if the uploaded file is either PNG or JPEG
        if (!req.file || !(req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png')) {
            return res.status(400).json({ success: false, message: 'Only JPEG and PNG files are allowed!' });
        }
        
            const KEYFILEPATH = path.join(__dirname, "cred.json");
        const SCOPE = ["https://www.googleapis.com/auth/drive"]
        const auth = new google.auth.GoogleAuth({
            keyFile: KEYFILEPATH,
            scopes: SCOPE
        })
        console.log(req)
        const drive = google.drive({version: 'v3', auth: auth})
        const fileMetaData = {
            name: req.file.originalname,
            parents: ["1rPcBH6lyTxrlTojdeWCDypAt_lajWf59"]
        }
        const bufferStream = new stream.PassThrough()
        bufferStream.end(req.file.buffer)

        const media = {
            mimeType: req.file.mietype,
            body: bufferStream
        }
        const file = await drive.files.create({
            requestBody: fileMetaData,
            media
        })

        const imageUrl1 = `https://drive.google.com/uc?export=view&id=${file.data.id}`;
        const imageUrl2 = `https://drive.google.com/file/d/${file.data.id}`;
        console.log("URL 1:", imageUrl1);
        console.log("URL 2:", imageUrl2);

        res.status(200).json({success: true, url: imageUrl1, message: 'Image successfully uploaded to drive'});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}