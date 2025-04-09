// import { Button, Dropdown, LabelFieldPair, TextInput, CustomSVG, Card, HeaderComponent } from "@egovernments/digit-ui-components";
// import React, { Fragment, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

// const AdditionalComplaintMy = ({ onSelect, ...props }) => {
//     const { t } = useTranslation();
   
//     const [documentData, setDocumentData] = useState([
//         {
//             key: 1,
//             code: "",
//             name: "",
//         },
//     ]);

//     // fn to update the code or name fields independently
//     const handleUpdateField = ({ fieldType, value, item }) => {
//         setDocumentData((prev) => {
//             return prev.map((i) => {
//                 if (i.key === item.key) {
//                     return {
//                         ...i,
//                         [fieldType]: value,
//                     };
//                 }
//                 return i;
//             });
//         });
//     };

//     //fn to add more field
//     const add = () => {
//         setDocumentData((prev) => [
//             ...prev,
//             {
//                 key: prev?.length + 1,
//                 code: "",
//                 name: "",
//             },
//         ]);
//     };

//     const deleteItem = (data) => {
//         const fil = documentData.filter((i) => i.key !== data.key);
//         const up = fil.map((item, index) => ({ ...item, key: index + 1 }));
//         setDocumentData(up);
//     };

//     useEffect(() => {
//         onSelect("complaintType", documentData); // to send back the updated data
//     }, [documentData]);

//     return (
//         <>
//             {documentData?.map((item, index) => (
//                 <Card key={item.key} type="secondary" style={{ marginBottom: "1.5rem", gap: "1.5rem" }}>
//                     {documentData?.length > 1 ? (
//                         <div className="delete-resource-icon" style={{ textAlign: "right" }} onClick={() => deleteItem(item, index)}>
//                             <CustomSVG.DustbinIcon />
//                         </div>
//                     ) : null}
//                     <LabelFieldPair removeMargin={true}>
//                         <HeaderComponent >
//                             <div >
//                                 <label >{`${t("CODE")}`}</label>
//                             </div>
//                         </HeaderComponent>
//                         <TextInput
//                             name="code"
//                             value={item.code}
//                             onChange={(event) => handleUpdateField({ fieldType: "code", value: event.target.value, item: item })}
//                         />
//                     </LabelFieldPair>
//                     <LabelFieldPair removeMargin={true}>
//                         <HeaderComponent>
//                             <div >
//                                 <label >{`${t("Name")}`}</label>
//                             </div>
//                         </HeaderComponent>
//                             <TextInput
//                                 name="name"
//                                 value={item.name}
//                                 onChange={(event) => handleUpdateField({ fieldType: "name", value: event.target.value, item: item })}
//                             />
//                     </LabelFieldPair>
//                 </Card>
//             ))}
//             <Button variation="secondary" label={t(`Add more`)} className={""} icon={"AddIconNew"} onClick={add} style={{ marginLeft: "auto" }} />
//         </>
//     );
// };

// export default AdditionalComplaintMy;






// // import {
// //     Button,
// //     Dropdown,
// //     LabelFieldPair,
// //     TextInput,
// //     CustomSVG,
// //     Card,
// //     HeaderComponent
// //   } from "@egovernments/digit-ui-components";
// //   import React, { useEffect, useState } from "react";
// //   import { useTranslation } from "react-i18next";
  
// //   const AdditionalComplaintMy = ({ onSelect, ...props }) => {
// //     const { t } = useTranslation();
  
// //     const [documentData, setDocumentData] = useState([
// //       {
// //         key: 1,
// //         code: "",
// //         name: "",
// //       },
// //     ]);
  
// //     const handleUpdateField = ({ fieldType, value, item }) => {
// //       setDocumentData((prev) =>
// //         prev.map((i) =>
// //           i.key === item.key ? { ...i, [fieldType]: value } : i
// //         )
// //       );
// //     };
  
// //     const add = () => {
// //       setDocumentData((prev) => [
// //         ...prev,
// //         {
// //           key: prev?.length + 1,
// //           code: "",
// //           name: "",
// //         },
// //       ]);
// //     };
  
// //     const deleteItem = (data) => {
// //       const filtered = documentData.filter((i) => i.key !== data.key);
// //       const updated = filtered.map((item, index) => ({ ...item, key: index + 1 }));
// //       setDocumentData(updated);
// //     };
  
// //     useEffect(() => {
// //       onSelect("complaintType", documentData);
// //     }, [documentData]);
  
// //     return (
// //       <>
// //         {documentData?.map((item, index) => (
// //           <Card
// //             key={item.key}
// //             type="secondary"
// //             style={{ marginBottom: "1.5rem", padding: "1.5rem", position: "relative" }}
// //           >
// //             {documentData?.length > 1 && (
// //               <div
// //                 style={{
// //                   position: "absolute",
// //                   top: "1rem",
// //                   right: "1rem",
// //                   cursor: "pointer"
// //                 }}
// //                 onClick={() => deleteItem(item, index)}
// //               >
// //                 <CustomSVG.DustbinIcon />
// //               </div>
// //             )}
  
// //             <div style={{ marginBottom: "1rem" }}>
// //               <HeaderComponent>{`${t("Complaint Type #")}${item.key}`}</HeaderComponent>
// //             </div>
  
// //             <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
// //               <LabelFieldPair>
// //                 <label>{t("CODE")}</label>
// //                 <TextInput
// //                   name="code"
// //                   value={item.code}
// //                   onChange={(e) =>
// //                     handleUpdateField({ fieldType: "code", value: e.target.value, item })
// //                   }
// //                 />
// //               </LabelFieldPair>
  
// //               <LabelFieldPair>
// //                 <label>{t("Name")}</label>
// //                 <TextInput
// //                   name="name"
// //                   value={item.name}
// //                   onChange={(e) =>
// //                     handleUpdateField({ fieldType: "name", value: e.target.value, item })
// //                   }
// //                 />
// //               </LabelFieldPair>
// //             </div>
// //           </Card>
// //         ))}
  
// //         <div style={{ textAlign: "right", marginTop: "1.5rem" }}>
// //           <Button
// //             variation="secondary"
// //             label={t("Add more")}
// //             icon="AddIconNew"
// //             onClick={add}
// //           />
// //         </div>
// //       </>
// //     );
// //   };
  
// //   export default AdditionalComplaintMy;
  
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, LabelFieldPair, Dropdown, HeaderComponent, TextInput } from "@egovernments/digit-ui-components";

const AdditionalComplaintMy = ({ onSelect }) => {
  const { t } = useTranslation();

  // Hardcoded complaint options
  const complaintOptions = [
    { name: "Water Leakage", code: "WATER_LEAKAGE" },
    { name: "Road Damage", code: "ROAD_DAMAGE" },
    { name: "Garbage Issue", code: "GARBAGE_ISSUE" },
  ];

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    if (selectedComplaint) {
      onSelect("complaintType", selectedComplaint);
    }
  }, [selectedComplaint]);

  return (
    <Card style={{ marginBottom: "1.5rem" }}>
      <LabelFieldPair>
        <HeaderComponent>
          <label>{t("Complaint Type")}</label>
        </HeaderComponent>
        <Dropdown
          t={t}
          option={complaintOptions}
          selected={selectedComplaint}
          select={setSelectedComplaint}
          optionKey="name"
          placeholder={t("Select Complaint Type")}
        />
      </LabelFieldPair>

      {selectedComplaint && (
        <LabelFieldPair>
          <HeaderComponent>
            <label>{t("Complaint Code")}</label>
          </HeaderComponent>
          <TextInput name="code" value={selectedComplaint.code} disabled />
        </LabelFieldPair>
      )}
    </Card>
  );
};

export default AdditionalComplaintMy;

  