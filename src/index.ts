import app from './app';
import { PORT } from './config';

app.listen(PORT, () => {
  console.info('Listening to port', PORT);
});

process.on('uncaughtException', (e) => {
  console.error(e);
});
