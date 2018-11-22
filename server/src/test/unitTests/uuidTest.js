import chai from 'chai';
import uuidCheck from '../../helpers/validParams';

const { expect } = chai;

describe('uuidCheck', () => {
  const isUuid = '38b0b34f-c1da-4643-aa66-42030047ceeb';
  const notUuid = '37uji-kujsgsbnwepol-3';

  const trueUuid = uuidCheck(isUuid);
  const falseUuid = uuidCheck(notUuid);

  it('Should return false if value is not a uid', (done) => {
    expect(falseUuid).to.equal(false);
    done();
  });
  it('Should return true if value is a uuid', (done) => {
    expect(trueUuid).to.equal(true);
    done();
  });
});
