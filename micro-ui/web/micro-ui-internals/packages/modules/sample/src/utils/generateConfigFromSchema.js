export const generateConfigFromSchema = (schema) => {
    const config = [];
    const section = {
      head: schema.title || "Auto Form",
      body: [],
    };
  
    const requiredFields = schema.required || [];
    const properties = schema.properties || {};
  
    const processField = (key, prop, parentKey = null, parentRequired = []) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      const isRequired = parentRequired.includes(key) || requiredFields.includes(key);
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
  
      // Skip config property as it's used for form behavior, not a visible field
      if (key === "config") return;
  
      if (prop.type === "object") {
        // If it's the pictureUpload object, handle it specially
        if (key === "pictureUpload") {
          section.body.push({
            label: "Picture Upload",
            isMandatory: isRequired,
            type: "upload",
            key: fullKey,
            disable: false,
            populators: {
              name: fullKey,
              accept: "image/*",
              multiple: false,
            },
          });
        } else {
          // For other objects like complaintLocation
          const nestedFields = prop.properties || {};
          const nestedRequired = prop.required || [];
          
          // Add a section header
          section.body.push({
            type: "heading",
            label: label,
            key: `${fullKey}-header`,
          });
          
          // Process each field in the object
          Object.entries(nestedFields).forEach(([nestedKey, nestedProp]) =>
            processField(nestedKey, nestedProp, fullKey, nestedRequired)
          );
        }
      } else if (prop.type === "array" && prop.items?.type === "object") {
        // For arrays of objects like complaintType
        const items = prop.items;
        const itemRequired = items.required || [];
        
        // Add a section header
        section.body.push({
          type: "heading",
          label: label,
          key: `${fullKey}-header`,
        });
        
        // Process each field in the array item
        Object.entries(items.properties || {}).forEach(([itemKey, itemProp]) => {
          const itemFullKey = `${fullKey}[0].${itemKey}`;
          section.body.push({
            label: itemKey.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()),
            isMandatory: itemRequired.includes(itemKey),
            key: itemFullKey,
            type:
              itemProp.enum?.length > 0
                ? "dropdown"
                : itemProp.type === "boolean"
                ? "checkbox"
                : itemProp.type === "number"
                ? "number"
                : "text",
            disable: false,
            populators: {
              name: itemFullKey,
              error: itemRequired.includes(itemKey) ? "Required" : "",
            },
          });
        });
      } else {
        // Handle primitive types
        const field = {
          label: label,
          isMandatory: isRequired,
          key: fullKey,
          type:
            prop.enum?.length > 0
              ? "dropdown"
              : prop.type === "boolean"
              ? "checkbox"
              : prop.type === "number"
              ? "number"
              : "text",
          disable: false,
          populators: {
            name: fullKey,
            error: isRequired ? "Required" : "",
          },
        };
  
        // Add validation
        if (prop.pattern || prop.minLength || prop.maxLength) {
          field.populators.validation = {};
          
          if (prop.pattern) {
            field.populators.validation.pattern = new RegExp(prop.pattern);
          }
          
          if (prop.minLength !== undefined) {
            field.populators.validation.minLength = prop.minLength;
          }
          
          if (prop.maxLength !== undefined) {
            field.populators.validation.maxLength = prop.maxLength;
          }
        }
  
        // Add options for enums
        if (prop.enum?.length > 0) {
          field.populators.options = prop.enum.map(option => ({
            code: option,
            name: option,
          }));
        }
  
        section.body.push(field);
      }
    };
  
    // Process all properties except config
    for (const key in properties) {
      processField(key, properties[key]);
    }
  
    config.push(section);
    return config;
  };
  
  // Helper function to transform form data for API submission
  export const transformFormDataForAPI = (formData, tenantId) => {
    // Create a deep copy of the form data
    const processedData = {};
    
    // Process nested fields from flat structure
    Object.keys(formData).forEach(key => {
      const parts = key.split('.');
      let current = processedData;
      
      // Handle nested path
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        
        // Handle array notation like "complaintType[0].code"
        if (part.includes('[')) {
          const arrayName = part.split('[')[0];
          const index = parseInt(part.split('[')[1].split(']')[0]);
          
          current[arrayName] = current[arrayName] || [];
          current[arrayName][index] = current[arrayName][index] || {};
          current = current[arrayName][index];
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      }
      
      // Set the value at the last part of the path
      const lastPart = parts[parts.length - 1];
      current[lastPart] = formData[key];
    });
    
    // Clean up arrays (remove empty slots)
    Object.keys(processedData).forEach(key => {
      if (Array.isArray(processedData[key])) {
        processedData[key] = processedData[key].filter(item => item && typeof item === 'object');
      }
    });
    
    // Add default values if not present
    if (!processedData.config) {
      processedData.config = {
        isAddress: true,
        isStepper: true,
      };
    }
    
    if (!processedData.pictureUpload) {
      processedData.pictureUpload = {
        type: "documentUpload",
      };
    }
    
    // Create the final API payload structure
    return {
      Mdms: {
        tenantId,
        schemaCode: "Assignment.PGRAPPLY",
        uniqueIdentifier: null,
        data: processedData,
        isActive: true
      },
      RequestInfo: {
        apiId: "Rainmaker",
        authToken: Digit.UserService.getUser().accessToken,
        userInfo: Digit.UserService.getUser().info,
        msgId: `${Date.now()}|en_IN`,
        plainAccessRequest: {}
      }
    };
  };