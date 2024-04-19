const app=require('./src/app');
const port = 8080;
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
  });
