export const showToast = (res) => {
  alert(res?.message || "Sorry, An error occured");
};

export const status = (number) => {
  let status = "";
  if (number === 0) {
    status = "Pending";
  } else if (number === 1) {
    status = "Active";
  } else if (number === 2) {
    status = "Inactive";
  }
  return status;
};

export const nationality = (value) => {
  if (value == 0) {
    return "Nigeria";
  } else if (value == 1) {
    return "Foreigner";
  }
};
