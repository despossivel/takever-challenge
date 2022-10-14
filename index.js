'use strict';

const app = require('./src/server'),
    PORT = process.env.PORT || 80;

app.listen(PORT, _ => console.log(`SERVER ON-LINE NA PORTA ${PORT}`));