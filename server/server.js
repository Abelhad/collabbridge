const express = require('express');
const app = express();
const campaignRoutes = require('./routes/campaignRoutes');
const logger = require('./middleware/logger');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const profileRoutes = require('./routes/profileRoutes');
const businessProfileRoutes = require('./routes/businessProfileRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.get('/', (req, res)=>{
    res.json({
        message: 'collabBridge Api is running'
    });
});

app.get('/api/users', (req, res)=>{
    res.json({
        message: 'All users'
    });
});

app.get('/api/creators', (req, res)=>{
    res.json({
        message: 'creators'
    });
});

app.get('/api/businesses', (req, res)=>{
    res.json({
        message: 'businesses'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/business-profiles', businessProfileRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/applications', applicationRoutes);

const pool = require('./config/db');

pool.query('SELECT NOW()')
    .then(result=>{
        console.log('Database connected:', result.rows[0])
    })
    .catch(error =>{
        console.error('Database connection failed:', error);
    })

app.listen(3000, ()=>{
    console.log('server running on port 3000');
})
