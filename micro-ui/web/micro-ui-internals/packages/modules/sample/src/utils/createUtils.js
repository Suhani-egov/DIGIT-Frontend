export const transformIndividualCreateData = (data)=>{
    return {
        Individual: {
          tenantId: "pg.citya",
          name: {
            givenName: data.applicantname,
          },
          dateOfBirth: null,
          gender: data?.genders?.code,
          mobileNumber: data.phno,
          address: [
            {
              tenantId: "pg.citya",
              pincode: data.pincode,
              city: data.city,
              street: data.street,
              doorNo: data.doorno,
              "locality":
              {
                "code" : data?.locality?.code||"SUN01",
              },
              landmark: data.landmark,
              "type": "PERMANENT"
            },
          ],
          identifiers: null,
          skills: [
              {
                  "type": "DRIVING",
                  "level": "UNSKILLED"
              }
          ],
          "photograph": null,
          additionalFields: {
              "fields": [
                  ...data?.additionalDetails,
                  {
                      "key": "EMPLOYER",
                      "value": "ULB"
                  }
              ]
          },
          isSystemUser: null,
          userDetails: {
              "username": "8821243212",
              "tenantId": "pg.citya",
              "roles": [
                  {
                      "code": "SANITATION_WORKER",
                      "tenantId": "pg.citya"
                  }
              ],
              "type": "CITIZEN"
          },
      },
    }

}

export const transformHRMSCreateData = (data)=>{
    return {
      "Employees": [
        {
            // "id": 9603,
            // "uuid": "52047dac-f39e-48f7-9cc1-06d1481c65a6",
            // "code": "Test_L2",
            "employeeStatus": "EMPLOYED",
            "employeeType": "PERMANENT",
            "dateOfAppointment": 1704067200000,
            "jurisdictions": [
                {
                    // "id": "65718bab-5f8f-4ab5-a16d-42a3b138d110",
                    "hierarchy": "ADMIN",
                    "boundary": "pg.amhara",
                    "boundaryType": "City",
                    "tenantId": "pg.amhara",
                    // "auditDetails": {
                    //     "createdBy": "c16de636-688b-4b42-a123-2d3aaa27bdd8",
                    //     "createdDate": 1737530732383,
                    //     "lastModifiedBy": null,
                    //     "lastModifiedDate": 0
                    // },
                    "isActive": true
                }
            ],
            "assignments": [
                {
                    // "id": "8e6a3113-fd4c-4b86-81ac-a826d8e604fe",
                    "position": 6629,
                    "designation": "AO",
                    "department": "DEPT_13",
                    "fromDate": 1735689600000,
                    "toDate": null,
                    "govtOrderNumber": null,
                    "tenantid": "pg.amhara",
                    "reportingTo": null,
                    // "auditDetails": {
                    //     "createdBy": "c16de636-688b-4b42-a123-2d3aaa27bdd8",
                    //     "createdDate": 1737530732383,
                    //     "lastModifiedBy": null,
                    //     "lastModifiedDate": 0
                    // },
                    "isHOD": false,
                    "isCurrentAssignment": true
                }
            ],
            "serviceHistory": [],
            "education": [],
            "tests": [],
            "tenantId": "pg.amhara",
            "documents": [],
            "deactivationDetails": [],
            "reactivationDetails": [],
            // "auditDetails": {
            //     "createdBy": "c16de636-688b-4b42-a123-2d3aaa27bdd8",
            //     "createdDate": 1737530732383,
            //     "lastModifiedBy": null,
            //     "lastModifiedDate": 0
            // },
            "reActivateEmployee": false,
            "user": {
                // "id": 9603,
                // "uuid": "52047dac-f39e-48f7-9cc1-06d1481c65a6",
                // "userName": "Test_L2",
                "password": null,
                "salutation": null,
                "name": data.applicantname,
                "gender": data?.genders?.code,
                "mobileNumber": data.phno,
                "emailId": "yunuomerdin@gmail.com",
                "altContactNumber": null,
                "pan": null,
                "aadhaarNumber": null,
                "permanentAddress": null,
                "permanentCity": null,
                "permanentPinCode": null,
                "correspondenceCity": null,
                "correspondencePinCode": null,
                "correspondenceAddress": "Ethiopia",
                "active": true,
                "dob": 946665000000,
                "pwdExpiryDate": 1745306732000,
                "locale": null,
                "type": "EMPLOYEE",
                "signature": null,
                "accountLocked": false,
                "roles": [
                    {
                        "name": "Employee",
                        "code": "EMPLOYEE",
                        "description": null,
                        "tenantId": "pg.amhara"
                    }
                ],
                "fatherOrHusbandName": null,
                "relationship": null,
                "bloodGroup": null,
                "identificationMark": null,
                "photo": null,
                "createdBy": "8829",
                "createdDate": 1737530732000,
                // "lastModifiedBy": "8829",
                // "lastModifiedDate": 1737816918000,
                "otpReference": null,
                "tenantId": "pg.amhara"
            },
            "isActive": true
        }
    ]
    }

}

export const TransformApplyConfigCreateData = (data) => {
    return {
      Mdms: {
        tenantId: "dev",
        schemaCode: "Assignment.PGRAPPLY",
        uniqueIdentifier: null,
        data: {
          config: {
            isAddress: true,
            isStepper: true,
          },
          complaintType: [
            {
              code: data.complaintType.code,
              name: data.complaintType.name,
            },
          ],
          complaintLocation: {
            city: data.complaintLocation.city,
            address: data.complaintLocation.address,
            pincode: parseInt(data.complaintLocation.pincode),
            landmark: data.complaintLocation.landmark,
          },
          citizenName: data.citizenName,
          pictureUpload: {
            type: "documentUpload",
          },
          citizenMobileNumber: parseInt(data.citizenMobileNumber),
        },
        isActive: true,
      },
      RequestInfo: {
        apiId: "Rainmaker",
        authToken: "b45d4ac9-7454-4e62-a508-540ddf880b77",
        userInfo: {
          id: 10543,
          uuid: "8a32a4ea-dc0b-465d-b45a-95577475b45d",
          userName: "MICROPLAN_ADMIN_DEV",
          name: "User Dev",
          mobileNumber: 7222611899,
          emailId: null,
          locale: null,
          type: "EMPLOYEE",
          roles: [
            {
              name: "Microplan Campaign integrator",
              code: "MICROPLAN_CAMPAIGN_INTEGRATOR",
              tenantId: "dev",
            },
            {
              name: "System Administrator",
              code: "SYSTEM_ADMINISTRATOR",
              tenantId: "dev",
            },
            {
              name: "Campaign Managers",
              code: "CAMPAIGN_MANAGER",
              tenantId: "dev",
            },
            {
              name: "Boundary Manager",
              code: "BOUNDARY_MANAGER",
              tenantId: "dev",
            },
            {
              name: "Localisation admin",
              code: "LOC_ADMIN",
              tenantId: "dev",
            },
            {
              name: "Campaign Admin",
              code: "CAMPAIGN_ADMIN",
              tenantId: "dev",
            },
            {
              name: "Microplan Admin",
              code: "MICROPLAN_ADMIN",
              tenantId: "dev",
            },
            {
              name: "MDMS ADMIN",
              code: "MDMS_ADMIN",
              tenantId: "dev",
            },
            {
              name: "HRMS Admin",
              code: "HRMS_ADMIN",
              tenantId: "dev",
            },
          ],
          active: true,
          tenantId: "dev",
          permanentCity: null,
        },
        msgId: "1743746958756|en_IN",
        plainAccessRequest: {},
      },
    };
  };