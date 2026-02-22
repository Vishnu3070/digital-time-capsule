const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

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
    const { title, message, recipientEmail, unlockDate } = req.body;

    const { data, error } = await supabase
        .from('capsules')
        .insert([{ 
            title: title, 
            message: message, 
            email: recipientEmail, 
            unlock_date: unlockDate,
            issent: false 
        }]);
if (error) {
    console.error("Supabase Error:", error);
    return res.status(500).json({ 
        success: false, 
        error: error.message, 
        detail: error.details 
    });
}

    res.status(200).json({ success: true, message: "Capsule locked successfully!" });
});

cron.schedule('* * * * *', async () => {
    const today = new Date().toISOString().split('T')[0];
    }
});


app.listen(5000, () => console.log("Server running 🚀"));










