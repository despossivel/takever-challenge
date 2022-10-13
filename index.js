'use strict';

const app = require('./src/server'),
    PORT = 5005;

app.listen(process.env.PORT || PORT, _ => console.log(`SERVER ON-LINE NA PORTA ${PORT}`));