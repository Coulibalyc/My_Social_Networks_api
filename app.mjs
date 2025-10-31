import express from 'express';
import connectDB from './config/db.mjs';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.mjs';
import eventRoutes from './routes/eventRoutes.mjs';
import Groups from './controllers/groupController.mjs';
import Threads from './controllers/threadController.mjs';
import router from './routes/Routesphoto.mjs';
import Polls from './controllers/polls.mjs';
import PollQuestions from './controllers/pollQuestions.mjs';
import PollResponses from './controllers/pollResponses.mjs';
import routertickettype from './routes/ticketTypeRoutes.mjs';
import routerticket from './routes/ticketRoutes.mjs';
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/api/users', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/image',router);
app.use('/api/tickettype',routertickettype)
app.use('/api/ticket',routerticket)
// Utiliser les routes de groupe avec un préfixe
new Groups(app); 
new Threads(app);
new Polls(app);
new PollQuestions(app);
new PollResponses(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));