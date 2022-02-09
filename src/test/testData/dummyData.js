exports.programUpdate = {
  program_id: "",
  description: "description update by testCases",
  rolemapping: { REVIEWER: ["f7dab7bc-b9ea-457a-b4d9-7633fbd9736c"] },
};

exports.mandatoryFieldsProgramCreate = ["config", "type"]; // ['config', 'type', 'status', 'createdby']
exports.mandatoryFieldsProgramUpdate = ["program_id"]; // ['program_id', 'status', 'updatedby']

exports.nominationAdd = {
  program_id: "",
  user_id: "f7dab7bc-b9ea-457a-b4d9-7633fbd9736c",
  status: "Initiated",
  content_types: ["PracticeQuestionSet"],
  organisation_id: "4fe5d899-dc3e-48de-b0b6-891e0922d371",
  createdby: "f7dab7bc-b9ea-457a-b4d9-7633fbd9736c",
};

exports.nominationUpdate = {
  program_id: "",
  user_id: "f7dab7bc-b9ea-457a-b4d9-7633fbd9736c",
  status: "Pending",
  content_types: ["PracticeQuestionSet"],
  updatedby: "6e1cef48-aa38-4d53-9f3a-4f73dafd4d88",
  collection_ids: ["do_11305198433242316813067"],
};

exports.mandatoryFieldsNominationAdd = ["program_id", "user_id", "status"]; // ['program_id', 'user_id', 'status', 'createdby']
exports.mandatoryFieldsNominationUpdate = ["program_id", "user_id"]; // ['program_id', 'user_id', 'status', 'updatedby']

exports.preferenceAdd = {
  preference: { medium: ["English"], subject: ["English"] },
  program_id: "",
  type: "sourcing",
  user_id: "cca53828-8111-4d71-9c45-40e569f13bad",
};

exports.preferenceRead = {
  program_id: "",
  user_id: "cca53828-8111-4d71-9c45-40e569f13bad",
};

exports.regOrgSearch = {
  id: "open-saber.registry.search",
  ver: "1.0",
  ets: "11234",
  params: {
    did: "",
    key: "",
    msgid: "",
  },
  request: {
    entityType: ["Org"],
    filters: {
      osid: {
        or: ["4fe5d899-dc3e-48de-b0b6-891e0922d371"],
      },
    },
  },
};

exports.regUserSearch = {
  id: "open-saber.registry.search",
  ver: "1.0",
  ets: "11234",
  params: {
    did: "",
    key: "",
    msgid: "",
  },
  request: {
    entityType: ["User"],
    filters: {
      userId: {
        or: ["f7dab7bc-b9ea-457a-b4d9-7633fbd9736c"],
      },
    },
  },
};

exports.getCollectionWithProgramId = {
  request: {
    filters: {
      programId: "",
      objectType: "content",
      status: ["Draft"],
      contentType: "Textbook",
    },
    fields: [
      "name",
      "medium",
      "gradeLevel",
      "subject",
      "chapterCount",
      "acceptedContents",
      "rejectedContents",
      "openForContribution",
      "chapterCountForContribution",
      "mvcContributions",
    ],
    limit: 1000,
  },
};

exports.resultsGetCollectionWithProgramId = {
  result: {
    content: [
      {
        acceptedContents: [
          "do_11306389208843059216360",
          "do_11306389247965593616362",
          "do_11306390239684198416364",
        ],
        chapterCount: 2,
        identifier: "do_11306389164045926416355",
        medium: "Hindi",
        name: "DP-30",
        objectType: "Content",
        rejectedContents: [
          "do_11306389286445875216363",
          "do_11306390274224947216366",
        ],
        subject: "Hindi",
        openForContribution: true,
        mvcContributions: ["do_123"],
      },
    ],
    count: 1,
  },
};

exports.getSampleContentWithOrgId = {
  request: {
    filters: {
      programId: "",
      objectType: "content",
      status: ["Review", "Draft"],
      sampleContent: true,
    },
    aggregations: [
      {
        l1: "collectionId",
        l2: "organisationId",
      },
    ],
    limit: 0,
  },
};

exports.resultsGetSampleContentWithOrgId = {
  result: {
    count: 3,
    aggregations: [
      {
        values: [
          {
            count: 3,
            name: "do_11306389164045926416355",
            aggregations: [
              {
                values: [
                  {
                    count: 2,
                    name: "4fe5d899-dc3e-48de-b0b6-891e0922d371",
                  },
                ],
                name: "organisationId",
              },
            ],
          },
        ],
        name: "collectionId",
      },
    ],
  },
};

exports.getSampleContentWithCreatedBy = {
  request: {
    filters: {
      programId: "",
      objectType: "content",
      status: ["Review", "Draft"],
      sampleContent: true,
    },
    aggregations: [
      {
        l1: "collectionId",
        l2: "createdBy",
      },
    ],
    limit: 0,
  },
};

exports.resultsGetSampleContentWithCreatedBy = {
  result: {
    count: 3,
    aggregations: [
      {
        values: [
          {
            count: 3,
            name: "do_11306389164045926416355",
            aggregations: [
              {
                values: [
                  {
                    count: 1,
                    name: "f7dab7bc-b9ea-457a-b4d9-7633fbd9736c", // same as nominationAdd user_id
                  },
                  {
                    count: 1,
                    name: "g7dab7bc-b9ea-457a-b4d9-7633fbd9736c",
                  },
                  {
                    count: 1,
                    name: "h7dab7bc-b9ea-457a-b4d9-7633fbd9736c",
                  },
                ],
                name: "createdBy",
              },
            ],
          },
        ],
        name: "collectionId",
      },
    ],
  },
};

exports.resultsGetSampleContentWithOrgId_01 = {
  result: {
    count: 3,
    aggregations: [
      {
        values: [
          {
            count: 3,
            name: "do_11306389164045926416355",
            aggregations: [
              {
                values: [
                  {
                    count: 2,
                    name: "5fe5d899-dc3e-48de-b0b6-891e0922d371", // wrongly modified for test data
                  },
                ],
                name: "organisationId",
              },
            ],
          },
        ],
        name: "collectionId",
      },
    ],
  },
};

exports.getContributionWithProgramId = {
  request: {
    filters: {
      programId: "",
      objectType: "content",
      status: ["Review", "Draft", "Live"],
      contentType: { "!=": "Asset" },
      mimeType: { "!=": "application/vnd.ekstep.content-collection" },
    },
    not_exists: ["sampleContent"],
    aggregations: [
      {
        l1: "collectionId",
        l2: "status",
        l3: "prevStatus",
      },
    ],
    limit: 0,
  },
};

exports.resultGetContributionWithProgramId = {
  result: {
    aggregations: [
      {
        name: "collectionId",
        values: [
          {
            aggregations: [
              {
                name: "status",
                values: [
                  {
                    count: 5,
                    name: "live",
                    aggregations: [
                      {
                        values: [
                          {
                            count: 1,
                            name: "live",
                          },
                          {
                            count: 1,
                            name: "review",
                          },
                        ],
                        name: "prevStatus",
                      },
                    ],
                  },
                  {
                    count: 3,
                    name: "draft",
                    aggregations: [
                      {
                        values: [
                          {
                            count: 1,
                            name: "live",
                          },
                          {
                            count: 1,
                            name: "review",
                          },
                        ],
                        name: "prevStatus",
                      },
                    ],
                  },
                ],
              },
            ],
            count: 8,
            name: "do_11306389164045926416355",
          },
        ],
      },
    ],
    count: 0,
  },
};

exports.searchSampleContents = {
  request: {
    filters: {
      objectType: "content",
      programId: "",
      mimeType: { "!=": "application/vnd.ekstep.content-collection" },
      contentType: { "!=": "Asset" },
      sampleContent: true,
      status: ["Draft", "Review"],
    },
    fields: [
      "name",
      "identifier",
      "programId",
      "mimeType",
      "status",
      "sampleContent",
      "createdBy",
      "organisationId",
      "collectionId",
      "prevStatus",
      "contentType",
    ],
    limit: 10000,
  },
};

exports.resultSearchSampleContents = {
  responseCode: "OK",
  result: {
    count: 2,
    content: [
      {
        identifier: "do_11306546343774617618150",
        createdBy: "4fe5d899-dc3e-48de-b0b6-891e0922d371",
        prevStatus: "Draft",
        name: "Sample01",
        mimeType: "video/mp4",
        contentType: "LearningActivity",
        sampleContent: true,
        collectionId: "do_1130610285558169601677",
        programId: "",
        objectType: "Content",
        status: "Review",
      },
      {
        identifier: "do_11306596636010905618170",
        createdBy: "4fe5d899-dc3e-48de-b0b6-891e0922d371",
        name: "Untitled",
        mimeType: "application/pdf",
        contentType: "PedagogyFlow",
        sampleContent: true,
        collectionId: "do_1130610285558169601677",
        programId: "",
        objectType: "Content",
        status: "Draft",
      },
    ],
  },
};

exports.getQuestionForSetResult = {
  "sectionData": [
      {
          "section": {
              "parent": "do_113431918093377536172",
              "code": "95238491-9c0d-f398-9e06-004085815e44",
              "allowSkip": "Yes",
              "keywords": [
                  "Section Keyword1",
                  "Section Keyword2"
              ],
              "containsUserData": "No",
              "channel": "01309282781705830427",
              "description": "SST Section A - Description",
              "language": [
                  "English"
              ],
              "mimeType": "application/vnd.sunbird.questionset",
              "showHints": "No",
              "createdOn": "2021-12-16T07:11:22.980+0000",
              "objectType": "QuestionSet",
              "primaryCategory": "Exam Question Set",
              "contentDisposition": "inline",
              "lastUpdatedOn": "2021-12-16T07:11:22.980+0000",
              "contentEncoding": "gzip",
              "showSolutions": "No",
              "allowAnonymousAccess": "Yes",
              "identifier": "do_113431920090972160173",
              "lastStatusChangedOn": "2021-12-16T07:11:22.981+0000",
              "requiresSubmit": "No",
              "visibility": "Parent",
              "showTimer": "No",
              "index": 1,
              "setType": "materialised",
              "languageCode": [
                  "en"
              ],
              "version": 1,
              "versionKey": "1639638682980",
              "showFeedback": "No",
              "license": "CC BY 4.0",
              "depth": 1,
              "compatibilityLevel": 5,
              "name": "Section A",
              "navigationMode": "non-linear",
              "shuffle": true,
              "attributions": [],
              "status": "Draft",
              "children": [
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "45c39b79-d43d-2804-9410-bfa0eb6aba3a",
                      "subject": [
                          "History"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "templateId": "mcq-vertical",
                      "createdOn": "2021-12-16T08:02:37.711+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Multiple Choice Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-16T08:20:15.014+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113431945279152128185",
                      "lastStatusChangedOn": "2021-12-16T08:20:15.014+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "changes in hinduism and woship of new dities"
                      ],
                      "index": 1,
                      "qType": "MCQ",
                      "maxScore": 1,
                      "languageCode": [
                          "en"
                      ],
                      "bloomsLevel": "apply",
                      "version": 1,
                      "versionKey": "1639641758047",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "interactionTypes": [
                          "choice"
                      ],
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "mcq 1",
                      "topic": [
                          "Indian Medieval History"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431945279152128185/mcq-1_1639642814802_do_113431945279152128185_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431945279152128185/mcq-1_1639642814802_do_113431945279152128185_1.ecar",
                              "size": "1529"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431945279152128185/mcq-1_1639642814923_do_113431945279152128185_1_ONLINE.ecar",
                              "size": "1529"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "History"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Indian Medieval History"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "f9e236d5-e340-99d8-a252-325c3a559521",
                      "subject": [
                          "History"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "templateId": "mcq-vertical",
                      "createdOn": "2021-12-16T08:05:15.384+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Multiple Choice Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-16T08:20:32.071+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113431946570817536186",
                      "lastStatusChangedOn": "2021-12-16T08:20:32.071+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "changes in hinduism and woship of new dities"
                      ],
                      "index": 2,
                      "qType": "MCQ",
                      "maxScore": 1,
                      "languageCode": [
                          "en"
                      ],
                      "bloomsLevel": "apply",
                      "version": 1,
                      "versionKey": "1639641915661",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "interactionTypes": [
                          "choice"
                      ],
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "mcq 2",
                      "topic": [
                          "Indian Medieval History"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431946570817536186/mcq-2_1639642831925_do_113431946570817536186_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431946570817536186/mcq-2_1639642831925_do_113431946570817536186_1.ecar",
                              "size": "1492"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431946570817536186/mcq-2_1639642831997_do_113431946570817536186_1_ONLINE.ecar",
                              "size": "1493"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "History"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Indian Medieval History"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "03b0d5aa-7e07-8b52-9029-9063da0abcd2",
                      "subject": [
                          "History"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "templateId": "mcq-vertical",
                      "createdOn": "2021-12-16T08:08:09.900+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Multiple Choice Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-16T08:20:37.434+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113431948000452608188",
                      "lastStatusChangedOn": "2021-12-16T08:20:37.434+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "changes in hinduism and woship of new dities"
                      ],
                      "index": 3,
                      "qType": "MCQ",
                      "maxScore": 1,
                      "languageCode": [
                          "en"
                      ],
                      "bloomsLevel": "apply",
                      "version": 1,
                      "versionKey": "1639642090154",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "interactionTypes": [
                          "choice"
                      ],
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "mcq 3",
                      "topic": [
                          "Indian Medieval History"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431948000452608188/mcq-3_1639642837231_do_113431948000452608188_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431948000452608188/mcq-3_1639642837231_do_113431948000452608188_1.ecar",
                              "size": "1485"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431948000452608188/mcq-3_1639642837391_do_113431948000452608188_1_ONLINE.ecar",
                              "size": "1484"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "History"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Indian Medieval History"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "0d7bf2eb-a4cb-0bf6-922c-0890b98ced38",
                      "subject": [
                          "History"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "createdOn": "2021-12-16T08:16:38.868+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Subjective Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-16T08:20:45.952+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113431952169918464189",
                      "lastStatusChangedOn": "2021-12-16T08:20:45.952+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "changes in hinduism and woship of new dities"
                      ],
                      "index": 4,
                      "qType": "SA",
                      "maxScore": 1,
                      "languageCode": [
                          "en"
                      ],
                      "bloomsLevel": "apply",
                      "version": 1,
                      "versionKey": "1639642599297",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "ftb 1",
                      "topic": [
                          "Indian Medieval History"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431952169918464189/ftb-1_1639642845839_do_113431952169918464189_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431952169918464189/ftb-1_1639642845839_do_113431952169918464189_1.ecar",
                              "size": "1170"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431952169918464189/ftb-1_1639642845909_do_113431952169918464189_1_ONLINE.ecar",
                              "size": "1170"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "History"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Indian Medieval History"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "4ae4b68d-5ad2-d413-a61e-982fd4861468",
                      "subject": [
                          "History"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "createdOn": "2021-12-16T08:19:06.740+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Subjective Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-16T08:20:54.398+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113431953381294080190",
                      "lastStatusChangedOn": "2021-12-16T08:20:54.398+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "changes in hinduism and woship of new dities"
                      ],
                      "index": 5,
                      "qType": "SA",
                      "maxScore": 1,
                      "languageCode": [
                          "en"
                      ],
                      "bloomsLevel": "apply",
                      "version": 1,
                      "versionKey": "1639642747214",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "long 1",
                      "topic": [
                          "Indian Medieval History"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431953381294080190/long-1_1639642854252_do_113431953381294080190_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431953381294080190/long-1_1639642854252_do_113431953381294080190_1.ecar",
                              "size": "1540"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431953381294080190/long-1_1639642854330_do_113431953381294080190_1_ONLINE.ecar",
                              "size": "1541"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "History"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Indian Medieval History"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "c8cfe41b-6055-e9ad-5979-27aca7a30ee9",
                      "subject": [
                          "Mathematics"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "createdOn": "2021-12-20T05:56:32.348+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Subjective Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-20T05:58:54.405+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_1134347144589066241118",
                      "lastStatusChangedOn": "2021-12-20T05:58:54.405+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "add and subtract algebraic expressions"
                      ],
                      "index": 6,
                      "qType": "SA",
                      "maxScore": 10,
                      "languageCode": [
                          "en"
                      ],
                      "version": 1,
                      "versionKey": "1639979792772",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "Sample MTF",
                      "topic": [
                          "Algebraic Expressions"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_1134347144589066241118/sample-mtf_1639979934116_do_1134347144589066241118_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_1134347144589066241118/sample-mtf_1639979934116_do_1134347144589066241118_1.ecar",
                              "size": "1411"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_1134347144589066241118/sample-mtf_1639979934317_do_1134347144589066241118_1_ONLINE.ecar",
                              "size": "1411"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_subjects": [
                          "Mathematics"
                      ],
                      "se_topics": [
                          "Algebraic Expressions"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "2cb90874-8754-468b-f330-625377db9da5",
                      "subject": [
                          "Mathematics"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "templateId": "mcq-vertical",
                      "createdOn": "2021-12-23T14:20:52.362+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Multiple Choice Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-23T15:02:00.247+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113437085715341312124",
                      "lastStatusChangedOn": "2021-12-23T15:02:00.247+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "will be able to solve questions"
                      ],
                      "index": 7,
                      "qType": "MCQ",
                      "maxScore": 10,
                      "languageCode": [
                          "en"
                      ],
                      "version": 1,
                      "versionKey": "1640269252638",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "interactionTypes": [
                          "choice"
                      ],
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "Test MCQ with Image option",
                      "topic": [
                          "Practical Geometry"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113437085715341312124/test-mcq-with-image-option_1640271719772_do_113437085715341312124_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113437085715341312124/test-mcq-with-image-option_1640271719772_do_113437085715341312124_1.ecar",
                              "size": "1672"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113437085715341312124/test-mcq-with-image-option_1640271720089_do_113437085715341312124_1_ONLINE.ecar",
                              "size": "1690"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "Mathematics"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Practical Geometry"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "9fa614a6-a972-98a5-0445-b1d6c9a99a4e",
                      "subject": [
                          "Mathematics"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "templateId": "mcq-vertical",
                      "createdOn": "2021-12-23T15:07:58.933+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Multiple Choice Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-23T15:08:47.057+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113437108870594560125",
                      "lastStatusChangedOn": "2021-12-23T15:08:47.057+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "develop ability to understand differnet methods"
                      ],
                      "index": 8,
                      "qType": "MCQ",
                      "maxScore": 10,
                      "languageCode": [
                          "en"
                      ],
                      "version": 1,
                      "versionKey": "1640272079560",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "interactionTypes": [
                          "choice"
                      ],
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "Test MCQ with Image question",
                      "topic": [
                          "Fractions and Decimals"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113437108870594560125/test-mcq-with-image-question_1640272126765_do_113437108870594560125_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113437108870594560125/test-mcq-with-image-question_1640272126765_do_113437108870594560125_1.ecar",
                              "size": "1504"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113437108870594560125/test-mcq-with-image-question_1640272126917_do_113437108870594560125_1_ONLINE.ecar",
                              "size": "1516"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "Mathematics"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Fractions and Decimals"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "subject": [
                          "History"
                      ],
                      "channel": "01309282781705830427",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431974401540096191/ques-1_1639645410289_do_113431974401540096191_1.ecar",
                      "language": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431974401540096191/ques-1_1639645410289_do_113431974401540096191_1.ecar",
                              "size": "1053"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431974401540096191/ques-1_1639645410387_do_113431974401540096191_1_ONLINE.ecar",
                              "size": "1053"
                          }
                      },
                      "objectType": "Question",
                      "se_mediums": [
                          "English"
                      ],
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Subjective Question",
                      "contentEncoding": "gzip",
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "showSolutions": "No",
                      "identifier": "do_113431974401540096191",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "changes in hinduism and woship of new dities"
                      ],
                      "index": 9,
                      "qType": "SA",
                      "maxScore": 1,
                      "languageCode": [
                          "en"
                      ],
                      "version": 1,
                      "se_subjects": [
                          "History"
                      ],
                      "license": "CC BY 4.0",
                      "name": "ques 1",
                      "topic": [
                          "Indian Medieval History"
                      ],
                      "status": "Live",
                      "code": "985b003b-6f4b-8a3a-7a70-b4d4582a03df",
                      "prevStatus": "Draft",
                      "medium": [
                          "English"
                      ],
                      "createdOn": "2021-12-16T09:01:52.690+0000",
                      "se_boards": [
                          "CBSE"
                      ],
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-16T09:03:30.464+0000",
                      "allowAnonymousAccess": "Yes",
                      "lastStatusChangedOn": "2021-12-16T09:03:30.464+0000",
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "bloomsLevel": "apply",
                      "pkgVersion": 1,
                      "versionKey": "1639645312966",
                      "showFeedback": "No",
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "se_topics": [
                          "Indian Medieval History"
                      ],
                      "compatibilityLevel": 4,
                      "board": "CBSE"
                  }
              ]
          },
          "questions": [
              {
                  "copyright": "2012",
                  "subject": [
                      "History"
                  ],
                  "responseDeclaration": {
                      "response1": {
                          "maxScore": 1,
                          "cardinality": "single",
                          "type": "integer",
                          "correctResponse": {
                              "value": "2",
                              "outcomes": {
                                  "SCORE": 1
                              }
                          }
                      }
                  },
                  "mimeType": "application/vnd.sunbird.question",
                  "body": "<div class='question-body'><div class='mcq-title'><p>1. राजतरंगिनी काव्य &nbsp;की रचना किस भाषा में की गई है?Rajtarangini poetry was composed in which language?</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
                  "editorState": {
                      "options": [
                          {
                              "answer": false,
                              "value": {
                                  "body": "<p>अंग्रेजी &nbsp;English</p>",
                                  "value": 0
                              }
                          },
                          {
                              "answer": false,
                              "value": {
                                  "body": "<p>हिन्दी Hindi</p>",
                                  "value": 1
                              }
                          },
                          {
                              "answer": true,
                              "value": {
                                  "body": "<p>संस्कृत Sanskrit</p>",
                                  "value": 2
                              }
                          },
                          {
                              "answer": false,
                              "value": {
                                  "body": "<p>उर्दू Urdu</p>",
                                  "value": 3
                              }
                          }
                      ],
                      "question": "<p>1. राजतरंगिनी काव्य &nbsp;की रचना किस भाषा में की गई है?Rajtarangini poetry was composed in which language?</p>"
                  },
                  "templateId": "mcq-vertical",
                  "gradeLevel": [
                      "Class 7"
                  ],
                  "primaryCategory": "Multiple Choice Question",
                  "identifier": "do_113431945279152128185",
                  "author": "N11",
                  "solutions": [],
                  "learningOutcome": [
                      "changes in hinduism and woship of new dities"
                  ],
                  "qType": "MCQ",
                  "maxScore": 1,
                  "languageCode": [
                      "en"
                  ],
                  "license": "CC BY 4.0",
                  "interactionTypes": [
                      "choice"
                  ],
                  "name": "mcq 1",
                  "topic": [
                      "Indian Medieval History"
                  ],
                  "medium": [
                      "English"
                  ],
                  "media": [],
                  "interactions": {
                      "response1": {
                          "type": "choice",
                          "options": [
                              {
                                  "label": "<p>अंग्रेजी &nbsp;English</p>",
                                  "value": 0
                              },
                              {
                                  "label": "<p>हिन्दी Hindi</p>",
                                  "value": 1
                              },
                              {
                                  "label": "<p>संस्कृत Sanskrit</p>",
                                  "value": 2
                              },
                              {
                                  "label": "<p>उर्दू Urdu</p>",
                                  "value": 3
                              }
                          ]
                      }
                  },
                  "bloomsLevel": "apply",
                  "answer": "2",
                  "board": "CBSE"
              },
              {
                  "copyright": "2012",
                  "subject": [
                      "History"
                  ],
                  "responseDeclaration": {
                      "response1": {
                          "maxScore": 1,
                          "cardinality": "single",
                          "type": "integer",
                          "correctResponse": {
                              "value": "1",
                              "outcomes": {
                                  "SCORE": 1
                              }
                          }
                      }
                  },
                  "mimeType": "application/vnd.sunbird.question",
                  "body": "<div class='question-body'><div class='mcq-title'><p>2. दिल्ली सल्तनत की प्रशासनिक भाषा क्या थी ? What was the Administrative language of the Delhi Sultanate ?</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
                  "editorState": {
                      "options": [
                          {
                              "answer": false,
                              "value": {
                                  "body": "<p>अरबी &nbsp;Arabi</p>",
                                  "value": 0
                              }
                          },
                          {
                              "answer": true,
                              "value": {
                                  "body": "<p>अरबी &nbsp;Arabi</p>",
                                  "value": 1
                              }
                          },
                          {
                              "answer": false,
                              "value": {
                                  "body": "<p>उर्दू &nbsp;Urdu</p>",
                                  "value": 2
                              }
                          },
                          {
                              "answer": false,
                              "value": {
                                  "body": "<p>हिंदी &nbsp; Hindi</p>",
                                  "value": 3
                              }
                          }
                      ],
                      "question": "<p>2. दिल्ली सल्तनत की प्रशासनिक भाषा क्या थी ? What was the Administrative language of the Delhi Sultanate ?</p>"
                  },
                  "templateId": "mcq-vertical",
                  "gradeLevel": [
                      "Class 7"
                  ],
                  "primaryCategory": "Multiple Choice Question",
                  "identifier": "do_113431946570817536186",
                  "author": "N11",
                  "solutions": [],
                  "learningOutcome": [
                      "changes in hinduism and woship of new dities"
                  ],
                  "qType": "MCQ",
                  "maxScore": 1,
                  "languageCode": [
                      "en"
                  ],
                  "license": "CC BY 4.0",
                  "interactionTypes": [
                      "choice"
                  ],
                  "name": "mcq 2",
                  "topic": [
                      "Indian Medieval History"
                  ],
                  "medium": [
                      "English"
                  ],
                  "media": [],
                  "interactions": {
                      "response1": {
                          "type": "choice",
                          "options": [
                              {
                                  "label": "<p>अरबी &nbsp;Arabi</p>",
                                  "value": 0
                              },
                              {
                                  "label": "<p>अरबी &nbsp;Arabi</p>",
                                  "value": 1
                              },
                              {
                                  "label": "<p>उर्दू &nbsp;Urdu</p>",
                                  "value": 2
                              },
                              {
                                  "label": "<p>हिंदी &nbsp; Hindi</p>",
                                  "value": 3
                              }
                          ]
                      }
                  },
                  "bloomsLevel": "apply",
                  "answer": "1",
                  "board": "CBSE"
              },
              {
                  "copyright": "2012",
                  "subject": [
                      "History"
                  ],
                  "responseDeclaration": {
                      "response1": {
                          "maxScore": 1,
                          "cardinality": "single",
                          "type": "integer",
                          "correctResponse": {
                              "value": "2",
                              "outcomes": {
                                  "SCORE": 1
                              }
                          }
                      }
                  },
                  "mimeType": "application/vnd.sunbird.question",
                  "body": "<div class='question-body'><div class='mcq-title'><p>3. कुतुबुद्दीन ऐबक ने कुतुब मीनार का निर्माण किस वर्ष में करवाया?In which year did Qutbuddin Aibak get the Qutub Minar built?</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
                  "editorState": {
                      "options": [
                          {
                              "answer": false,
                              "value": {
                                  "body": "<p>1179</p>",
                                  "value": 0
                              }
                          },
                          {
                              "answer": false,
                              "value": {
                                  "body": "<p>1299</p>",
                                  "value": 1
                              }
                          },
                          {
                              "answer": true,
                              "value": {
                                  "body": "<p>1199</p>",
                                  "value": 2
                              }
                          },
                          {
                              "answer": false,
                              "value": {
                                  "body": "<p>1392</p>",
                                  "value": 3
                              }
                          }
                      ],
                      "question": "<p>3. कुतुबुद्दीन ऐबक ने कुतुब मीनार का निर्माण किस वर्ष में करवाया?In which year did Qutbuddin Aibak get the Qutub Minar built?</p>"
                  },
                  "templateId": "mcq-vertical",
                  "gradeLevel": [
                      "Class 7"
                  ],
                  "primaryCategory": "Multiple Choice Question",
                  "identifier": "do_113431948000452608188",
                  "author": "N11",
                  "solutions": [],
                  "learningOutcome": [
                      "changes in hinduism and woship of new dities"
                  ],
                  "qType": "MCQ",
                  "maxScore": 1,
                  "languageCode": [
                      "en"
                  ],
                  "license": "CC BY 4.0",
                  "interactionTypes": [
                      "choice"
                  ],
                  "name": "mcq 3",
                  "topic": [
                      "Indian Medieval History"
                  ],
                  "medium": [
                      "English"
                  ],
                  "media": [],
                  "interactions": {
                      "response1": {
                          "type": "choice",
                          "options": [
                              {
                                  "label": "<p>1179</p>",
                                  "value": 0
                              },
                              {
                                  "label": "<p>1299</p>",
                                  "value": 1
                              },
                              {
                                  "label": "<p>1199</p>",
                                  "value": 2
                              },
                              {
                                  "label": "<p>1392</p>",
                                  "value": 3
                              }
                          ]
                      }
                  },
                  "bloomsLevel": "apply",
                  "answer": "2",
                  "board": "CBSE"
              },
              {
                  "copyright": "2012",
                  "subject": [
                      "History"
                  ],
                  "mimeType": "application/vnd.sunbird.question",
                  "body": "<p>4. किसानों की बस्तियां__________कहलाती थी &nbsp;? Settlements of &nbsp;farmer was &nbsp;known as_______?</p>",
                  "editorState": {
                      "answer": "<p>ur</p>",
                      "question": "<p>4. किसानों की बस्तियां__________कहलाती थी &nbsp;? Settlements of &nbsp;farmer was &nbsp;known as_______?</p>"
                  },
                  "gradeLevel": [
                      "Class 7"
                  ],
                  "primaryCategory": "Subjective Question",
                  "identifier": "do_113431952169918464189",
                  "author": "N11",
                  "solutions": [],
                  "learningOutcome": [
                      "changes in hinduism and woship of new dities"
                  ],
                  "qType": "SA",
                  "maxScore": 1,
                  "languageCode": [
                      "en"
                  ],
                  "license": "CC BY 4.0",
                  "name": "ftb 1",
                  "topic": [
                      "Indian Medieval History"
                  ],
                  "medium": [
                      "English"
                  ],
                  "media": [],
                  "bloomsLevel": "apply",
                  "answer": "<p>ur</p>",
                  "board": "CBSE"
              },
              {
                  "copyright": "2012",
                  "subject": [
                      "History"
                  ],
                  "mimeType": "application/vnd.sunbird.question",
                  "body": "<p>6. संत कबीर दास के धार्मिक विचारों का विस्तार से वर्णन करें? <i>Describe in detail the religious thoughts of Sant Kabir Dass?</i></p><p><strong><u>कुलियों को जब भारी वज़न उठाना पड़ता है तो अपने सिर पर कपड़े का एक गोल टुकड़ा रखना पड़ता है ।</u></strong></p><p>अगर आपको सिर पर बैग ढोना पड़े तो क्या आप भी ऐसा ही करेंगे? यदि हाँ तो क्यों?</p><p><strong>Porters have to place a round piece of cloth on their heads when they have to carry heavy loads. If you have to carry a bag on your head, will you do the same? If yes then why</strong>?</p>",
                  "editorState": {
                      "answer": "<p>anything</p>",
                      "question": "<p>6. संत कबीर दास के धार्मिक विचारों का विस्तार से वर्णन करें? <i>Describe in detail the religious thoughts of Sant Kabir Dass?</i></p><p><strong><u>कुलियों को जब भारी वज़न उठाना पड़ता है तो अपने सिर पर कपड़े का एक गोल टुकड़ा रखना पड़ता है ।</u></strong></p><p>अगर आपको सिर पर बैग ढोना पड़े तो क्या आप भी ऐसा ही करेंगे? यदि हाँ तो क्यों?</p><p><strong>Porters have to place a round piece of cloth on their heads when they have to carry heavy loads. If you have to carry a bag on your head, will you do the same? If yes then why</strong>?</p>"
                  },
                  "gradeLevel": [
                      "Class 7"
                  ],
                  "primaryCategory": "Subjective Question",
                  "identifier": "do_113431953381294080190",
                  "author": "N11",
                  "solutions": [],
                  "learningOutcome": [
                      "changes in hinduism and woship of new dities"
                  ],
                  "qType": "SA",
                  "maxScore": 1,
                  "languageCode": [
                      "en"
                  ],
                  "license": "CC BY 4.0",
                  "name": "long 1",
                  "topic": [
                      "Indian Medieval History"
                  ],
                  "medium": [
                      "English"
                  ],
                  "media": [],
                  "bloomsLevel": "apply",
                  "answer": "<p>anything</p>",
                  "board": "CBSE"
              },
              {
                  "copyright": "2012",
                  "subject": [
                      "Mathematics"
                  ],
                  "mimeType": "application/vnd.sunbird.question",
                  "body": "<p>निम्नलिखित कृतियों और उनके लेखकों में से सही का चयन कीजिए : Choose the correct from the following works and their authors :</p><figure class=\"table\"><table><tbody><tr><td><strong>Column 1</strong></td><td><strong>Column 2</strong></td></tr><tr><td>महाभारत Mahabharta</td><td>रविदास Ravidass</td></tr><tr><td>गीतावली Geetavali</td><td>सूरदास Surdass</td></tr><tr><td>गीता Geeta</td><td>कबीर Kabir</td></tr></tbody></table></figure>",
                  "editorState": {
                      "answer": "<p>निम्नलिखित कृतियों और उनके लेखकों में से सही का चयन कीजिए : Choose the correct from the following works and their authors :</p><figure class=\"table\"><table><tbody><tr><td><strong>Column 1</strong></td><td><strong>Column 2</strong></td></tr><tr><td>महाभारत Mahabharta</td><td>सूरदास Surdass</td></tr><tr><td>गीतावली Geetavali</td><td>कबीर Kabir</td></tr><tr><td>गीता Geeta</td><td>रविदास Ravidass</td></tr></tbody></table></figure>",
                      "question": "<p>निम्नलिखित कृतियों और उनके लेखकों में से सही का चयन कीजिए : Choose the correct from the following works and their authors :</p><figure class=\"table\"><table><tbody><tr><td><strong>Column 1</strong></td><td><strong>Column 2</strong></td></tr><tr><td>महाभारत Mahabharta</td><td>रविदास Ravidass</td></tr><tr><td>गीतावली Geetavali</td><td>सूरदास Surdass</td></tr><tr><td>गीता Geeta</td><td>कबीर Kabir</td></tr></tbody></table></figure>"
                  },
                  "gradeLevel": [
                      "Class 7"
                  ],
                  "primaryCategory": "Subjective Question",
                  "identifier": "do_1134347144589066241118",
                  "author": "N11",
                  "solutions": [],
                  "learningOutcome": [
                      "add and subtract algebraic expressions"
                  ],
                  "qType": "SA",
                  "maxScore": 10,
                  "languageCode": [
                      "en"
                  ],
                  "license": "CC BY 4.0",
                  "name": "Sample MTF",
                  "topic": [
                      "Algebraic Expressions"
                  ],
                  "medium": [
                      "English"
                  ],
                  "media": [],
                  "answer": "<p>निम्नलिखित कृतियों और उनके लेखकों में से सही का चयन कीजिए : Choose the correct from the following works and their authors :</p><figure class=\"table\"><table><tbody><tr><td><strong>Column 1</strong></td><td><strong>Column 2</strong></td></tr><tr><td>महाभारत Mahabharta</td><td>सूरदास Surdass</td></tr><tr><td>गीतावली Geetavali</td><td>कबीर Kabir</td></tr><tr><td>गीता Geeta</td><td>रविदास Ravidass</td></tr></tbody></table></figure>",
                  "board": "CBSE"
              },
              {
                  "copyright": "2012",
                  "subject": [
                      "Mathematics"
                  ],
                  "responseDeclaration": {
                      "response1": {
                          "maxScore": 1,
                          "cardinality": "single",
                          "type": "integer",
                          "correctResponse": {
                              "value": "1",
                              "outcomes": {
                                  "SCORE": 1
                              }
                          }
                      }
                  },
                  "mimeType": "application/vnd.sunbird.question",
                  "body": "<div class='question-body'><div class='mcq-title'><p>Test MCQ with image options</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
                  "editorState": {
                      "options": [
                          {
                              "answer": false,
                              "value": {
                                  "body": "<figure class=\"image resize-25\"><img src=\"https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_1133025789046292481218/artifact/do_1133025789046292481218_1623849964212_offline2.png\" alt=\"do_1133025789046292481218\" data-asset-variable=\"do_1133025789046292481218\"></figure>",
                                  "value": 0
                              }
                          },
                          {
                              "answer": true,
                              "value": {
                                  "body": "<figure class=\"image resize-25\"><img src=\"https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11322957125642649611145/artifact/0_jmrpnxe-djmth37l_.jpg\" alt=\"do_11322957125642649611145\" data-asset-variable=\"do_11322957125642649611145\"></figure>",
                                  "value": 1
                              }
                          },
                          {
                              "answer": false,
                              "value": {
                                  "body": "<figure class=\"image resize-25\"><img src=\"https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11323158598092390411200/artifact/1mb_image.jpg\" alt=\"do_11323158598092390411200\" data-asset-variable=\"do_11323158598092390411200\"></figure>",
                                  "value": 2
                              }
                          },
                          {
                              "answer": false,
                              "value": {
                                  "body": "<figure class=\"image resize-25\"><img src=\"https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11310507827786547212024/artifact/800px-pizigani_1367_chart_10mb.jpg\" alt=\"do_11310507827786547212024\" data-asset-variable=\"do_11310507827786547212024\"></figure>",
                                  "value": 3
                              }
                          }
                      ],
                      "question": "<p>Test MCQ with image options</p>"
                  },
                  "templateId": "mcq-vertical",
                  "gradeLevel": [
                      "Class 7"
                  ],
                  "primaryCategory": "Multiple Choice Question",
                  "identifier": "do_113437085715341312124",
                  "author": "N11",
                  "solutions": [],
                  "learningOutcome": [
                      "will be able to solve questions"
                  ],
                  "qType": "MCQ",
                  "maxScore": 10,
                  "languageCode": [
                      "en"
                  ],
                  "license": "CC BY 4.0",
                  "interactionTypes": [
                      "choice"
                  ],
                  "name": "Test MCQ with Image option",
                  "topic": [
                      "Practical Geometry"
                  ],
                  "medium": [
                      "English"
                  ],
                  "media": [
                      {
                          "id": "do_11322957125642649611145",
                          "type": "image",
                          "src": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11322957125642649611145/artifact/0_jmrpnxe-djmth37l_.jpg",
                          "baseUrl": "http://localhost:3000"
                      },
                      {
                          "id": "do_1133025789046292481218",
                          "type": "image",
                          "src": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_1133025789046292481218/artifact/do_1133025789046292481218_1623849964212_offline2.png",
                          "baseUrl": "http://localhost:3000"
                      },
                      {
                          "id": "do_11323158598092390411200",
                          "type": "image",
                          "src": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11323158598092390411200/artifact/1mb_image.jpg",
                          "baseUrl": "http://localhost:3000"
                      },
                      {
                          "id": "do_11310507827786547212024",
                          "type": "image",
                          "src": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11310507827786547212024/artifact/800px-pizigani_1367_chart_10mb.jpg",
                          "baseUrl": "http://localhost:3000"
                      }
                  ],
                  "interactions": {
                      "response1": {
                          "type": "choice",
                          "options": [
                              {
                                  "label": "<figure class=\"image resize-25\"><img src=\"https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_1133025789046292481218/artifact/do_1133025789046292481218_1623849964212_offline2.png\" alt=\"do_1133025789046292481218\" data-asset-variable=\"do_1133025789046292481218\"></figure>",
                                  "value": 0
                              },
                              {
                                  "label": "<figure class=\"image resize-25\"><img src=\"https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11322957125642649611145/artifact/0_jmrpnxe-djmth37l_.jpg\" alt=\"do_11322957125642649611145\" data-asset-variable=\"do_11322957125642649611145\"></figure>",
                                  "value": 1
                              },
                              {
                                  "label": "<figure class=\"image resize-25\"><img src=\"https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11323158598092390411200/artifact/1mb_image.jpg\" alt=\"do_11323158598092390411200\" data-asset-variable=\"do_11323158598092390411200\"></figure>",
                                  "value": 2
                              },
                              {
                                  "label": "<figure class=\"image resize-25\"><img src=\"https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11310507827786547212024/artifact/800px-pizigani_1367_chart_10mb.jpg\" alt=\"do_11310507827786547212024\" data-asset-variable=\"do_11310507827786547212024\"></figure>",
                                  "value": 3
                              }
                          ]
                      }
                  },
                  "answer": "1",
                  "board": "CBSE"
              },
              {
                  "copyright": "2012",
                  "subject": [
                      "Mathematics"
                  ],
                  "responseDeclaration": {
                      "response1": {
                          "maxScore": 1,
                          "cardinality": "single",
                          "type": "integer",
                          "correctResponse": {
                              "value": "2",
                              "outcomes": {
                                  "SCORE": 1
                              }
                          }
                      }
                  },
                  "mimeType": "application/vnd.sunbird.question",
                  "body": "<div class='question-body'><div class='mcq-title'><figure class=\"image resize-25\"><img src=\"https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_1133025789046292481218/artifact/do_1133025789046292481218_1623849964212_offline2.png\" alt=\"do_1133025789046292481218\" data-asset-variable=\"do_1133025789046292481218\"></figure></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
                  "editorState": {
                      "options": [
                          {
                              "answer": false,
                              "value": {
                                  "body": "<p>test option A</p>",
                                  "value": 0
                              }
                          },
                          {
                              "answer": false,
                              "value": {
                                  "body": "<p>test option B</p>",
                                  "value": 1
                              }
                          },
                          {
                              "answer": true,
                              "value": {
                                  "body": "<p>test option C</p>",
                                  "value": 2
                              }
                          },
                          {
                              "answer": false,
                              "value": {
                                  "body": "<p>test option D</p>",
                                  "value": 3
                              }
                          }
                      ],
                      "question": "<figure class=\"image resize-25\"><img src=\"https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_1133025789046292481218/artifact/do_1133025789046292481218_1623849964212_offline2.png\" alt=\"do_1133025789046292481218\" data-asset-variable=\"do_1133025789046292481218\"></figure>"
                  },
                  "templateId": "mcq-vertical",
                  "gradeLevel": [
                      "Class 7"
                  ],
                  "primaryCategory": "Multiple Choice Question",
                  "identifier": "do_113437108870594560125",
                  "author": "N11",
                  "solutions": [],
                  "learningOutcome": [
                      "develop ability to understand differnet methods"
                  ],
                  "qType": "MCQ",
                  "maxScore": 10,
                  "languageCode": [
                      "en"
                  ],
                  "license": "CC BY 4.0",
                  "interactionTypes": [
                      "choice"
                  ],
                  "name": "Test MCQ with Image question",
                  "topic": [
                      "Fractions and Decimals"
                  ],
                  "medium": [
                      "English"
                  ],
                  "media": [
                      {
                          "id": "do_1133025789046292481218",
                          "type": "image",
                          "src": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_1133025789046292481218/artifact/do_1133025789046292481218_1623849964212_offline2.png",
                          "baseUrl": "http://localhost:3000"
                      }
                  ],
                  "interactions": {
                      "response1": {
                          "type": "choice",
                          "options": [
                              {
                                  "label": "<p>test option A</p>",
                                  "value": 0
                              },
                              {
                                  "label": "<p>test option B</p>",
                                  "value": 1
                              },
                              {
                                  "label": "<p>test option C</p>",
                                  "value": 2
                              },
                              {
                                  "label": "<p>test option D</p>",
                                  "value": 3
                              }
                          ]
                      }
                  },
                  "answer": "2",
                  "board": "CBSE"
              }
          ]
      }
  ],
  "paperData": {
      "copyright": "NIT123",
      "keywords": [
          "SST",
          "Keyword2"
      ],
      "subject": [
          "Political Science/Civics"
      ],
      "channel": "01309282781705830427",
      "reusedContributions": [
          "do_113431974401540096191"
      ],
      "language": [
          "English"
      ],
      "mimeType": "application/vnd.sunbird.questionset",
      "showHints": "No",
      "objectType": "QuestionSet",
      "gradeLevel": [
          "Class 7"
      ],
      "appIcon": "",
      "primaryCategory": "Exam Question Set",
      "children": [
          {
              "parent": "do_113431918093377536172",
              "code": "95238491-9c0d-f398-9e06-004085815e44",
              "allowSkip": "Yes",
              "keywords": [
                  "Section Keyword1",
                  "Section Keyword2"
              ],
              "containsUserData": "No",
              "channel": "01309282781705830427",
              "description": "SST Section A - Description",
              "language": [
                  "English"
              ],
              "mimeType": "application/vnd.sunbird.questionset",
              "showHints": "No",
              "createdOn": "2021-12-16T07:11:22.980+0000",
              "objectType": "QuestionSet",
              "primaryCategory": "Exam Question Set",
              "contentDisposition": "inline",
              "lastUpdatedOn": "2021-12-16T07:11:22.980+0000",
              "contentEncoding": "gzip",
              "showSolutions": "No",
              "allowAnonymousAccess": "Yes",
              "identifier": "do_113431920090972160173",
              "lastStatusChangedOn": "2021-12-16T07:11:22.981+0000",
              "requiresSubmit": "No",
              "visibility": "Parent",
              "showTimer": "No",
              "index": 1,
              "setType": "materialised",
              "languageCode": [
                  "en"
              ],
              "version": 1,
              "versionKey": "1639638682980",
              "showFeedback": "No",
              "license": "CC BY 4.0",
              "depth": 1,
              "compatibilityLevel": 5,
              "name": "Section A",
              "navigationMode": "non-linear",
              "shuffle": true,
              "attributions": [],
              "status": "Draft",
              "children": [
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "45c39b79-d43d-2804-9410-bfa0eb6aba3a",
                      "subject": [
                          "History"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "templateId": "mcq-vertical",
                      "createdOn": "2021-12-16T08:02:37.711+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Multiple Choice Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-16T08:20:15.014+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113431945279152128185",
                      "lastStatusChangedOn": "2021-12-16T08:20:15.014+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "changes in hinduism and woship of new dities"
                      ],
                      "index": 1,
                      "qType": "MCQ",
                      "maxScore": 1,
                      "languageCode": [
                          "en"
                      ],
                      "bloomsLevel": "apply",
                      "version": 1,
                      "versionKey": "1639641758047",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "interactionTypes": [
                          "choice"
                      ],
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "mcq 1",
                      "topic": [
                          "Indian Medieval History"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431945279152128185/mcq-1_1639642814802_do_113431945279152128185_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431945279152128185/mcq-1_1639642814802_do_113431945279152128185_1.ecar",
                              "size": "1529"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431945279152128185/mcq-1_1639642814923_do_113431945279152128185_1_ONLINE.ecar",
                              "size": "1529"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "History"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Indian Medieval History"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "f9e236d5-e340-99d8-a252-325c3a559521",
                      "subject": [
                          "History"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "templateId": "mcq-vertical",
                      "createdOn": "2021-12-16T08:05:15.384+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Multiple Choice Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-16T08:20:32.071+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113431946570817536186",
                      "lastStatusChangedOn": "2021-12-16T08:20:32.071+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "changes in hinduism and woship of new dities"
                      ],
                      "index": 2,
                      "qType": "MCQ",
                      "maxScore": 1,
                      "languageCode": [
                          "en"
                      ],
                      "bloomsLevel": "apply",
                      "version": 1,
                      "versionKey": "1639641915661",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "interactionTypes": [
                          "choice"
                      ],
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "mcq 2",
                      "topic": [
                          "Indian Medieval History"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431946570817536186/mcq-2_1639642831925_do_113431946570817536186_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431946570817536186/mcq-2_1639642831925_do_113431946570817536186_1.ecar",
                              "size": "1492"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431946570817536186/mcq-2_1639642831997_do_113431946570817536186_1_ONLINE.ecar",
                              "size": "1493"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "History"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Indian Medieval History"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "03b0d5aa-7e07-8b52-9029-9063da0abcd2",
                      "subject": [
                          "History"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "templateId": "mcq-vertical",
                      "createdOn": "2021-12-16T08:08:09.900+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Multiple Choice Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-16T08:20:37.434+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113431948000452608188",
                      "lastStatusChangedOn": "2021-12-16T08:20:37.434+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "changes in hinduism and woship of new dities"
                      ],
                      "index": 3,
                      "qType": "MCQ",
                      "maxScore": 1,
                      "languageCode": [
                          "en"
                      ],
                      "bloomsLevel": "apply",
                      "version": 1,
                      "versionKey": "1639642090154",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "interactionTypes": [
                          "choice"
                      ],
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "mcq 3",
                      "topic": [
                          "Indian Medieval History"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431948000452608188/mcq-3_1639642837231_do_113431948000452608188_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431948000452608188/mcq-3_1639642837231_do_113431948000452608188_1.ecar",
                              "size": "1485"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431948000452608188/mcq-3_1639642837391_do_113431948000452608188_1_ONLINE.ecar",
                              "size": "1484"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "History"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Indian Medieval History"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "0d7bf2eb-a4cb-0bf6-922c-0890b98ced38",
                      "subject": [
                          "History"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "createdOn": "2021-12-16T08:16:38.868+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Subjective Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-16T08:20:45.952+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113431952169918464189",
                      "lastStatusChangedOn": "2021-12-16T08:20:45.952+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "changes in hinduism and woship of new dities"
                      ],
                      "index": 4,
                      "qType": "SA",
                      "maxScore": 1,
                      "languageCode": [
                          "en"
                      ],
                      "bloomsLevel": "apply",
                      "version": 1,
                      "versionKey": "1639642599297",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "ftb 1",
                      "topic": [
                          "Indian Medieval History"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431952169918464189/ftb-1_1639642845839_do_113431952169918464189_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431952169918464189/ftb-1_1639642845839_do_113431952169918464189_1.ecar",
                              "size": "1170"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431952169918464189/ftb-1_1639642845909_do_113431952169918464189_1_ONLINE.ecar",
                              "size": "1170"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "History"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Indian Medieval History"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "4ae4b68d-5ad2-d413-a61e-982fd4861468",
                      "subject": [
                          "History"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "createdOn": "2021-12-16T08:19:06.740+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Subjective Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-16T08:20:54.398+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113431953381294080190",
                      "lastStatusChangedOn": "2021-12-16T08:20:54.398+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "changes in hinduism and woship of new dities"
                      ],
                      "index": 5,
                      "qType": "SA",
                      "maxScore": 1,
                      "languageCode": [
                          "en"
                      ],
                      "bloomsLevel": "apply",
                      "version": 1,
                      "versionKey": "1639642747214",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "long 1",
                      "topic": [
                          "Indian Medieval History"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431953381294080190/long-1_1639642854252_do_113431953381294080190_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431953381294080190/long-1_1639642854252_do_113431953381294080190_1.ecar",
                              "size": "1540"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431953381294080190/long-1_1639642854330_do_113431953381294080190_1_ONLINE.ecar",
                              "size": "1541"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "History"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Indian Medieval History"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "c8cfe41b-6055-e9ad-5979-27aca7a30ee9",
                      "subject": [
                          "Mathematics"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "createdOn": "2021-12-20T05:56:32.348+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Subjective Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-20T05:58:54.405+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_1134347144589066241118",
                      "lastStatusChangedOn": "2021-12-20T05:58:54.405+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "add and subtract algebraic expressions"
                      ],
                      "index": 6,
                      "qType": "SA",
                      "maxScore": 10,
                      "languageCode": [
                          "en"
                      ],
                      "version": 1,
                      "versionKey": "1639979792772",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "Sample MTF",
                      "topic": [
                          "Algebraic Expressions"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_1134347144589066241118/sample-mtf_1639979934116_do_1134347144589066241118_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_1134347144589066241118/sample-mtf_1639979934116_do_1134347144589066241118_1.ecar",
                              "size": "1411"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_1134347144589066241118/sample-mtf_1639979934317_do_1134347144589066241118_1_ONLINE.ecar",
                              "size": "1411"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_subjects": [
                          "Mathematics"
                      ],
                      "se_topics": [
                          "Algebraic Expressions"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "2cb90874-8754-468b-f330-625377db9da5",
                      "subject": [
                          "Mathematics"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "templateId": "mcq-vertical",
                      "createdOn": "2021-12-23T14:20:52.362+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Multiple Choice Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-23T15:02:00.247+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113437085715341312124",
                      "lastStatusChangedOn": "2021-12-23T15:02:00.247+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "will be able to solve questions"
                      ],
                      "index": 7,
                      "qType": "MCQ",
                      "maxScore": 10,
                      "languageCode": [
                          "en"
                      ],
                      "version": 1,
                      "versionKey": "1640269252638",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "interactionTypes": [
                          "choice"
                      ],
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "Test MCQ with Image option",
                      "topic": [
                          "Practical Geometry"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113437085715341312124/test-mcq-with-image-option_1640271719772_do_113437085715341312124_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113437085715341312124/test-mcq-with-image-option_1640271719772_do_113437085715341312124_1.ecar",
                              "size": "1672"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113437085715341312124/test-mcq-with-image-option_1640271720089_do_113437085715341312124_1_ONLINE.ecar",
                              "size": "1690"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "Mathematics"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Practical Geometry"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "code": "9fa614a6-a972-98a5-0445-b1d6c9a99a4e",
                      "subject": [
                          "Mathematics"
                      ],
                      "prevStatus": "Draft",
                      "channel": "01309282781705830427",
                      "language": [
                          "English"
                      ],
                      "medium": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "templateId": "mcq-vertical",
                      "createdOn": "2021-12-23T15:07:58.933+0000",
                      "objectType": "Question",
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Multiple Choice Question",
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-23T15:08:47.057+0000",
                      "contentEncoding": "gzip",
                      "showSolutions": "No",
                      "allowAnonymousAccess": "Yes",
                      "identifier": "do_113437108870594560125",
                      "lastStatusChangedOn": "2021-12-23T15:08:47.057+0000",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "develop ability to understand differnet methods"
                      ],
                      "index": 8,
                      "qType": "MCQ",
                      "maxScore": 10,
                      "languageCode": [
                          "en"
                      ],
                      "version": 1,
                      "versionKey": "1640272079560",
                      "showFeedback": "No",
                      "license": "CC BY 4.0",
                      "interactionTypes": [
                          "choice"
                      ],
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "compatibilityLevel": 4,
                      "name": "Test MCQ with Image question",
                      "topic": [
                          "Fractions and Decimals"
                      ],
                      "board": "CBSE",
                      "status": "Live",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113437108870594560125/test-mcq-with-image-question_1640272126765_do_113437108870594560125_1.ecar",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113437108870594560125/test-mcq-with-image-question_1640272126765_do_113437108870594560125_1.ecar",
                              "size": "1504"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113437108870594560125/test-mcq-with-image-question_1640272126917_do_113437108870594560125_1_ONLINE.ecar",
                              "size": "1516"
                          }
                      },
                      "se_mediums": [
                          "English"
                      ],
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "se_subjects": [
                          "Mathematics"
                      ],
                      "se_boards": [
                          "CBSE"
                      ],
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "pkgVersion": 1,
                      "se_topics": [
                          "Fractions and Decimals"
                      ]
                  },
                  {
                      "parent": "do_113431920090972160173",
                      "copyright": "2012",
                      "subject": [
                          "History"
                      ],
                      "channel": "01309282781705830427",
                      "downloadUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431974401540096191/ques-1_1639645410289_do_113431974401540096191_1.ecar",
                      "language": [
                          "English"
                      ],
                      "mimeType": "application/vnd.sunbird.question",
                      "variants": {
                          "full": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431974401540096191/ques-1_1639645410289_do_113431974401540096191_1.ecar",
                              "size": "1053"
                          },
                          "online": {
                              "ecarUrl": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/question/do_113431974401540096191/ques-1_1639645410387_do_113431974401540096191_1_ONLINE.ecar",
                              "size": "1053"
                          }
                      },
                      "objectType": "Question",
                      "se_mediums": [
                          "English"
                      ],
                      "gradeLevel": [
                          "Class 7"
                      ],
                      "primaryCategory": "Subjective Question",
                      "contentEncoding": "gzip",
                      "se_gradeLevels": [
                          "Class 7"
                      ],
                      "showSolutions": "No",
                      "identifier": "do_113431974401540096191",
                      "audience": [
                          "Student"
                      ],
                      "visibility": "Default",
                      "showTimer": "No",
                      "author": "N11",
                      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
                      "learningOutcome": [
                          "changes in hinduism and woship of new dities"
                      ],
                      "index": 9,
                      "qType": "SA",
                      "maxScore": 1,
                      "languageCode": [
                          "en"
                      ],
                      "version": 1,
                      "se_subjects": [
                          "History"
                      ],
                      "license": "CC BY 4.0",
                      "name": "ques 1",
                      "topic": [
                          "Indian Medieval History"
                      ],
                      "status": "Live",
                      "code": "985b003b-6f4b-8a3a-7a70-b4d4582a03df",
                      "prevStatus": "Draft",
                      "medium": [
                          "English"
                      ],
                      "createdOn": "2021-12-16T09:01:52.690+0000",
                      "se_boards": [
                          "CBSE"
                      ],
                      "contentDisposition": "inline",
                      "lastUpdatedOn": "2021-12-16T09:03:30.464+0000",
                      "allowAnonymousAccess": "Yes",
                      "lastStatusChangedOn": "2021-12-16T09:03:30.464+0000",
                      "se_FWIds": [
                          "ekstep_ncert_k-12"
                      ],
                      "bloomsLevel": "apply",
                      "pkgVersion": 1,
                      "versionKey": "1639645312966",
                      "showFeedback": "No",
                      "framework": "ekstep_ncert_k-12",
                      "depth": 2,
                      "createdBy": "ae94b68c-a535-4dce-8e7a-fb9662b0ad68",
                      "se_topics": [
                          "Indian Medieval History"
                      ],
                      "compatibilityLevel": 4,
                      "board": "CBSE"
                  }
              ]
          }
      ],
      "contentEncoding": "gzip",
      "showSolutions": "No",
      "identifier": "do_113431918093377536172",
      "audience": [
          "Student"
      ],
      "visibility": "Default",
      "showTimer": "No",
      "author": "N11",
      "consumerId": "fa13b438-8a3d-41b1-8278-33b0c50210e4",
      "childNodes": [
          "do_113431920090972160173",
          "do_113431945279152128185",
          "do_113431946570817536186",
          "do_113431948000452608188",
          "do_113431952169918464189",
          "do_113431953381294080190",
          "do_1134347144589066241118",
          "do_113437085715341312124",
          "do_113437108870594560125",
          "do_113431974401540096191"
      ],
      "maxScore": 0,
      "lastPublishedBy": "5a587cc1-e018-4859-a0a8-e842650b9d64",
      "languageCode": [
          "en"
      ],
      "version": 1,
      "license": "CC BY 4.0",
      "name": "SST Collection",
      "status": "Draft",
      "code": "86de827a-ef47-d6c4-f93a-8caa12ab16cc",
      "allowSkip": "Yes",
      "containsUserData": "No",
      "description": "Social Science Class 7 Description",
      "medium": [
          "English"
      ],
      "createdOn": "2021-12-16T07:07:19.134+0000",
      "acceptedContributions": [
          "do_113431945279152128185",
          "do_113431946570817536186",
          "do_113431948000452608188",
          "do_113431952169918464189",
          "do_113431953381294080190",
          "do_1134347144589066241118",
          "do_113437085715341312124",
          "do_113437108870594560125"
      ],
      "contentDisposition": "inline",
      "lastUpdatedOn": "2021-12-28T09:11:04.506+0000",
      "allowAnonymousAccess": "Yes",
      "lastStatusChangedOn": "2021-12-16T07:07:19.134+0000",
      "creator": "N11",
      "requiresSubmit": "No",
      "setType": "materialised",
      "versionKey": "1640682664506",
      "showFeedback": "No",
      "framework": "ekstep_ncert_k-12",
      "depth": 0,
      "createdBy": "5a587cc1-e018-4859-a0a8-e842650b9d64",
      "compatibilityLevel": 5,
      "navigationMode": "non-linear",
      "shuffle": true,
      "board": "CBSE",
      "programId": "c8755a00-5e3e-11ec-874d-3de2a8c29d94"
  },
  "instructions": "(1 -5) सही  उत्तर का चयन करके लिखो  Select and write the correct answer.\n1. All questions are mandatory\n2. There is no negative marking\n3. Best of luck students"
}
          
      
   

exports.programRestrictedContrib = {"request":{"name":"program contribution restricted to selected org","description":"program contribution restricted to selected org","nomination_enddate":null,"shortlisting_enddate":null,"content_submission_enddate":"2021-08-26T18:29:59.000Z","rewards":null,"target_collection_category":["Content Playlist"],"content_types":[],"targetprimarycategories":[{"identifier":"obj-cat:demo-practice-question-set_questionset_all","name":"Demo Practice Question Set","targetObjectType":"QuestionSet"}],"sourcing_org_name":"Vidya2","rootorg_id":"012983850117177344161","createdby":"cca53828-8111-4d71-9c45-40e569f13bad","createdon":"2021-08-19T10:48:32.656Z","startdate":"2021-08-19T10:48:32.656Z","slug":"sunbird","type":"restricted","default_roles":["CONTRIBUTOR"],"enddate":"2021-09-02T18:29:59.000Z","status":"Live","program_id":"6e9bf2e0-00d9-11ec-bc85-5d4e626f801d","collection_ids":[null],"config":{"defaultContributeOrgReview":true,"_comments":"","loginReqired":true,"framework":["ekstep_ncert_k-12"],"board":[],"gradeLevel":[],"medium":[null],"subject":[null],"roles":[{"id":1,"name":"CONTRIBUTOR","default":true,"defaultTab":1,"tabs":[1]},{"id":2,"name":"REVIEWER","defaultTab":2,"tabs":[2]}],"header":{"id":"ng.sunbird.header","ver":"1.0","compId":"headerComp","author":"Venkat","description":"","publishedDate":"","data":{},"config":{"tabs":[{"index":1,"label":"Contribute","onClick":"collectionComponent"},{"index":2,"label":"Review","onClick":"collectionComponent"},{"index":3,"label":"Dashboard","onClick":"dashboardComponent"}]}},"components":[{"id":"ng.sunbird.collection","ver":"1.0","compId":"collectionComponent","author":"Venkat","description":"","publishedDate":"","data":{},"config":{"filters":{"implicit":[{"code":"framework","defaultValue":"ekstep_ncert_k-12","label":"Framework"},{"code":"board","defaultValue":"CBSE","label":"Board"},{"code":"medium","defaultValue":["English"],"label":"Medium"}],"explicit":[{"code":"gradeLevel","range":["Kindergarten","Grade 1","Grade 2","Grade 3"],"label":"Class","multiselect":false,"defaultValue":["Kindergarten","Grade 1"],"visibility":true},{"code":"subject","range":["English","Mathematics","Hindi"],"label":"Subject","multiselect":false,"defaultValue":["English"],"visibility":true}]},"groupBy":{"value":"subject","defaultValue":"subject"},"collectionType":"Textbook","collectionList":[],"status":["Draft","Live"]}},{"id":"ng.sunbird.chapterList","ver":"1.0","compId":"chapterListComponent","author":"Kartheek","description":"","publishedDate":"","data":{},"config":{"contentTypes":{"value":[{"id":"explanationContent","label":"Explanation","onClick":"uploadComponent","mimeType":["application/pdf","video/mp4","video/webm","application/epub"],"metadata":{"name":"Explanation Resource","description":"ExplanationResource","resourceType":"Read","contentType":"ExplanationResource","audience":["Learner"],"appIcon":"https://ntpstagingall.blob.core.windows.net/ntp-content-staging/content/do_21291553051403878414/artifact/explanation.thumb_1576602846206.png","marks":5},"filesConfig":{"accepted":"pdf, mp4, webm, epub","size":"50"}},{"id":"learningActivity","label":"Activity for Learning","onClick":"uploadComponent","mimeType":["application/pdf","video/mp4","video/webm","application/epub","application/vnd.ekstep.h5p-archive"],"metadata":{"name":"Activity for Learning","description":"LearningActivity","resourceType":"Read","contentType":"LearningActivity","audience":["Learner"],"appIcon":"","marks":5},"filesConfig":{"accepted":"pdf, mp4, webm, epub, h5p","size":"50"}},{"id":"experientialContent","label":"Experiential","onClick":"uploadComponent","mimeType":["video/mp4","video/webm"],"metadata":{"name":"Experiential Resource","description":"ExperientialResource","resourceType":"Read","contentType":"ExperientialResource","audience":["Learner"],"appIcon":"https://ntpstagingall.blob.core.windows.net/ntp-content-staging/content/do_21291553051403878414/artifact/explanation.thumb_1576602846206.png","marks":5},"filesConfig":{"accepted":"mp4, webm","size":"50"}},{"id":"classroomTeachingVideo","label":"Classroom Teaching Video","onClick":"uploadComponent","mimeType":["video/mp4","video/webm"],"metadata":{"name":"Classroom Teaching Video","description":"ClassroomTeachingVideo","resourceType":"Read","contentType":"ClassroomTeachingVideo","audience":["Learner"],"appIcon":"","marks":5},"filesConfig":{"accepted":"mp4, webm","size":"50"}},{"id":"explanationVideo","label":"Explanation Video","onClick":"uploadComponent","mimeType":["video/mp4","video/webm"],"metadata":{"name":"Explanation Video","description":"ExplanationVideo","resourceType":"Read","contentType":"ExplanationVideo","audience":["Learner"],"appIcon":"","marks":5},"filesConfig":{"accepted":"mp4, webm","size":"50"}},{"id":"explanationReadingMaterial","label":"Explanation Reading Material","onClick":"uploadComponent","mimeType":["application/pdf","application/epub"],"metadata":{"name":"Explanation Reading Material","description":"ExplanationReadingMaterial","resourceType":"Read","contentType":"ExplanationReadingMaterial","audience":["Learner"],"appIcon":"","marks":5},"filesConfig":{"accepted":"pdf, epub","size":"50"}},{"id":"previousBoardExamPapers","label":"Previous Board Exam Papers","onClick":"uploadComponent","mimeType":["application/pdf","application/epub"],"metadata":{"name":"Previous Board Exam Papers","description":"PreviousBoardExamPapers","resourceType":"Read","contentType":"PreviousBoardExamPapers","audience":["Learner"],"appIcon":"","marks":5},"filesConfig":{"accepted":"pdf, epub","size":"50"}},{"id":"lessonPlanResource","label":"Lesson Plan","onClick":"uploadComponent","mimeType":["application/pdf","application/epub"],"metadata":{"name":"Lesson Plan","description":"LessonPlanResource","resourceType":"Read","contentType":"LessonPlanResource","audience":["Learner"],"appIcon":"","marks":5},"filesConfig":{"accepted":"pdf, epub","size":"50"}},{"id":"focusSpotContent","label":"FocusSpot","onClick":"uploadComponent","mimeType":["application/pdf","application/epub"],"metadata":{"name":"FocusSpot Resource","description":"FocusSpot","resourceType":"Read","contentType":"FocusSpot","audience":["Learner"],"appIcon":"https://ntpstagingall.blob.core.windows.net/ntp-content-staging/content/do_21291553100098764812/artifact/focus-spot_1561727473311.thumb_1576602905573.png","marks":5},"filesConfig":{"accepted":"pdf, epub","size":"50"}},{"id":"TeachingMethod","label":"Teaching Method","onClick":"uploadComponent","mimeType":["application/pdf","application/epub"],"metadata":{"name":"Teaching Method","description":"TeachingMethod","resourceType":"Read","contentType":"TeachingMethod","audience":["Learner"],"appIcon":"https://ntpstagingall.blob.core.windows.net/ntp-content-staging/content/do_21291553100098764812/artifact/focus-spot_1561727473311.thumb_1576602905573.png","marks":5},"filesConfig":{"accepted":"pdf, epub","size":"50"}},{"id":"PedagogyFlow","label":"Pedagogy Flow","onClick":"uploadComponent","mimeType":["application/pdf","application/epub"],"metadata":{"name":"Pedagogy Flow","description":"PedagogyFlow","resourceType":"Read","contentType":"PedagogyFlow","audience":["Learner"],"appIcon":"https://ntpstagingall.blob.core.windows.net/ntp-content-staging/content/do_21291553100098764812/artifact/focus-spot_1561727473311.thumb_1576602905573.png","marks":5},"filesConfig":{"accepted":"pdf, epub","size":"50"}},{"id":"LearningOutcomeDefinition","label":"Learning Outcome Definition","onClick":"uploadComponent","mimeType":["application/pdf","application/epub"],"metadata":{"name":"Learning Outcome Definition","description":"LearningOutcomeDefinition","resourceType":"Read","contentType":"LearningOutcomeDefinition","audience":["Learner"],"appIcon":"https://ntpstagingall.blob.core.windows.net/ntp-content-staging/content/do_21291553100098764812/artifact/focus-spot_1561727473311.thumb_1576602905573.png","marks":5},"filesConfig":{"accepted":"pdf, epub","size":"50"}},{"id":"MarkingSchemeRubric","label":"Marking Scheme Rubric","onClick":"uploadComponent","mimeType":["application/pdf","application/epub"],"metadata":{"name":"Marking Scheme Rubric","description":"MarkingSchemeRubric","resourceType":"Read","contentType":"MarkingSchemeRubric","audience":["Learner"],"appIcon":"https://ntpstagingall.blob.core.windows.net/ntp-content-staging/content/do_21291553100098764812/artifact/focus-spot_1561727473311.thumb_1576602905573.png","marks":5},"filesConfig":{"accepted":"pdf, epub","size":"50"}},{"id":"ConceptMap","label":"Concept Map","onClick":"uploadComponent","mimeType":["application/pdf","application/epub"],"metadata":{"name":"Concept Map","description":"ConceptMap","resourceType":"Read","contentType":"ConceptMap","audience":["Learner"],"appIcon":"https://ntpstagingall.blob.core.windows.net/ntp-content-staging/content/do_21291553100098764812/artifact/focus-spot_1561727473311.thumb_1576602905573.png","marks":5},"filesConfig":{"accepted":"pdf, epub","size":"50"}},{"id":"SelfAssess","label":"Self Assess","onClick":"uploadComponent","mimeType":["application/pdf","application/epub"],"metadata":{"name":"Self Assess","description":"SelfAssess","resourceType":"Read","contentType":"SelfAssess","audience":["Learner"],"appIcon":"https://ntpstagingall.blob.core.windows.net/ntp-content-staging/content/do_21291553100098764812/artifact/focus-spot_1561727473311.thumb_1576602905573.png","marks":5},"filesConfig":{"accepted":"pdf, epub","size":"50"}},{"id":"vsaPracticeQuestionContent","label":"VSA - Practice Sets","onClick":"questionSetComponent","mimeType":["application/vnd.ekstep.ecml-archive"],"metadata":{"name":"Practice QuestionSet","description":"Practice QuestionSet","resourceType":"Learn","contentType":"PracticeQuestionSet","audience":["Learner"],"appIcon":"","marks":5},"questionCategories":["vsa"]},{"id":"saPracticeQuestionContent","label":"SA - Practice Sets","onClick":"questionSetComponent","mimeType":["application/vnd.ekstep.ecml-archive"],"metadata":{"name":"Practice QuestionSet","description":"Practice QuestionSet","resourceType":"Learn","contentType":"PracticeQuestionSet","audience":["Learner"],"appIcon":"","marks":5},"questionCategories":["sa"]},{"id":"laPracticeQuestionContent","label":"LA - Practice Sets","onClick":"questionSetComponent","mimeType":["application/vnd.ekstep.ecml-archive"],"metadata":{"name":"Practice QuestionSet","description":"Practice QuestionSet","resourceType":"Learn","contentType":"PracticeQuestionSet","audience":["Learner"],"appIcon":"","marks":5},"questionCategories":["la"]},{"id":"mcqPracticeQuestionContent","label":"MCQ - Practice Sets","onClick":"questionSetComponent","mimeType":["application/vnd.ekstep.ecml-archive"],"metadata":{"name":"Practice QuestionSet","description":"Practice QuestionSet","resourceType":"Learn","contentType":"PracticeQuestionSet","audience":["Learner"],"appIcon":"","marks":5},"questionCategories":["mcq"]},{"id":"curiositySetContent","label":"Curiosity Sets","onClick":"curiositySetComponent","mimeType":["application/vnd.ekstep.ecml-archive"],"metadata":{"name":"Curiosity QuestionSet","description":"Curiosity QuestionSet","resourceType":"Learn","contentType":"CuriosityQuestionSet","audience":["Learner"],"appIcon":"","marks":5},"questionCategories":["curiosity"]}],"defaultValue":[{"id":"vsaPracticeQuestionContent","label":"Practice Sets","onClick":"questionSetComponent","mimeType":["application/vnd.ekstep.ecml-archive"],"metadata":{"name":"Practice QuestionSet","description":"Practice QuestionSet","resourceType":"Learn","contentType":"PracticeQuestionSet","audience":["Learner"],"appIcon":"","marks":5},"questionCategories":["vsa"]}]}}},{"id":"ng.sunbird.uploadComponent","ver":"1.0","compId":"uploadContentComponent","author":"Kartheek","description":"","publishedDate":"","data":{},"config":{"filesConfig":{"accepted":"pdf, mp4, webm, h5p, epub","size":"50"},"formConfiguration":[{"code":"learningOutcome","dataType":"list","description":"Learning Outcomes For The Content","editable":true,"inputType":"multiselect","label":"Learning Outcome","name":"LearningOutcome","placeholder":"Select Learning Outcomes","required":false,"visible":true},{"code":"attributions","dataType":"list","description":"Enter Attributions","editable":true,"inputType":"text","label":"Attributions","name":"Attributions","placeholder":"Enter Attributions","required":false,"visible":true,"helpText":"If you have relied on another work to create this Content, provide the name of that creator and the source of that work."},{"code":"copyright","dataType":"text","description":"Enter Copyright and Year","editable":true,"inputType":"text","label":"Copyright and Year","name":"Copyright","placeholder":"Enter Copyright and Year","required":true,"visible":true,"helpText":"If you are an individual, creating original Content, you are the copyright holder. If you are creating Content on behalf of an organisation, the organisation may be the copyright holder. Please fill as <Name of copyright holder>, <Year of publication>"},{"code":"creator","dataType":"text","description":"Enter The Author Name","editable":true,"inputType":"text","label":"Author","name":"Author","placeholder":"Enter Author Name","required":true,"visible":true,"helpText":"Provide name of creator of this Content."},{"code":"license","dataType":"list","description":"License For The Content","editable":true,"inputType":"select","label":"License","name":"License","placeholder":"Select License","required":true,"visible":true,"helpText":"Choose the most appropriate Creative Commons License for this Content"},{"code":"contentPolicyCheck","dataType":"boolean","editable":false,"inputType":"checkbox","name":"Content Policy Check","required":true,"visible":true}],"resourceTitleLength":"200","tenantName":"SunbirdEd"}},{"id":"ng.sunbird.practiceSetComponent","ver":"1.0","compId":"practiceSetComponent","author":"Kartheek","description":"","publishedDate":"","data":{},"config":{"No of options":4,"solutionType":["Video","Text & image"],"questionCategory":["vsa","sa","ls","mcq","curiosity"],"formConfiguration":[{"code":"learningOutcome","dataType":"list","description":"Learning Outcomes For The Content","editable":true,"inputType":"multiselect","label":"Learning Outcome","name":"LearningOutcome","placeholder":"Select Learning Outcomes","required":false,"visible":true},{"code":"attributions","dataType":"list","description":"Enter Attributions","editable":true,"inputType":"text","label":"Attributions","name":"Attributions","placeholder":"Enter Attributions","required":false,"visible":true,"helpText":"If you have relied on another work to create this Content, provide the name of that creator and the source of that work."},{"code":"copyright","dataType":"text","description":"Enter Copyright and Year","editable":true,"inputType":"text","label":"Copyright and Year","name":"Copyright","placeholder":"Enter Copyright and Year","required":true,"visible":true,"helpText":"If you are an individual, creating original Content, you are the copyright holder. If you are creating Content on behalf of an organisation, the organisation may be the copyright holder. Please fill as <Name of copyright holder>, <Year of publication>"},{"code":"creator","dataType":"text","description":"Enter The Author Name","editable":true,"inputType":"text","label":"Author","name":"Author","placeholder":"Enter Author Name","required":true,"visible":true,"helpText":"Provide name of creator of this Content."},{"code":"license","dataType":"list","description":"License For The Content","editable":true,"inputType":"select","label":"License","name":"License","placeholder":"Select License","required":true,"visible":true,"helpText":"Choose the most appropriate Creative Commons License for this Content"},{"code":"contentPolicyCheck","dataType":"boolean","editable":false,"inputType":"checkbox","name":"Content Policy Check","required":true,"visible":true}],"resourceTitleLength":"200","tenantName":"","assetConfig":{"image":{"size":"50","accepted":"jpeg, png, jpg"},"video":{"size":"50","accepted":"pdf, mp4, webm, youtube"}}}},{"id":"ng.sunbird.dashboard","ver":"1.0","compId":"dashboardComp","author":"Venkanna Gouda","description":"","publishedDate":"","data":{},"config":{}}],"sharedContext":["channel","framework","board","medium","gradeLevel","subject","topic"],"contributors":{"Org":[{"osid":"18180aff-07ba-4f50-bf4a-04ace80f303b","isChecked":true,"User":{"userId":"e5b9044c-93f6-4d79-a4d1-98acc2a189c2","maskedEmail":"15***@yopmail.com","maskedPhone":null}},{"osid":"e9ac59bd-d9bd-4a71-b55b-ff9bc1f29eb0","isChecked":true,"User":{"userId":"14ea78c0-67fa-42be-b4b6-e42d0d8ca9bc","maskedEmail":"16***@yopmail.com","maskedPhone":null}}],"User":[]},"blueprintMap":{},"collections":[{"id":"do_11316008443414937613","allowed_content_types":[],"children":[{"id":"do_11316008814321664014","allowed_content_types":[]}]}]}}}