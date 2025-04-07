export const transformData = (data) => {
    return {
      Complaint: {
        tenantId: "pg.citya",
        name: {
          givenName: data.citizenName,
        },
        mobileNumber: data.citizenMobileNumber,
        address: [
          {
            tenantId: "pg.citya",
            pincode: data.complaintLocation.pincode,
            city: data.complaintLocation.city,
            street: data.complaintLocation.address,
            landmark: data.complaintLocation.landmark,
            type: "COMPLAINT",
          },
        ],
        complaintDetails: [
          {
            code: data.complaintType[0].code,
            name: data.complaintType[0].name,
          },
        ],
      },
    };
  };
  