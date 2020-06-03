const express = require('express')

const app = express()
app.set('secret', 'asdfghjkl')

app.use(require('cors')())
app.use(express.json())

app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))
app.use('/uploads', express.static(__dirname + '/uploads')) // 静态文件

require('./plugins/db')(app)
require('./router/admin')(app)
require('./router/web')(app)
// require('./router/admin/upload')(app)
app.listen(3000, () => {
	console.log('http://localhost:3000')
})
