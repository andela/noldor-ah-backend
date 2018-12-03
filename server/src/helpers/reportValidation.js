import HttpResponseHelper from './httpResponse';

const { badResponse } = HttpResponseHelper;

/**
 * @class{ ReportValidation }
 * @description { validates inputs for reports }
 */
class ReportValidation {
  /**
         * @description { post report validation }
         * @param { object } req
         * @param { object } res
         * @return { string } JSON
         */
  static postValidation(req, res) {
    const values = req.body;
    const errors = {};
    const required = ['reportType', 'reportDetail'];
    let pass = true;

    for (let i = 0; i < required.length; i += 1) {
      if (!values[required[i]]) {
        errors[required[i]] = `${required[i]} is required`;
        pass = false;
      }
      if (values[required[i]] === '') {
        errors[required[i]] = `${required[i]} can not be an empty field`;
        pass = false;
      }
    }
    if (values.reportDetail && values.reportDetail !== ''
    && values.reportDetail.trim().length < 15) {
      errors.status = 'it must be greater than 15 characters';
      pass = false;
    }


    if (pass === false) {
      return badResponse(res, 400, '', errors);
    }
    return null;
  }

  /**
 *
 * @param { object } req
 * @param { object } res
 * @returns { * } null/string
 */
  static updateValidation(req, res) {
    const values = req.body;
    const error = {};
    let pass = true;
    if (!values.comment) {
      error.status = 'comment is required';
      pass = false;
    }
    if (values.comment === '') {
      error.status = 'comment can not be an empty field';
      pass = false;
    }
    if (values.comment && values.comment !== '' && values.comment.trim().length < 10) {
      error.status = 'it must be greater than 10 characters';
      pass = false;
    }


    if (pass === false) {
      return badResponse(res, 400, '', error);
    }
    return null;
  }
}

export default ReportValidation;
