var kafka = require("kafka-node");
const fetch = require("node-fetch");
const logger = require('sb_logger_util_v2');
const loggerService = require('./loggerService');
const responseCode = messageUtils.RESPONSE_CODE;
const errorCodes = messageUtils.ERRORCODES;
const envVariables = require("../envVariables");
const rspObj = {};

try {
  var Consumer = kafka.Consumer;
  var client = new kafka.KafkaClient({ kafkaHost: envVariables.SUNBIRD_KAFKA_HOST });

  let consumer = new Consumer(client, [{ topic: envVariables.SUNBIRD_QUESTION_BULKUPLOAD_TOPIC }], {
    encoding: "utf8",
    fromOffset: false,
  });
//after kafka consumer receives data from the same topic of the kafka producer.
  consumer
    .on("message", function (message) {
      console.log("------------------RESPONE MESSAGE  ----------------------");
      const qumlArr = JSON.parse(message.value);
      loggerService.entryLog(message.value);
      logger.info({message:"Entered into the consumer service"})
      for (let i = 0; i < qumlArr.length; i++) {
        let parsedJsonValue = JSON.parse(qumlArr[i]);
        let createApiData = {
          request: {
            question: {
              code: parsedJsonValue.question.code,
              mimeType: parsedJsonValue.question.mimeType,
              name: parsedJsonValue.question.name,
              editorState: parsedJsonValue.question.editorState,
              primaryCategory: parsedJsonValue.question.primaryCategory,
              body: parsedJsonValue.question.body,
              processId:parsedJsonValue.question.processId,
              questionId:parsedJsonValue.question.questionId
            },
          },
        };
//fetch call for creating a question.
        fetch(`${envVariables.baseURL}/api/question/v1/create`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createApiData),
        })
          .then((response) => response.json())
          .then((createResponseData) => {
            console.log("create response data", createResponseData);
            let updateApiData = createResponseData;
            parsedJsonValue.question["versionKey"] =
              updateApiData.result.versionKey;
            delete parsedJsonValue.question.mimeType;
            delete parsedJsonValue.question.code;
            delete parsedJsonValue.question.processId;
            delete parsedJsonValue.question.questionId;
            let updateData = { request: parsedJsonValue };
      //if success fetch call for updating question.
            if (((createResponseData.responseCode).toLowerCase()===("OK").toLowerCase())) {
              fetch(
                `${envVariables.baseURL}/api/question/v1/update/${updateApiData.result.identifier}`,
                {
                  method: "PATCH", // or 'PUT'
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updateData),
                }
              )
                .then((response) => response.json())
                .then((updateResponseData) => {
                  console.log("update data", updateResponseData);
                  let reviewData = { request: { question: {} } };
                  //if success fetch call for reviewing question.
                  if (((updateResponseData.responseCode).toLowerCase()===("OK").toLowerCase())) {
                    fetch(
                      `${envVariables.baseURL}/api/question/v1/review/${updateApiData.result.identifier}`,
                      {
                        method: "POST", // or 'PUT'
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(reviewData),
                      }
                    )
                      .then((response) => response.json())
                      .then((reviewResponseData) => {
                        console.log("review data", reviewResponseData);
                        let publishApiData = { request: { question: {} } };
                        //if success fetch call for publishing question.
                        if (((reviewResponseData.responseCode).toLowerCase()===("OK").toLowerCase())) {
                          fetch(
                            `${envVariables.baseURL}/api/question/v1/publish/${updateApiData.result.identifier}`,
                            {
                              method: "POST", // or 'PUT'
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(publishApiData),
                            }
                          )
                            .then((response) => response.json())
                            .then((publishResponseData) => {
                              console.log(
                                "Fetch Publish Success:",
                                publishResponseData
                              );
                              if (((publishResponseData.responseCode).toLowerCase()===("OK").toLowerCase())) {
                                console.log("successfully completed the flow");
                              } else {
                                logger.error({message:"Something went wrong while Publishing the question"});
                                updateResponse(updateApiData.result.identifier,`Something went wrong while Publishing the question`,createResponseData.result.versionKey)
                              }
                            })
                            .catch((error) => {
                              console.error("Error:", error);    
                              updateResponse(updateApiData.result.identifier,`Something went wrong while Publishing the question`,createResponseData.result.versionKey)  
                            });
                        } else {
                          console.log("final review error response");
                          logger.error({message:"Something Went wrong while reviewing the questions"});
                          updateResponse(updateApiData.result.identifier,`Something Went wrong while reviewing the questions`,createResponseData.result.versionKey)      
                        }
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                        logger.error({message:"Something Went wrong while reviewing the questions"});
                        updateResponse(updateApiData.result.identifier,`Something Went wrong while reviewing the questions: ${error}`,createResponseData.result.versionKey)      
                      });
                  } else {
                    console.log("final upadte error issue");
                    logger.error({message:"Something Went Wrong While Updating the question"})
                    updateResponse(updateApiData.result.identifier,`Something Went Wrong While Updating the question:`,createResponseData.result.versionKey)      
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  logger.error({message:"Something Went Wrong While Updating the question"})
                    updateResponse(updateApiData.result.identifier,`Something Went Wrong While Updating the question: ${error}`,createResponseData.result.versionKey)      
                });
            } else {
              console.log("final response error");
              logger.error({message:"Something Went Wrong While Creating the question"})
              updateResponse(updateApiData.result.identifier,`Something Went Wrong While Creating the question:`,createResponseData.result.versionKey)      
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            logger.error({message:"Something Went Wrong While Creating the question"})
              updateResponse(updateApiData.result.identifier,`Something Went Wrong While Creating the question: ${error}`,createResponseData.result.versionKey)     
          });
      }
    })
    .on("error", function (message) {
      console.log(
        "------------------RESPONE MESSAGE ERROR ----------------------"
      );
      consumer.close();
      client.close();
    });
} catch (e) {
  console.log(e);
}

//function to update the status of all other fetch calls mentioned above using question update.
const updateResponse = (updateData,updateMessage,versionKey) => {
  const updateNewData = {
    "request": {
        "question": {
            "versionKey": versionKey,
            "questionUploadStatus":updateMessage
        }
    }
}
  fetch(
    `${envVariables.baseURL}/api/question/v1/review/${updateData}`,
    {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateNewData),
    }
  ).then((response) => response.json())
  .then((updateResult)=>{
console.log(updateResult)
rspObj.responseCode = 'OK'
        rspObj.result = {
          'questionStatus': `Successfully updated the question data for the identifier: ${updateData}`
        }
logger.info({message:"Successfully updated the question data",rspObj});
  })
  .catch((error)=>{
    console.log(error);
    rspObj.errMsg = 'Something Went wrong while updating question data'
    rspObj.responseCode = responseCode.SERVER_ERROR
    logger.error({message:"Something Went wrong while updating question data","errorData":error,rspObj},errorCodes.CODE2)
  })
};