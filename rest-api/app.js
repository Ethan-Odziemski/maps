const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.listen(port, () => console.log('Listening on port: ' + port))

//sql

const pool = mysql.createPool({
    //how many connection at one time
    connectionLimit : 10,
    //It's a local database for now
    host: 'localhost',
    user: 'root',
    password: '',
    //database name
    database: 'cadent'
});

//Get all pipes
app.get('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query('SELECT * from pipes', (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
                console.log('Data returned')
            } else {
                console.log(err)
            }
        })

    })
})

//Get pipe details by ID
app.get('/:pipeID', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query('SELECT * from pipes WHERE pipes.pipeID = ?', [req.params.pipeID], (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
                console.log('Data returned')
            } else {
                console.log(err)
            }
        })

    })
})

//delete pipe details by ID
app.delete('/:pipeID', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(
            'DELETE from pipes WHERE pipeID = ?; ', [req.params.pipeID], (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
                console.log('Deleted ' + [req.params.pipeID] + ' from tables: pipes and coordinates') 
            } else {
                console.log(err)
            }
        })
 
        connection.query(
            'DELETE from coordinates WHERE pipeID = ?; ', [req.params.pipeID], (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
                console.log('Deleted ' + [req.params.pipeID] + ' from tables: pipes and coordinates') 
            } else {
                console.log(err)
            }
        })

    }) 
})

//Get all pipes
app.get('//coordinates', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query('select pipes.pipeID, coordinates.section, coordinates.lat, coordinates.lng ' +
        'from pipes ' +
        'inner join coordinates on pipes.pipeID=coordinates.pipeID;', (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
                console.log('Data returned')
            } else {
                console.log(err)
            }
        })

    })
})

//Get highest pipe ID
app.get('//hpipe', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query('select max(pipes.pipeID) from pipes;', (err, rows) => {
            connection.release()
        var data = JSON.stringify(JSON.parse(JSON.stringify(rows)))
        var ID = data.match(/\d/g);
        ID = ID.join("");
        console.log("highest ID: " + ID)
            if (!err) {
                res.send(ID)
                console.log('Data returned')
            } else {
                console.log(err)
            }
        })

    })
})


