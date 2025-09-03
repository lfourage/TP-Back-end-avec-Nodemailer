import express from "express";
import router from "./user/route.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', router);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port http://localhost:" + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

