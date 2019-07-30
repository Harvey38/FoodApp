const app = require('./index.js');
require('./mongoose');
const port = 3000;
app.listen(port, function () {
    console.log("Server listening at port " + port);
})
