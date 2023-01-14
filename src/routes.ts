import express from 'express';

import root from './modules/root/root.route';

const router = express.Router();

const routes = [
  {
    path: '/',
    route: root,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
