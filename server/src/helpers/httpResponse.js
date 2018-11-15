/**
 * @description { return response helper}
 */
class HttpResponseHelper {
  /**
     * @description { good response }
     * @param { object } response
     * @param { number } statusCode
     * @param { string } message
     * @param { object } data
     * @return { * } Json
     *
     */
  static goodResponse(response, statusCode, message, data) {
    const responseBody = {
      success: true,
    };
    if (message !== '') {
      responseBody.message = message;
    }
    if (data) {
      responseBody.data = data;
    }
    return response.status(statusCode).json(responseBody);
  }

  /**
     * @description { bad response helper }
     * @param { object } response
     * @param { number } statusCode
     * @param { string } message
     * @param { object } errorMessage
     * @return { * } Json
     *
     */
  static badResponse(response, statusCode, message, errorMessage) {
    const responseBody = {
      success: false,
    };
    if (message !== '') {
      responseBody.message = message;
    }
    if (errorMessage) {
      responseBody.error = { message: errorMessage };
    }
    return response.status(statusCode).json(responseBody);
  }
}

export default HttpResponseHelper;
