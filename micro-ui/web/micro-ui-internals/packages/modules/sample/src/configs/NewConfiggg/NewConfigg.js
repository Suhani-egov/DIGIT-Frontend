export const newConfig = [
  {
    head: "Student Personal Details",
    body: [
      {
        inline: true,
        label: "Student Name",
        isMandatory: true,
        key: "applicantname",
        type: "text",
        disable: false,
        populators: {
          name: "applicantname", //label to
          error: "Required",
          validation: { pattern: /^[A-Za-z ]+$/i },
        },
        
      },
      {
        inline: true,
        label: "Applicant Address",
        isMandatory: true,
        key: "address",
        type: "text",
        disable: false,
        populators: {
          name: "applicantaddress",
          error: "Required",
          validation: { pattern: /^[A-Za-z0-9 ,.-]+$/i },
        },
      },
      {
        inline: true,
        label: "Class",
        isMandatory: true,
        key: "class",
        type: "text",
        disable: false,
        populators: {
          name: "class",
          error: "Required",
          validation: { pattern: /^[A-Za-z0-9 ]+$/i },
        },
      },
      {
        inline: true,
        label: "Date of Birth",
        isMandatory: true,
        key: "dob",
        type: "date",
        disable: false,
        populators: {
          name: "dob",
          error: "Required",
        },
      },
    ],
  },
  {
    head: "Subject Selection",
    body: [
      {
        isMandatory: true,
        key: "subject",
        type: "dropdown",
        label: "Select Subject",
        disable: false,
        populators: {
          name: "subject",
          optionsKey: "name",
          error: "Please select a subject",
          required: true,
          options: [
            { code: "MATH", name: "Mathematics" },
            { code: "SCI", name: "Science" },
            { code: "HIST", name: "History" },
            { code: "GEO", name: "Geography" },
            { code: "ENG", name: "English" },
          ],
        },
      },
    ],
  },
];
