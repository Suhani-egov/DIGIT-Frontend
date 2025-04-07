export const newConfig = [
  {
    head: "Student Personal Details",
    body: [
      {
        inline: true,
        label: "City",
        isMandatory: true,
        key: "city",
        type: "text",
        disable: false,
        populators: {
          name: "city",
          error: "Required",
          validation: { pattern: /^[A-Za-z]+$/i }, // Allows only alphabets
        },
        
      },
      {
        inline: true,
        label: "City",
        isMandatory: true,
        key: "city",
        type: "checkboc",
        disable: false,
        populators: {
          name: "citisty",
          error: "Required",
=        }
      }
    ],
  },
];
