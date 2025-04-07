import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { FormComposerV2, HeaderComponent, Toast } from "@egovernments/digit-ui-components";
import { newConfig } from "../../configs/NewConfiggg/NewConfigg"
import { transformHRMSCreateData } from "../../utils/createUtils";

const SSCreate = () => {

  const onSubmit = async (data) => {
    console.log(data, "data"); // Debug log of submitted form data
  };

  const { t }=useTranslation();
  
  return (
    <div> 
      <FormComposerV2
        label={t("SUBMIT_BUTTON")}
        config={newConfig.map((config) => ({
          ...config,
        }))}
        defaultValues={{}} // Default values for form fields
        onFormValueChange={(setValue, formData, formState, reset, setError, clearErrors, trigger, getValues) => {
          console.log(formData, "formData"); // Debug log when form values change
        }}
        onSubmit={(data) => onSubmit(data)} // Handle form submission
        fieldStyle={{ marginRight: 0 }}
      />
    </div>
   
  );
};

export default SSCreate;
