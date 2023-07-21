const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT =  process.env.PORT || 8090;

app.use(express.json());
// app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

// app.use(express.static("/home/ubuntu/face_recognition_files/"));

const server = require("http").createServer(app);

// app.set("socket-io", io);

const routes = require("./routes/index");
const client = require("./database/cassandra");
// const deceptionApi = require("./routes/deceptionApi");
// const heartrateApi = require("./routes/heartRateApi");
// const demographyApi = require("./routes/demographyApi");
// const emotionsApi = require("./routes/emotionsApi");
// const eyeGaze = require("./routes/eyegazeApi");
// const lipSync = require("./routes/lipSync");
// const client = require("./database/cassandra");
// const facebiometrics = require("./routes/faceBio");
// const voicebiometrics = require("./routes/voiceBio");
// const physiological = require("./routes/physiologicalparama");
// const bloodoxygen = require("./routes/bloodOxygenApi");


app.use('/analytics-service',routes);

client.connect((err) => {
  if (err) {
    console.log("Error here ==> ", err.message);
  } else {
    console.log("Cassandra connected!!!");
  }
});



server.listen(PORT, () =>
  console.log(`EMYT ANALYTICS SERVER is running on port ${PORT}`)
);
