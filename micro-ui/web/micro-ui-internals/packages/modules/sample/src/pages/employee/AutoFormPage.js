// import React, { useState } from "react";
// import { FormComposerV2, HeaderComponent, Toast } from "@egovernments/digit-ui-components";
// import { useTranslation } from "react-i18next";
// import schema from "../../schemas/schema.json"
// import { schemaToConfig } from "../../utils/ConfigGenerator";
// import { formDataToMdms } from "../../utils/apiUtil";

// const AutoFormPage = () => {
//   const { t } = useTranslation();
//   const tenantId = Digit.ULBService.getCurrentTenantId();
//   console.log("fhbgyt")
//   const config=schemaToConfig(schema)// keep it in a single state
//   console.log(config)

//   const [showToast, setShowToast] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Default values for the form
//   const defaultValues = {
//     "config.isAddress": true,
//     "config.isStepper": true,
//     "pictureUpload.type": {
//       "code": "documentUpload",
//       "name": "documentUpload"
//   }
//   };

//   // Custom hook for API mutation
//   const reqCreate = {
//     url: `/egov-mdms-service/v2/_create/Assignment.PGRAPPLY`,
//     params: {},
//     body: {},
//     config: {
//       enabled: true,
//     },
//   };

//   const mutation = Digit.Hooks.useCustomAPIMutationHook(reqCreate);

//   // Form submission handler
  
//   const onSubmit = async (data) => {
//     console.log(data);
//     setIsSubmitting(true);
    
//     try {
//       // Transform form data to match API format
//       const payload = formDataToMdms(data, tenantId);
//       console.log(payload)
      
//       console.log("Submitting payload:", payload);
      
//       // Make the API call

//       //can send onSuccess (toasts) and onError calls

//       const response = await mutation.mutateAsync({
//         url: reqCreate.url,
//         params: { tenantId },
//         body: payload,
//         config: {
//           enabled: true, //if enabled false the api will not be called
//         },
//       });

//       console.log("API Success:", response);
//       setShowToast({ label: "Complaint submitted successfully!", type: "success" });
//     } catch (error) {
//       console.error("API Error:", error);
//       setShowToast({ label: "Submission failed: " + (error.message || "Unknown error"), type: "error" });
//     }
    
      
    
//     finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Form value change handler
//   const handleFormValueChange = (setValue, formData) => {
//     console.log("Form data:", formData);
    
//     // You can add conditional logic here if needed
//     // For example, to show/hide fields based on other values
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
//       <HeaderComponent>{t("Register Complaint")}</HeaderComponent>
      
//       <FormComposerV2
//         label={isSubmitting ? t("Submitting...") : t("Submit")}
//         config={config}
//         defaultValues={defaultValues}
//       //  onFormValueChange={handleFormValueChange}
//         onSubmit={onSubmit}
//         fieldStyle={{ marginRight: 0 }}
//         disabled={isSubmitting}
//       />
      
//       {showToast && (
//         <Toast
//           label={showToast.label}
//           type={showToast.type}
//           onClose={() => setShowToast(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default AutoFormPage;




import React, { useState } from "react";
import { FormComposerV2, HeaderComponent, Toast } from "@egovernments/digit-ui-components";
import { useTranslation } from "react-i18next";
import schema from "../../schemas/schema.json";
import { schemaToConfig } from "../../utils/ConfigGenerator";
import { formDataToMdms } from "../../utils/apiUtil";

const AutoFormPage = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const config = schemaToConfig(schema);

  const [showToast, setShowToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(Date.now()); // 🔑 For resetting the form

  const defaultValues = {
    "config.isAddress": true,
    "config.isStepper": true,
    "pictureUpload.type": {
      "code": "documentUpload",
      "name": "documentUpload"
    }
  };

  const reqCreate = {
    url: `/egov-mdms-service/v2/_create/Assignment.PGRAPPLY`,
    params: {},
    body: {},
    config: {
      enabled: true,
    },
  };

  const mutation = Digit.Hooks.useCustomAPIMutationHook(reqCreate);

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data);
    setIsSubmitting(true);

    try {
      const payload = formDataToMdms(data, tenantId);
      console.log("Transformed payload:", payload);

      const response = await mutation.mutateAsync({
        url: reqCreate.url,
        params: { tenantId },
        body: payload,
        config: {
          enabled: true,
        },
      });

      console.log("API Success:", response);
      setShowToast({ label: "Complaint submitted successfully!", type: "success" });

      // ✅ Reset form by changing key
      setFormKey(Date.now());

    } catch (error) {
      console.error("API Error:", error);
      setShowToast({ label: "Submission failed: " + (error.message || "Unknown error"), type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <HeaderComponent className="digit-inbox-search-composer-header" styles={{ marginBottom: "1.5rem" }}>
        {t("New_Registration")}
      </HeaderComponent>

      <FormComposerV2
        key={formKey} // 🔁 Forces re-render after submission
        label={isSubmitting ? t("Submitting...") : t("Submit")}
        config={config}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        fieldStyle={{ marginRight: 0 }}
        disabled={isSubmitting}
      />

      {showToast && (
        <Toast
          label={showToast.label}
          type={showToast.type}
          onClose={() => setShowToast(null)}
        />
      )}
    </div>
  );
};

export default AutoFormPage;
