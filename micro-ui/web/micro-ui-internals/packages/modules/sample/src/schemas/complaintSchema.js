const complaintSchema = {
    type: "object",
    title: "Assignment.PGRAPPLY",
    $schema: "http://json-schema.org/draft-07/schema#",
    required: [
      "citizenMobileNumber",
      "citizenName",
      "complaintType",
      "complaintLocation",
      "config"
    ],
    "x-unique": [
      "citizenMobileNumber"
    ],
    properties: {
      config: {
        type: "object",
        required: [
          "isStepper",
          "isAddress"
        ],
        properties: {
          isAddress: {
            type: "boolean"
          },
          isStepper: {
            type: "boolean"
          }
        },
        description: "Configuration options."
      },
      citizenMobileNumber: {
        type: "number",
        pattern: "^\\d{10}$",
        description: "Citizen mobile number must be a 10-digit number."
      },
      citizenName: {
        type: "string",
        minLength: 5,
        maxLength: 100,
        description: "Citizen name must be between 5 and 100 characters."
      },
      complaintType: {
        type: "array",
        items: {
          type: "object",
          required: ["code", "name"],
          properties: {
            code: { type: "string" },
            name: { type: "string" },
          },
        },
        minItems: 1,
        description: "List of complaint types with code and name."
      },
      complaintLocation: {
        type: "object",
        required: ["pincode", "city", "landmark", "address"],
        properties: {
          city: { type: "string" },
          address: { type: "string" },
          pincode: { type: "number" },
          landmark: { type: "string" },
        },
        description: "Details of the complaint location."
      },
      pictureUpload: {
        type: "object",
        properties: {
          type: {
            enum: ["documentUpload"],
            type: "string"
          },
        },
        description: "Picture upload field, type must be 'documentUpload'."
      },
    },
    additionalProperties: false
  };
  
  export default complaintSchema;