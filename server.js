const { createApp } = require("./app/app");
const { siteConfig } = require("./app/config/site");

const app = createApp();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`${siteConfig.name} running at http://localhost:${port}`);
});
