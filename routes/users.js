var express = require('express');
var router = express.Router();
let connection = require('../config/db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//LIST
router.get('/listar', function(req, res) {

    let sql = `SELECT * FROM user`;
    // let sql2 = `SELECT * FROM users,phone WHERE idphone = idphone`

    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.render('users', { results })
    })
});

//EDIT
router.get('/editar/:iduser', function(req, res) {

    let iduser = req.params.iduser;
    let sql = `SELECT * FROM user WHERE iduser = ${iduser}`;

    connection.query(sql, function(err, result) {
        if (err) throw err;
        let idphone = result[0].idphone;

        let sql2 = `SELECT * FROM phone WHERE idphone= ${idphone}`;
        connection.query(sql2, function(err, result2) {
            if (err) throw err;

            res.render('userProfile', { result, result2 })
        })
    })
});

//UPDATE
router.post('/update/:iduser', function(req, res) {

    let iduser = req.params.iduser;
    let name = req.body.name;
    let last_name = req.body.last_name;
    let model = req.body.model;
    let color = req.body.color;

    // let sql = `UPDATE  user JOIN  phone SET name = '${name}', last_name = '${last_name}',
    //  phone.model=${model}, phone.color=${color} WHERE iduser= ${iduser} AND user.idphone = phone.idphone`;
    let sql = `UPDATE  user JOIN  phone ON user.idphone = phone.idphone SET name = '${name}',
     last_name = '${last_name}',
     phone.model=${model}, phone.color=${color}  WHERE iduser= ${iduser} `;

    connection.query(sql, function(err, result) {

        res.redirect('/users');
    })
});

//DELETE
router.get('/delete/:iduser', function(req, res) {
    let iduser = req.params.iduser;

    let sql = `DELETE FROM user WHERE iduser = ${iduser}`;

    connection.query(sql, function(req, res) {
        res.redirect('/users')

    })
})

module.exports = router;