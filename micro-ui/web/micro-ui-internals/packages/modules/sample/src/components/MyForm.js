import React from "react";
import { useForm } from "react-hook-form";
import { transformData } from "../utils/transformData";// Assuming transformData is used here
import assignmentSchema from "../schemas/assignmentSchema";

const MyForm = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const transformedData = transformData(data);
    console.log("Transformed Data: ", transformedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(schema.properties).map((field) => {
        const fieldSchema = schema.properties[field];

        // TextField for string type
        if (fieldSchema.type === "string") {
          return (
            <div key={field}>
              <label>{fieldSchema.description}</label>
              <input
                type="text"
                {...register(field, { required: true })}
                placeholder={fieldSchema.description}
              />
              {errors[field] && <span>{fieldSchema.description} is required</span>}
            </div>
          );
        }

        // Number field (for fields like Phone Number, Pincode)
        if (fieldSchema.type === "number") {
          return (
            <div key={field}>
              <label>{fieldSchema.description}</label>
              <input
                type="number"
                {...register(field, { required: true })}
                placeholder={fieldSchema.description}
              />
              {errors[field] && <span>{fieldSchema.description} is required</span>}
            </div>
          );
        }

        // Dropdown (for enum or predefined lists)
        if (fieldSchema.type === "array" && fieldSchema.items && fieldSchema.items.enum) {
          return (
            <div key={field}>
              <label>{fieldSchema.description}</label>
              <select {...register(field, { required: true })}>
                <option value="">Select an option</option>
                {fieldSchema.items.enum.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors[field] && <span>{fieldSchema.description} is required</span>}
            </div>
          );
        }

        // DatePicker (for date fields)
        if (fieldSchema.type === "string" && fieldSchema.format === "date") {
          return (
            <div key={field}>
              <label>{fieldSchema.description}</label>
              <input
                type="date"
                {...register(field, { required: true })}
              />
              {errors[field] && <span>{fieldSchema.description} is required</span>}
            </div>
          );
        }

        return null;
      })}

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
