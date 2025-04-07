import React from "react";
import MyForm from "../../components/MyForm";
import assignmentSchema from "../../schemas/assignmentSchema"; // Assuming the schema is in a separate file

const SchemaFormPage = () => {
  return (
    <div>
      <h1>Create Complaint</h1>
      <MyForm schema={assignmentSchema} />
    </div>
  );
};

export default SchemaFormPage;
