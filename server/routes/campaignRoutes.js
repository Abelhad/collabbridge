const express = require('express');
const router = express.Router();

router.post('/', (req, res)=>{
    console.log(req.body);

    res.json({
        message: 'campaign recieved',
        campaign: req.body
    });
});

router.get('/:id', (req, res)=>{
    res.json({
        message: 'campaign found',
        id: req.params.id
    });
});

router.get('/', (req, res)=>{
    res.json({
        location: req.query.location,
        budget: req.query.budget
    });
});

router.put('/:id', (req, res)=>{
    res.json({
        message: 'campaign updated',
        id: req.params.id,
        data: req.body
    });
});

router.delete('/:id', (req, res)=>{
    res.json({
        message: 'Campaign deleted',
        id: req.params.id
    });
});

module.exports = router;