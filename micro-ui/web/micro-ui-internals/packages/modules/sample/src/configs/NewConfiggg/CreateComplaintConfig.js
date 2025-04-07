export const CreateComplaintConfig = [
  {
    head: "Applicant Details",
    body: [
      {
        inline: true,
        label: "Salutation",
        isMandatory: false,
        type: "text",
        disable: false,
        populators: {
          name: "salutation",
          error: "Invalid input",
          validation: { pattern: /^[A-Za-z]+$/i, maxlength: 10 },
        },
      },
      {
        inline: true,
        label: "Name",
        isMandatory: true,
        type: "text",
        disable: false,
        populators: {
          name: "citizenName",
          error: "Invalid name",
          validation: {
            required: true,
            pattern: /^[A-Za-z ]+$/i,
            minLength: 5,
            maxLength: 100,
          },
        },
      },
      {
        label: "Phone Number",
        isMandatory: true,
        type: "mobileNumber",
        disable: false,
        populators: {
          name: "citizenMobileNumber",
          error: "Invalid phone number",
          validation: {
            required: true,
            pattern: /^[6-9]\d{9}$/,
          },
        },
      },
    ],
  },

  {
    head: "Complaint Location",
    key: "complaintLocation",
    body: [
      {
        label: "Ward",
        type: "locationdropdown",
        isMandatory: false,
        disable: false,
        populators: {
          name: "ward",
          type: "ward",
          optionsKey: "i18nKey",
          defaultText: "COMMON_SELECT_WARD",
          selectedText: "COMMON_SELECTED",
          allowMultiSelect: false,
        },
      },
      {
        label: "Address",
        isMandatory: true,
        type: "textarea",
        disable: false,
        populators: {
          name: "complaintLocation.address",
          error: "Invalid address",
          validation: { pattern: /^[A-Za-z0-9\s,.-/()#]+$/i },
        },
      },
      {
        inline: true,
        label: "City",
        isMandatory: true,
        type: "text",
        disable: false,
        populators: {
          name: "complaintLocation.city",
        },
      },
      {
        label: "Pincode",
        isMandatory: true,
        type: "text",
        disable: false,
        populators: {
          name: "complaintLocation.pincode",
          validation: {
            required: true,
            pattern: /^\d{6}$/,
          },
        },
      },
      {
        label: "Landmark",
        isMandatory: false,
        type: "text",
        disable: false,
        populators: {
          name: "complaintLocation.landmark",
        },
      },
    ],
  },

  {
    head: "Complaint Details",
    key: "complaintDetails",
    body: [
      {
        label: "Complaint Type",
        isMandatory: true,
        type: "dropdown",
        disable: false,
        populators: {
          name: "complaintType",
          options: [
            { code: "NOISE", name: "Noise Pollution" },
            { code: "WATER", name: "Water Leakage" },
            { code: "ELECTRICITY", name: "Electricity Issue" },
            { code: "GARBAGE", name: "Garbage Dumping" },
            { code: "ROAD", name: "Road Damage" },
          ],
          optionsKey: "name",
          error: "Please select a complaint type",
        },
      },
      {
        label: "Complaint Description",
        isMandatory: true,
        type: "textarea",
        disable: false,
        populators: {
          name: "complaintDescription",
          error: "Please enter a valid description",
          validation: {
            required: true,
            minLength: 10,
            maxLength: 500,
          },
        },
      },
    ],
  },

  {
    head: "Upload Picture",
    key: "pictureUpload",
    body: [
      {
        isMandatory: false,
        type: "multiUpload",
        disable: false,
        populators: {
          name: "pictureUpload",
        },
      },
    ],
  },

  {
    head: "Additional Documents",
    key: "additionalDetails",
    body: [
      {
        isMandatory: false,
        type: "component",
        component: "SampleAdditionalComponent",
        withoutLabel: true,
        disable: false,
        populators: {
          name: "additionalDetails",
        },
      },
    ],
  },

  {
    head: "Configuration",
    key: "config",
    body: [
      {
        inline: true,
        withoutLabel: true,
        type: "checkbox",
        description: "Configuration options.",
        populators: {
          name: "isStepper",
          title: "isStepper",
        },
      },
    ],
  },
];
