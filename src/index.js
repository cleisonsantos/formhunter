require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const routes = require('./routes/routes')

app.use(routes);

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})