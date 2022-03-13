/*
	REQUIRE
*/

const express = require('express')
const chance = require('chance').Chance()
const fs = require('fs')

/*
	INIT
*/
const db_path = __dirname + "/db"

class info {
	constructor() {
		this.pp_path = db_path + '/pp/'
		this.pp_files = fs.readdirSync(this.pp_path)
		this.pp_size = this.nb_file(this.pp_path)
		this.banner_path = db_path + '/banner/'
		this.banner_files = fs.readdirSync(this.banner_path)
		this.banner_size = this.nb_file(this.banner_path)
	}
	nb_file(dir) {
		const files = fs.readdirSync(dir)
		return (files.length)
	}
	draw_int(max) {
		return chance.integer({min: 0, max: max - 1})
	}
}


const db = new info()
const app = express()

/*
	EXPRESS
*/

app.get('/', (req, res) => {
	res.status(418).send(`Howdy mate`)
})
app.get('/api/profile', (req, res) => {
	if (db.pp_size == 0)
		res.status(501).send(`Number of profile picture = 0`)
	else
		res.sendFile(db.pp_path + db.pp_files[db.draw_int(db.pp_size)])
})
app.get('/api/banner', (req, res) => {
	if (db.banner_size == 0)
		res.status(501).send(`Number of banner picture = 0`)
	else
		res.sendFile(db.banner_path + db.banner_files[db.draw_int(db.banner_size)])
})
app.listen(4000)