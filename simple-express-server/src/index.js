const express = require('express');
const app = express();
const port = 8001;

app.listen(port, () => {
  console.log(`Node server listening at http://localhost:${port}`);
});