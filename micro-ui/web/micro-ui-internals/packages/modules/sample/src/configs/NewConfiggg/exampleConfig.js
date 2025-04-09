export const ExampleConfig = [
    {
      head: "Citizen Information",
      body: [
        {
          label: "Full Name",
          isMandatory: true,
          key: "citizenName",
          type: "text",
          populators: {
            name: "citizenName",
            error: "Name must be 5-100 characters",
            validation: {
              required: true,
              minLength: 5,
              maxLength: 100,
              pattern: /^[A-Za-z\s]+$/
            }
          }
        },
        {
          label: "Mobile Number",
          isMandatory: true,
          key: "citizenMobileNumber",
          type: "number",
          populators: {
            name: "citizenMobileNumber",
            error: "10-digit number required",
            validation: {
              required: true,
              pattern: /^\d{10}$/
            }
          }
        }
      ]
    },
    {
      head: "Complaint Details",
      body: [
        {
          label: "Complaint Type",
          isMandatory: true,
          key: "complaintType",
          type: "dropdown",
          populators: {
            name: "complaintType",
            error: "Select at least one complaint type",
            required: true,
            isMulti: true,
            optionsKey: "name",
            options: [
              { code: "noise", name: "Noise Pollution" },
              { code: "garbage", name: "Garbage Collection" },
              { code: "road", name: "Road Damage" }
            ]
          }
        }
      ]
    },
    {
      head: "Location Details",
      body: [
        {
          label: "Address",
          isMandatory: true,
          key: "complaintLocation.address",
          type: "textarea",
          populators: {
            name: "complaintLocation.address",
            error: "Address is required",
            validation: { required: true }
          }
        },
        {
          inline: true,
          label: "City",
          isMandatory: true,
          key: "complaintLocation.city",
          type: "text",
          populators: {
            name: "complaintLocation.city",
            error: "City is required",
            validation: { required: true }
          }
        },
        {
          inline: true,
          label: "Pincode",
          isMandatory: true,
          key: "complaintLocation.pincode",
          type: "number",
          populators: {
            name: "complaintLocation.pincode",
            error: "6-digit pincode required",
            validation: { required: true }
          }
        },
        {
          label: "Landmark",
          isMandatory: true,
          key: "complaintLocation.landmark",
          type: "text",
          populators: {
            name: "complaintLocation.landmark",
            error: "Landmark is required",
            validation: { required: true }
          }
        }
      ]
    },
    {
        head: "Supporting Documents",
        body: [
          {
            label: "Document Type",
            isMandatory: false,
            key: "pictureUpload.type",
            type: "dropdown",
            populators: {
              name: "pictureUpload.type",
              error: "Please select document type",
              optionsKey:"name",
              options: [
                { code: "photo", name: "Photograph" },
                { code: "receipt", name: "Receipt" },
                { code: "other", name: "Other Document" }
              ],
              defaultValue: "photo"
            }
          },
        ]
      }
  ];