import ApiResponse from "../utils/ApiResponse.js";

export default function errorMiddleware(err, req, res, next) {
    console.error(err);
    return ApiResponse.error(res, err.message || 'Internal server error', err.statusCode || 500);
}
