/**
 * Converts form data to the Mdms object format
 * @param {Object} formData - The collected form data
 * @param {String} tenantId - Tenant ID (default: "dev")
 * @param {String} schemaCode - Schema code for the form (default: "Assignment.PGRAPPLY")
 * @return {Object} - The Mdms object
 */
export const formDataToMdms = (formData, tenantId = "dev", schemaCode = "Assignment.PGRAPPLY") => {
    if (!formData || typeof formData !== 'object') {
      throw new Error('Invalid form data provided');
    }
    
    // Transform the form data to ensure correct types and structure
    const transformedData = transformFormData(formData);
    
    // Create the Mdms object
    const mdms = {
      "Mdms": {
        "tenantId": tenantId,
        "schemaCode": schemaCode,
        "uniqueIdentifier": null,
        "data": transformedData,
        "isActive": true
      }
    };
  
    return mdms;
  };
  
  /**
   * Transforms form data to ensure correct types and structure
   * @param {Object} rawFormData - Raw form data from the form
   * @return {Object} - Transformed form data
   */
  function transformFormData(rawFormData) {
    // Clone the data to avoid modifying the original
    const formData = { ...rawFormData };
    
    // Ensure config exists
    if (!formData.config) {
      formData.config = { isAddress: true, isStepper: true };
    }
    
    // Convert any string numbers to actual numbers
    if (formData.citizenMobileNumber && typeof formData.citizenMobileNumber === 'string') {
      formData.citizenMobileNumber = Number(formData.citizenMobileNumber);
    }
    
    if (formData.complaintLocation?.pincode && typeof formData.complaintLocation.pincode === 'string') {
      formData.complaintLocation.pincode = Number(formData.complaintLocation.pincode);
    }
    
    // Ensure complaint type is properly formatted as an array of objects
    if (formData.complaintType && !Array.isArray(formData.complaintType)) {
      formData.complaintType = [formData.complaintType];
    }
    
    // Clean up complaint type objects - keep only code and name properties
    if (Array.isArray(formData.complaintType)) {
      formData.complaintType = formData.complaintType.map(item => {
        return { 
          code: item.code || '', 
          name: item.name || '' 
        };
      });
    }
    
    // Ensure picture upload has correct structure
    if (formData.pictureUpload) {
      if (typeof formData.pictureUpload.type === 'object' && formData.pictureUpload.type?.code) {
        // Convert from object with code to simple string
        formData.pictureUpload = { 
          type: formData.pictureUpload.type.code
        };
      } else if (!formData.pictureUpload.type) {
        // Provide default value if missing
        formData.pictureUpload = { 
          type: "documentUpload" 
        };
      }
    }
    
    return formData;
  }
  
  /**
   * Example usage:
   * 
   * // Form data collected from your form
   * const formData = {
   *   citizenName: "John Doe",
   *   citizenMobileNumber: "9876543210",
   *   complaintType: [{ code: "garbage", name: "Garbage Collection", key: 1 }],
   *   complaintLocation: {
   *     address: "123 Main Street",
   *     city: "Bangalore",
   *     landmark: "Near Park",
   *     pincode: "560001"
   *   },
   *   pictureUpload: {
   *     type: { code: "documentUpload", name: "documentUpload" }
   *   }
   * };
   * 
   * const mdmsObject = formDataToMdms(formData);
   * console.log(mdmsObject);
   */