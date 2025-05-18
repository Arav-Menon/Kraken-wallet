import express from 'express'
import { bankWebhook } from './routes/bankWebhook';

const app = express();

app.use('/api/v1/bankWebhook', bankWebhook);

app.listen(3003, () => {
    console.log('Sever is started')
})