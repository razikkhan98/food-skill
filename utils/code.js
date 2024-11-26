// // utils/generateCode.js
// function generateCode(role, mobileNum) {
//     const rolePrefix = role.slice(0, 2).toUpperCase(); // Take the first two characters of the role and convert to uppercase
//     const fullMobile = String(mobileNum); // Convert mobile number to a string
//     return `${rolePrefix}${fullMobile}`;
//   }
  
//   module.exports = generateCode;



  // utils/generateCode.js
function generateCode(role, mobileNum, role_id) {
  const rolePrefix = role.slice(0, 2).toUpperCase(); // Take the first two characters of the role and convert to uppercase
  const fullMobile = String(mobileNum); // Convert mobile number to a string
  const roleIdPart = String(role_id); // Convert role_id to a string, if it’s not already

  // Combine role prefix, role_id, and full mobile number
  return `${roleIdPart}${rolePrefix}${fullMobile}`;
}

module.exports = generateCode;
