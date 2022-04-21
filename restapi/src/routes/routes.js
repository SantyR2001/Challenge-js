const express = require('express');
const router = express.Router();
const connection = require('../database')

router.get('/', (req, res) => {
    res.json({"hello": "world"})
})

router.get('/movements', (req, res) => {
    const sql = 'SELECT * FROM budgets';

    connection.query(sql, (error, results) => {
        if(error) {
            throw error
        }
        if(results.length > 0){
            res.json(results)
        }
        else {
            res.send('not results')
        }
    })

})

router.get('movements/:id', (req , res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM budgets WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if(error) {
            throw error
        }
        if(!results){
            res.json(results)
        }
        else {
            res.send('not results')
        }
    })
})

router.post('/add', (req, res) => {
    console.log(req.body);
    const sql = 'INSERT INTO budgets SET ?';
    var date = new Date();
    const postObj = {
        concept: req.body.concept,
        amount: req.body.amount,
        date: date,
        type: req.body.type
    }

    connection.query(sql, postObj, error => {
        if (error) throw error;
        res.send('created!')
    })
})

router.put('/edit/:id', (req, res) =>{
    const {id} = req.params;
    const {concept, amount} = req.body;
    const sql = `UPDATE budgets SET concept = '${concept}', amount = '${amount}' WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) throw error
        res.send('updated!')
    })
})

router.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM budgets WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('deleted!')
    })
})

module.exports = router;