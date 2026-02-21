const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://vishnupriyae307_db_user:lbny omah ahby prab@cluster0.kju3fjd.mongodb.net/TimeCapsuleDB?retryWrites=true&w=majority', {
    serverSelectionTimeoutMS: 30000, // 30 seconds wait pannum
    socketTimeoutMS: 45000, // Connection cut aagama paathukkum
})
.then(() => console.log("Cloud Database Connected ✅"))
.catch(err => console.log("Connection Error: ", err));

const capsuleSchema = new mongoose.Schema({
    title: String,
    message: String,
    unlockDate: String,
    recipientEmail: String,
    isSent: { type: Boolean, default: false }
});
const Capsule = mongoose.model('Capsule', capsuleSchema);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 2522,
    secure: false, 
    auth: { 
        user: 'vishnupriyae307@gmail.com', 
        pass: 'cnhs qzab fssc eyln' 
    }
}); 

app.post('/api/capsules', async (req, res) => {
    try {
        const newCap = new Capsule(req.body);
        await newCap.save();
        res.status(201).json({ message: "Locked!" });
    } catch (err) { res.status(500).send(err); }
});

cron.schedule('* * * * *', async () => {
    const today = new Date().toISOString().split('T')[0];
    const pending = await Capsule.find({ unlockDate: { $lte: today }, isSent: false });
    for (const cap of pending) {
        await transporter.sendMail({
            from: 'vishnupriyae307@gmail.com',
            to: cap.recipientEmail,
            subject: `Time Capsule: ${cap.title}`,
            text: cap.message
        });
        console.log(`Email delivered to ${cap.recipientEmail} 📧`);
        await Capsule.findByIdAndUpdate(cap._id, { isSent: true });
    }
});


app.listen(5000, () => console.log("Server running 🚀"));





