const express = require('express');
const app = express();

app.use(express.json());

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

app.post('/api/campaigns', (req, res)=>{
    console.log(req.body);

    res.json({
        message: 'Campaign received',
        campaign: req.body
    });
});

app.listen(3000, ()=>{
    console.log('server running on port 3000');
})
