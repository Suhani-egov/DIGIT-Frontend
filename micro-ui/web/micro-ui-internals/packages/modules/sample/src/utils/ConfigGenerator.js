// /**
//  * Converts a JSON schema to a form configuration
//  * @param {Object} schema - The JSON schema object
//  * @return {Array} - The form configuration array
//  */
// export const schemaToConfig = (schema) => {
//     if (!schema || typeof schema !== 'object') {
//       throw new Error('Invalid schema provided');
//     }
  
//     // Extract relevant information from the schema
//     const properties = schema.properties || {};
//     const required = schema.required || [];
    
//     // Group fields by type to organize into logical sections
//     const sections = groupPropertiesIntoSections(properties, required);
    
//     return sections;
//   };
  
//   /**
//    * Groups schema properties into logical sections
//    * @param {Object} properties - Schema properties
//    * @param {Array} required - List of required fields
//    * @return {Array} - Grouped sections for the form config
//    */
//   function groupPropertiesIntoSections(properties, required) {
//     const sections = [];
//     const propertyEntries = Object.entries(properties);
    
//     // Skip system/config properties that shouldn't be rendered as fields
//     const configProperty = propertyEntries.find(([key]) => key === 'config');
//     const fieldsToRender = propertyEntries.filter(([key]) => key !== 'config');
    
//     // Create sections based on property types
//     const basicFields = [];
//     const objectFields = {};
//     const arrayFields = {};
    
//     // First pass: categorize fields
//     fieldsToRender.forEach(([key, property]) => {
//       if (property.type === 'object' && property.properties) {
//         // Create a section for each object type
//         objectFields[key] = { properties: property.properties, required: property.required || [] };
//       } else if (property.type === 'array' && property.items) {
//         // Create a section for array type fields
//         arrayFields[key] = property;
//       } else {
//         // Basic fields (string, number, boolean, etc.)
//         basicFields.push(createField(key, property, required.includes(key)));
//       }
//     });
    
//     // Add basic fields section if we have any
//     if (basicFields.length > 0) {
//       sections.push({
//         head: "Basic Information",
//         body: basicFields
//       });
//     }
    
//     // Add object-based sections
//     console.log("djfhegy",objectFields)
//     Object.entries(objectFields).forEach(([key, data]) => {
//       const sectionFields = [];
//       const { properties: objProps, required: objRequired } = data;
      
//       Object.entries(objProps).forEach(([propKey, propValue]) => {
//         const fieldKey = `${key}.${propKey}`;
//         const isRequired = objRequired.includes(propKey);
//         sectionFields.push(createField(fieldKey, propValue, isRequired));
//       });
      
//       if (sectionFields.length > 0) {
//         // Convert camelCase to Title Case for section heading
//         const sectionTitle = key.replace(/([A-Z])/g, ' $1')
//           .replace(/^./, str => str.toUpperCase()) + " Details";
        
//         sections.push({
//           head: sectionTitle,
//           body: sectionFields
//         });
//       }
//     });
    
//     // Add array-based sections
//     Object.entries(arrayFields).forEach(([key, property]) => {
//       const sectionTitle = key.replace(/([A-Z])/g, ' $1')
//         .replace(/^./, str => str.toUpperCase());
      
//       const field = createArrayField(key, property, required.includes(key));
      
//       sections.push({
//         head: sectionTitle,
//         body: [field]
//       });
//     });
    
//     return sections;
//   }
  
//   /**
//    * Creates a field configuration based on schema property
//    * @param {String} key - Property key
//    * @param {Object} property - Schema property definition
//    * @param {Boolean} isRequired - Whether the field is required
//    * @return {Object} - Field configuration
//    */
//   function createField(key, property, isRequired) {
//     const label = key.split('.').pop().replace(/([A-Z])/g, ' $1')
//       .replace(/^./, str => str.toUpperCase());
    
//     // Determine field type based on schema property
//     //make a switch case
//     let fieldType = "text";
//     if (property.type === "number") {
//       fieldType = "number";
//     } else if (property.type === "boolean") {
//       fieldType = "checkbox";
//     } else if (property.enum || (property.type === "string" && property.enum)) {
//       fieldType = "dropdown";
//     } else if (key.toLowerCase().includes("address") || property.maxLength > 100) {
//       fieldType = "textarea";
//     }
    
//     // Build validation rules
//     const validation = {
//       required: isRequired
//     };
    
//     if (property.minLength !== undefined) validation.minLength = property.minLength;
//     if (property.maxLength !== undefined) validation.maxLength = property.maxLength;
//     if (property.pattern !== undefined) validation.pattern = new RegExp(property.pattern);
//     if (property.minimum !== undefined) validation.min = property.minimum;
//     if (property.maximum !== undefined) validation.max = property.maximum;
    
//     // Special case for mobile number
//     if (key.toLowerCase().includes("mobile") || key.toLowerCase().includes("phone")) {
//       validation.pattern = /^\d{10}$/;
//     }
    
//     // Special case for name fields
//     if (key.toLowerCase().includes("name") && !validation.pattern) {
//       validation.pattern = /^[A-Za-z\s]+$/;
//     }
    
//     const field = {
//       label,
//       isMandatory: isRequired,
//       key,
//       type: fieldType,
//       populators: {
//         name: key,
//         error: property.description || `${label} is required`,
//         validation //look how it is being used
//       }
//     };
    
//     // Add dropdown options if applicable
//     if (fieldType === "dropdown" && property.enum) {
//       field.populators.options = property.enum.map(value => ({
//         code: value,
//         name: value
//       }));
//       field.populators.optionsKey = "name";
//     }
    
//     // Handle special case for document upload
//     if (key.toLowerCase().includes("upload") || key.toLowerCase().includes("document") ||
//         key.toLowerCase().includes("picture")) {
//       if (key.endsWith("type")) {
//         field.populators.options = [
//           { code: "documentUpload", name: "documentUpload" },
         
//         ];
//         field.populators.defaultValue = "photo";
//       } else {
//         field.type = "file";
//       }
//     }
    
//     return field;
//   }
  
//   /**
//    * Creates a field configuration for array type properties
//    * @param {String} key - Property key
//    * @param {Object} property - Schema property definition
//    * @param {Boolean} isRequired - Whether the field is required
//    * @return {Object} - Field configuration
//    */
//   function createArrayField(key, property, isRequired) {
//     const label = key.replace(/([A-Z])/g, ' $1')
//       .replace(/^./, str => str.toUpperCase());
    
//     // Default to multi-select dropdown for arrays
//     const field = {
//       isMandatory: isRequired,
//       key,
//       type: "component", // Use custom component rendering
//       component: `${label.replace(/\s/g, '')}Component`, // Generate component name based on field name
//       withoutLabel: true,
//       populators: {
//         name: key,
//         error: property.description || `Select at least ${property.minItems || 1} ${label}`,
//         required: isRequired,
//         isMulti: true,
//         optionsKey: "name"
//       }
//     };
    
   
    
//     return field;
//   }

export const schemaToConfig = (schema) => {
    if (!schema || typeof schema !== 'object') {
      throw new Error('Invalid schema provided');
    }
  
    const properties = schema.properties || {};
    const required = schema.required || [];
  
    const sections = groupPropertiesIntoSections(properties, required);

    // if (sections.length > 0) {
    //     sections[0].body.unshift({
    //       type: "header",
    //       label: "Register Complaint",
    //       key: "formHeading"
    //     });
    //   }


    return sections;
  };
  
  function groupPropertiesIntoSections(properties, required) {
    const sections = [];
    const propertyEntries = Object.entries(properties);
  
    const fieldsToRender = propertyEntries.filter(([key]) => key !== 'config');
  
    const basicFields = [];
    const objectFields = {};
    const arrayFields = {};
  
    fieldsToRender.forEach(([key, property]) => {
      if (property.type === 'object' && property.properties) {
        objectFields[key] = { properties: property.properties, required: property.required || [] };
      } else if (property.type === 'array' && property.items) {
        arrayFields[key] = property;
      } else {
        basicFields.push(createField(key, property, required.includes(key)));
      }
    });
  
    if (basicFields.length > 0) {
      sections.push({
        head: "Basic Information",
        body: basicFields
      });
    }
  
    Object.entries(objectFields).forEach(([key, data]) => {
      const sectionFields = [];
      const { properties: objProps, required: objRequired } = data;
  
      Object.entries(objProps).forEach(([propKey, propValue]) => {
        const fieldKey = `${key}.${propKey}`;
        const isRequired = objRequired.includes(propKey);
        sectionFields.push(createField(fieldKey, propValue, isRequired));
      });
  
      if (sectionFields.length > 0) {
        const sectionTitle = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) + " Details";
        sections.push({
          head: sectionTitle,
          body: sectionFields
        });
      }
    });
  
    Object.entries(arrayFields).forEach(([key, property]) => {
      const sectionTitle = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      const field = createArrayField(key, property, required.includes(key));
      sections.push({
        head: sectionTitle,
        body: [field]
      });
    });
  
    return sections;
  }
  
  function createField(key, property, isRequired) {
    const label = key.split('.').pop().replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  
    let fieldType = "text";
    if (property.type === "number") {
      fieldType = "number";
    } else if (property.type === "boolean") {
      fieldType = "checkbox";
    } else if (property.enum) {
      fieldType = "dropdown";
    } else if (key.toLowerCase().includes("address") || property.maxLength > 100) {
      fieldType = "textarea";
    }
  
    const validation = { required: isRequired };
    if (property.minLength !== undefined) validation.minLength = property.minLength;
    if (property.maxLength !== undefined) validation.maxLength = property.maxLength;
    if (property.pattern !== undefined) validation.pattern = new RegExp(property.pattern);
    if (property.minimum !== undefined) validation.min = property.minimum;
    if (property.maximum !== undefined) validation.max = property.maximum;
  
    if (key.toLowerCase().includes("mobile") || key.toLowerCase().includes("phone")) {
      validation.pattern = /^\d{10}$/;
    }
  
    if (key.toLowerCase().includes("name") && !validation.pattern) {
      validation.pattern = /^[A-Za-z\s]+$/;
    }
  
    const field = {
      label,
      isMandatory: isRequired,
      key,
      type: fieldType,
      populators: {
        name: key,
        error: property.description || `${label} is required`,
        validation
      }
    };
  
    if (fieldType === "dropdown" && property.enum) {
      field.populators.options = property.enum.map(value => ({ code: value, name: value }));
      field.populators.optionsKey = "name";
    }
  
    // ✅ Ensure file upload components render
    if (
      key.toLowerCase().includes("upload") ||
      key.toLowerCase().includes("document") ||
      key.toLowerCase().includes("picture")
    ) {
      if (key.toLowerCase().endsWith("type")) {
        field.type = "dropdown";
        field.populators.options = [
          { code: "documentUpload", name: "Document Upload" },
          { code: "photo", name: "Photo" }
        ];
        field.populators.defaultValue = "photo";
      } else {
        field.type = "file";
      }
    }
  
    return field;
  }
  
  function createArrayField(key, property, isRequired) {
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    return {
      isMandatory: isRequired,
      key,
      type: "component",
      component: `${label.replace(/\s/g, '')}Component`,
      withoutLabel: true,
      populators: {
        name: key,
        error: property.description || `Select at least ${property.minItems || 1} ${label}`,
        required: isRequired,
        isMulti: true,
        optionsKey: "name"
      }
    };
  }
  
  
  