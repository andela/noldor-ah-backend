import hashObject from 'crypto';
import models from '../db/models/index';

const { User } = models;

/**
 * @class {Ratings}
 * @description { }
 * @description { }
 */
class Update {
  /**
   * @description { cgenerate an md5 hash}
   * @param { number } hashKey
   * @returns { object } hash
   */
  static hashGenerator(hashKey) {
    const hash = hashObject.createHash('sha256').update(hashKey).digest('hex');
    return hash;
  }

  /**
   * @description { check if a user is signed in }
   * @param { object } mailOption object
   * @param { object } hash object
   * @returns { object } updateHash
   */
  static updateUserDetails(mailOption) {
    const hash = Update.hashGenerator(mailOption.to);
    const updateHash = User.update({
      emailVerificationHash: hash
    }, {
      where: {
        email: mailOption.to
      }
    });
    return updateHash;
  }

  /**
   * @description { Update column for tests }
   * @param { string } field string
   * @returns { object } updateHash
   */
  static updateUserDetailsForTest(field) {
    User.update({
      confirmEmail: false
    }, {
      where: {
        id: field
      }
    });
    // return update;
  }
}

export default Update;
