import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormComposerV2, HeaderComponent, Toast } from "@egovernments/digit-ui-components";
import { TransformApplyConfigCreateData } from "../../utils/createUtils";
import schema from "../../schemas/schema.json"


const PageApply = () => {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(null);
  const tenantId = Digit.ULBService.getCurrentTenantId();

  //   const { mutateAsync } = Digit.Hooks.useCustomAPIMutationHook({
  //     url: "/egov-mdms-service/v2/_create/Assignment.PGRAPPLY",
  //     config: {
  //       headers: {
  //         "Content-Type": "application/json",
  //         accept: "application/json",
  //       },
  //     },
  //   });
  const reqCreate = {
    url: `/egov-mdms-service/v2/_create/Assignment.PGRAPPLY`, // API endpoint for creating an individual
    params: {},
    body: {},
    config: {
      enable: true, // Enables the API call
    },
  };
  const mutation = Digit.Hooks.useCustomAPIMutationHook(reqCreate);
  const onSubmit = async (data) => {
    console.log(data, "data");
    await mutation.mutate({
      url: `/egov-mdms-service/v2/_create/Assignment.PGRAPPLY`,
      params: { tenantId }, // Include tenant ID in API request
      body: TransformApplyConfigCreateData(data), // Transform data before sending to API
      config: {
        enable: true,
      },
    });
  };
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <HeaderComponent>{t("Register New Complaint")}</HeaderComponent>
      <FormComposerV2
        label={t("Submit Complaint")}
        config={applyConfig.map((config) => ({
          ...config,
        }))}
        defaultValues={{
          "pictureUpload.type": "photo",
        }}
        onFormValueChange={(setValue, formData, formState, reset, setError, clearErrors, trigger, getValues) => {
          console.log(formData, "formData"); // Debug log when form values change
        }}
        onSubmit={(data) => onSubmit(data)}
        // onSubmit={onSubmit}
        fieldStyle={{ marginRight: 0 }}
      />
      {/* {showToast && (
        <Toast
          label={showToast.label}
          type={showToast.type}
          onClose={() => setShowToast(null)}
        />
      )} */}
    </div>
  );
};
export default PageApply;