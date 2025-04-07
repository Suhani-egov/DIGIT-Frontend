const assignmentSchema = {
    type: "object",
    properties: {
      citizenName: {
        type: "string",
        description: "Citizen Name",
      },
      citizenMobileNumber: {
        type: "number",
        description: "Mobile Number",
      },
      complaintLocation: {
        type: "object",
        properties: {
          pincode: {
            type: "number",
            description: "Pincode",
          },
          city: {
            type: "string",
            description: "City",
          },
          address: {
            type: "string",
            description: "Address",
          },
          landmark: {
            type: "string",
            description: "Landmark",
          },
        },
      },
      complaintType: {
        type: "array",
        items: {
          type: "object",
          enum: ["Type1", "Type2", "Type3"],
        },
        description: "Complaint Type",
      },
    },
  };
  
  export default assignmentSchema;
  