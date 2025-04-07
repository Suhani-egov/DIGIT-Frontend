// pages/CreateComplaintPage.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import { FormComposerV2 } from "@egovernments/digit-ui-components";
import { CreateComplaintConfig } from "../../configs/NewConfiggg/CreateComplaintConfig";

const CreateComplaintPage = () => {
  const { t } = useTranslation();

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    // Submit to your API here
  };

  return (
    <div>
      <FormComposerV2
        label={t("SUBMIT")}
        config={CreateComplaintConfig.map((section) => ({
          ...section,
        }))}
        defaultValues={{}}
        onFormValueChange={(setValue, formData) => {
          console.log("Live Form Data:", formData);
        }}
        onSubmit={onSubmit}
        fieldStyle={{ marginRight: 0 }}
      />
    </div>
  );
};

export default CreateComplaintPage;
