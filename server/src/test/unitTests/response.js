import chai from 'chai';
import sinon from 'sinon';
import HttpResponseHelper from '../../helpers/httpResponse';

const { stub, spy } = sinon;
chai.should();
describe('Response helper functions', () => {
  let status, json, res;
  beforeEach(() => {
    status = stub();
    json = spy();
    res = { json, status };
    status.returns(res);
  });
  describe('should return response object for good response', () => {
    beforeEach(() => HttpResponseHelper.goodResponse(res, 200, 'OK'));
    it('calls status with code 200', () => status.calledWith(200).should.be.ok);
    it('calls json with success: true', () => json.calledWith({
      success: true,
      message: 'OK'
    }).should.be.ok);
  });
  describe('should return response object for bad response', () => {
    beforeEach(() => HttpResponseHelper.badResponse(res, 404, 'can not be found'));
    it('calls status with code 404', () => status.calledWith(404).should.be.ok);
    it('calls json with success: false', () => json.calledWith({
      success: false,
      message: 'can not be found'
    }).should.be.ok);
  });
  describe('should return response object for bad response', () => {
    beforeEach(() => HttpResponseHelper.badResponse(res, 500, '', 'error message here'));
    it('calls status with code 500', () => status.calledWith(500).should.be.ok);
    it('calls json with success: false', () => json.calledWith({
      success: false,
      error: { message: 'error message here' }
    }).should.be.ok);
  });
});
