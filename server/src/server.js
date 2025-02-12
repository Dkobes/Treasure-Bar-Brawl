import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';
import Userroutes from './routes/api/userroutes.js';
// import authMiddleware from './middleware/auth.js'; 
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.static('../client/dist'));
app.use(express.json());
app.use('/api/users', Userroutes);
// app.use(authMiddleware);
app.use(routes);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
  });

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})