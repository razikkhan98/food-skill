const { constants } = require("../constants");

exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      res.status(statusCode).json({
        title: "Error",
        message: "An unexpected error occurred.",
        stackTrace: err.stack,
      });

      break;
  }
};

// const { constants } = require("../constants");

// exports.errorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode ? res.statusCode : 500;

//     res.status(statusCode);

//     switch (statusCode) {
//         case constants.VALIDATION_ERROR:
//             res.json({
//                 title: "Validation Error",
//                 message: err.message,
//                 stackTrace: process.env.NODE_ENV === 'development' ? err.stack : {}
//             });
//             break;

//         case constants.NOT_FOUND:
//             res.json({
//                 title: "Not Found",
//                 message: err.message,
//                 stackTrace: process.env.NODE_ENV === 'development' ? err.stack : {}
//             });
//             break;

//         case constants.UNAUTHORIZED:
//             res.json({
//                 title: "Unauthorized",
//                 message: err.message,
//                 stackTrace: process.env.NODE_ENV === 'development' ? err.stack : {}
//             });
//             break;

//         case constants.FORBIDDEN:
//             res.json({
//                 title: "Forbidden",
//                 message: err.message,
//                 stackTrace: process.env.NODE_ENV === 'development' ? err.stack : {}
//             });
//             break;

//         case constants.SERVER_ERROR:
//             res.json({
//                 title: "Server Error",
//                 message: err.message,
//                 stackTrace: process.env.NODE_ENV === 'development' ? err.stack : {}
//             });
//             break;

//         default:
//             res.json({
//                 title: "Error",
//                 message: "An unexpected error occurred.",
//                 stackTrace: process.env.NODE_ENV === 'development' ? err.stack : {}
//             });
//             break;
//     }
// };

// const { constants } = require("../constants");

// exports.errorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

//     res.status(statusCode);

//     // Log the error stack trace for development
//     const isDevelopment = process.env.NODE_ENV === 'development';

//     res.json({
//         title: getErrorTitle(statusCode),
//         message: err.message || "An unexpected error occurred.",
//         stackTrace: isDevelopment ? err.stack : {}
//     });
// };

// // Helper function to map status codes to titles
// function getErrorTitle(statusCode) {
//     switch (statusCode) {
//         case constants.VALIDATION_ERROR:
//             return "Validation Error";
//         case constants.NOT_FOUND:
//             return "Not Found";
//         case constants.UNAUTHORIZED:
//             return "Unauthorized";
//         case constants.FORBIDDEN:
//             return "Forbidden";
//         case constants.SERVER_ERROR:
//             return "Server Error";
//         default:
//             return "Error";
//     }
// }
