import chaiHttp from 'chai-http';
import chai from 'chai';
import fileSystem from 'fs';
import root from 'app-root-path';
import logger from '../../helpers/logger';


const { expect } = chai;
chai.use(chaiHttp);

describe('Unit Testing the file logger function', () => {
  it('should return an info file size that is a number', async () => {
    try {
      logger.info('This is just an info logger test');
      const fileSize = fileSystem.statSync(`${root}/logs/info.log`).size;
      expect(fileSize).to.be.a('number');
    } catch (error) {
      throw (error);
    }
  });
  it('should return an error file size that is a number', async () => {
    try {
      logger.error('This is just an error logger test');
      const fileSize = fileSystem.statSync(`${root}/logs/error.log`).size;
      expect(fileSize).to.be.a('number');
    } catch (error) {
      throw (error);
    }
  });
  it('should return an info file size greater than 0', async () => {
    try {
      logger.info('This is just an info logger test');
      const fileSize = fileSystem.statSync(`${root}/logs/info.log`).size;
      expect(fileSize).to.be.greaterThan(0);
    } catch (error) {
      throw (error);
    }
  });
  it('should return an error file size greater than 0', async () => {
    try {
      logger.error('This is just an error logger test');
      const fileSize = fileSystem.statSync(`${root}/logs/error.log`).size;
      expect(fileSize).to.be.greaterThan(0);
    } catch (error) {
      throw (error);
    }
  });
  it('should return true 0 for % 1', async () => {
    try {
      logger.info('This is just an info logger test');
      const fileSize = fileSystem.statSync(`${root}/logs/info.log`).size;
      expect(fileSize % 1).to.be.equal(0);
    } catch (error) {
      throw (error);
    }
  });
  it('should return true 0 for % 1', async () => {
    try {
      logger.error('This is just an error logger test');
      const fileSize = fileSystem.statSync(`${root}/logs/error.log`).size;
      expect(fileSize % 1).to.be.equal(0);
    } catch (error) {
      throw (error);
    }
  });
});
