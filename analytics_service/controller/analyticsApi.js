const router = require("express").Router();
require("dotenv").config();
const client = require("../database/cassandra");

const getListOfAvailabeData = async (req, res) => {
  // console.log("meeting_id ", req.query.meeting_id);
  // if (!req.query.inference_id) {
  //   res.status(400).send("Inference Id required");
  // } else {
  //   const options = {
  //     prepare: true,
  //     autoPage: true,
  //     fetchSize: process.env.FETCH_SIZE,
  //   };
  //   const parameters = [`${req.query.inference_id}`];
  //   const query = `select * from emotion_summary allow filtering `;
  //   const result = await client.execute(query, parameters, options);
  //   if (result) {
  //     const data = result.rows;
  //     data.forEach((dataObj) => {
  //       dataObj.class_value = JSON.parse(dataObj.class_value);
  //     });
  //     data.sort((a, b) => {
  //       return a.time - b.time;
  //     });
  //     await addApiLogs(req.originalUrl, "Success", req);
  //     res.send(data);
  //   } else {
  //     console.log("Error CQL Query!!");
  //     await addApiLogs(req.originalUrl, "failed", req);
  //     res.status(500).send("Error Querying Blood Oxygen!!");
  //   }
  // }
  const options = {
    prepare: true,
    autoPage: true,
    fetchSize: process.env.FETCH_SIZE,
  };
  const query = `select inference_id, meeting_id, subject_name from emotion_summary allow filtering `;
  const result = await client.execute(query, options);
  if (result) {
    // console.log("Total Blood Oxygen Fetched", result.rowLength);
    const data = result.rows;
    const reStructredData = [];
    // data.forEach((dataObj) => {
    //   let filteredData = {
    //     "inference_id": dataObj.inference_id,
    //     "meeting_id": dataObj.meeting_id,
    //     "subject_name": dataObj.subject_name,
    //    }
    //    reStructredData.push(filteredData)
    // });
    // data.sort((a, b) => {
    //   return a.time - b.time;
    // });
    res.send(data);
  } else {
    console.log("Error CQL Query!!");
    res.status(500).send("Error Querying Modules");
  }
};

const getEmotion = async (req, res) => {
  // console.log("meeting_id ", req.query.meeting_id);
  if (!req.query.inference_id) {
    res.status(400).send("Inference Id required");
  } else {
    const options = {
      prepare: true,
      autoPage: true,
      fetchSize: process.env.FETCH_SIZE,
    };
    const parameters = [`${req.query.inference_id}`];
    const query = `select  *   from emotion_summary where inference_id = ? allow filtering `;
    console.log(query)
    const result = await client.execute(query, parameters, options);
    console.log(result)
    if (result) {
      const data = result.rows;
      if (data.length > 0) {
        const emotions_summary=data.map((emotion)=>{
          return {
            "subject":emotion.subject_name,
            "anger":emotion.angry,
            "disgust":emotion.disgust,
            "happy":emotion.happy,
            "sad":emotion.sad,
            "surprise":emotion.surprise,
          }
        })
        res.send(emotions_summary)
      } else {
        res.send(data);
      }
    } else {
      console.log("Error CQL Query!!");
      res.status(500).send("Error Querying Emotion Analytics!!");
    }
  }
};
const getStress = async (req, res) => {
  // console.log("meeting_id ", req.query.meeting_id);
  if (!req.query.inference_id) {
    res.status(400).send("Inference Id required");
  } else {
    const options = {
      prepare: true,
      autoPage: true,
      fetchSize: process.env.FETCH_SIZE,
    };
    const parameters = [`${req.query.inference_id}`];
    const query = `select  *   from stress_summary where inference_id = ? allow filtering`;
    console.log(query)
    const result = await client.execute(query, parameters, options);
    console.log(result)
    if (result) {
      const data = result.rows;
      if (data.length > 0) {
        data.sort(function(a,b){
          return a.instance_id - b.instance_id
        })
        res.send(data)
      } else {
        res.send(data);
      }
    } else {
      console.log("Error CQL Query!!");
      res.status(500).send("Error Stress Analytics!!");
    }
  }
};

const getDeception=async (req, res) => {
  // console.log("meeting_id ", req.query.meeting_id);
  if (!req.query.inference_id) {
    res.status(400).send("Inference Id required");
  } else {
    const options = {
      prepare: true,
      autoPage: true,
      fetchSize: process.env.FETCH_SIZE,
    };
    const parameters = [`${req.query.inference_id}`];
    const query = `select  *   from deception_summary where inference_id = ? allow filtering`;
    console.log(query)
    const result = await client.execute(query, parameters, options);
    console.log(result)
    if (result) {
      const data = result.rows;
      if (data.length > 0) {
        data.sort(function(a,b){
          return a.instance_id - b.instance_id
        })
        res.send(data)
      } else {
        res.send(data);
      }
    } else {
      console.log("Error CQL Query!!");
      res.status(500).send("Error Deception_Summary Analytics!!");
    }
  }
};


const getLipSync=async (req, res) => {
  // console.log("meeting_id ", req.query.meeting_id);
  if (!req.query.inference_id) {
    res.status(400).send("Inference Id required");
  } else {
    const options = {
      prepare: true,
      autoPage: true,
      fetchSize: process.env.FETCH_SIZE,
    };
    const parameters = [`${req.query.inference_id}`];
    const query = `select * from lipsync_summary where inference_id = ? allow filtering`;
    console.log(query)
    const result = await client.execute(query, parameters, options);
    console.log(result)
    if (result) {
      const data = result.rows;
      if (data.length > 0) {
        data.sort(function(a,b){
          return a.instance_id - b.instance_id
        })
        res.send(data)
      } else {
        res.send(data);
      }
    } else {
      console.log("Error CQL Query!!");
      res.status(500).send("Error LipSync Analytics!!");
    }
  }
};


const getHeadpose = async (req, res) => {
  if (!req.query.inference_id) {
    res.status(400).send("Inference Id required");
  } else {
    const options = {
      prepare: true,
      autoPage: true,
      fetchSize: process.env.FETCH_SIZE,
    };
    const parameters = [`${req.query.inference_id}`];
    const query = `select   *  from headpose_summary where inference_id = ? allow filtering `;
    const result = await client.execute(query, parameters, options);
    if (result) {
      const data = result.rows;
      return res.send(data);
    } else {
      console.log("Error CQL Query!!");
      res.status(500).send("Error Querying Headpose Analytics!!");
    }
  }
};
const getEyegaze = async (req, res) => {
  if (!req.query.inference_id) {
    res.status(400).send("Inference Id required");
  } else {
    const options = {
      prepare: true,
      autoPage: true,
      fetchSize: process.env.FETCH_SIZE,
    };
    const parameters = [`${req.query.inference_id}`];
    const query = `select   *  from eyegaze_summary where inference_id = ? allow filtering `;
    const result = await client.execute(query, parameters, options);
    if (result) {
      const data = result.rows;
      if (data.length > 0) {
        data.sort(function(a,b){
          return a.instance_id - b.instance_id
        })
        res.send(data)
      } else {
        res.send(data);
      }
    } else {
      console.log("Error CQL Query!!");
      res.status(500).send("Error Querying Eyegaze Analytics!!");
    }
  }
};

const getEyegazeFocus = async (req, res) => {
  if (!req.query.inference_id) {
    res.status(400).send("Inference Id required");
  } else {
    const options = {
      prepare: true,
      autoPage: true,
      fetchSize: process.env.FETCH_SIZE,
    };
    const parameters = [`${req.query.inference_id}`];
    const query = `select   *  from eyegaze_focus_summary where inference_id = ? allow filtering `;
    const result = await client.execute(query, parameters, options);
    if (result) {
      const data = result.rows;
      res.send(data);
    } else {
      console.log("Error CQL Query!!");
      res.status(500).send("Error Querying Eyegaze Analytics!!");
    }
  }
};

const getTextSummary = async (req, res) => {
  if (!req.query.inference_id) {
    res.status(400).send("Inference Id required");
  } else {
    const options = {
      prepare: true,
      autoPage: true,
      fetchSize: process.env.FETCH_SIZE,
    };
    const parameters = [`${req.query.inference_id}`];
    const query = `select   *  from text_summarization where inference_id = ? allow filtering `;
    const result = await client.execute(query, parameters, options);
    if (result) {
      const data = result.rows;
      // const modiFiedEyegazeSummary = [
      //   { type: "Inner", value: data[0].duration_percentage },
      //   { type: "Outer", value: data[1].duration_percentage }
      // ];
      res.send(data);
    } else {
      console.log("Error CQL Query!!");
      res.status(500).send("Error Querying Text Summary!!");
    }
  }
};
const getSentiment = async (req, res) => {
  if (!req.query.inference_id) {
    res.status(400).send("Inference Id required");
  } else {
    const options = {
      prepare: true,
      autoPage: true,
      fetchSize: process.env.FETCH_SIZE,
    };
    const parameters = [`${req.query.inference_id}`];
    const query = `select   *  from sentiment_analysis where inference_id = ? allow filtering `;
    const result = await client.execute(query, parameters, options);
    if (result) {
      const data = result.rows;
      data.sort((a, b) => (a.time > b.time ? 1 : b.time > a.time ? -1 : 0));
      res.send(data);
    } else {
      console.log("Error CQL Query!!");
      res.status(500).send("Error Querying Sentiment Analytics!!");
    }
  }
};
const getMeetingInfo = async (req, res) => {
  // const hhTosec = (val) => {
  //   let value = val.split(":");
  //   let seconds = +value[0] * 60 * 60 + +value[1] * 60 + +value[2];
  //   return seconds;
  // };

  // if (!req.query.inference_id) {
  //   res.status(400).send("Inference Id required");
  // } else {
  //   const options = {
  //     prepare: true,
  //     autoPage: true,
  //     fetchSize: process.env.FETCH_SIZE,
  //   };
  //   const parameters = [`${req.query.inference_id}`];
  //   const query = `select   *  from meeting_info where inference_id = ? and subject = true allow filtering `;
  //   const result = await client.execute(query, parameters, options);
  //   if (result) {
  //     const data = result.rows;
  //     if (data.length > 0) {
  //       const non_sub_dur =
  //         hhTosec(data[0]?.tot_duration) - hhTosec(data[0]?.sub_duration);
  //       const non_sub_conv = new Date(non_sub_dur * 1000)
  //         .toISOString()
  //         .substring(11, 19);
  //       const modiFiedMeetingInfo = [
  //         [{ total_duration: data[0]?.tot_duration }],
  //         [
  //           { type: "Subject Duration", value: hhTosec(data[0]?.sub_duration)  },
  //           { type: "Non-Subject Duration", value: hhTosec(non_sub_conv)  },
  //         ],
  //         [
  //           {
  //             type: "Subject Interactive Percent",
  //             value: data[0]?.percentage_interactiveness,
  //           },
  //           {
  //             type: "Non-Subject Interactive Percent",
  //             value: 100 - data[0]?.percentage_interactiveness,
  //           },
  //         ],
  //       ];
  //       res.send(modiFiedMeetingInfo);
  //     } else {
  //       res.send(data);
  //     }

  //     // res.send(data);
  //   } else {
  //     console.log("Error CQL Query!!");
  //     res.status(500).send("Error Querying Meeting Analytics!!");
  //   }
  // }

  if (!req.query.meeting_id) {
    res.status(400).send("Meeting Id required");
  } else {
    const options = {
      prepare: true,
      autoPage: true,
      fetchSize: process.env.FETCH_SIZE,
    };
    const parameters = [`${req.query.meeting_id}`];
    const query = `select  *   from meetingsdata where meeting_id = ? allow filtering `;
    console.log(query)
    const result = await client.execute(query, parameters, options);
    console.log(result)
    if (result) {
      res.send(result.rows[0])
    } else {
      console.log("Error CQL Query!!");
      res.status(500).send("Error Querying Meeting Information!!");
    }
  }
};

module.exports = {
  getListOfAvailabeData,
  getEmotion,
  getHeadpose,
  getEyegaze,
  getEyegazeFocus,
  getTextSummary,
  getSentiment,
  getMeetingInfo,
  getStress,
  getDeception,
  getLipSync
};
