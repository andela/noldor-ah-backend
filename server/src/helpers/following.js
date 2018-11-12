
import Models from '../db/models';

const { User } = Models;


/**
 * @class { FollowingHelper }
 * @description { Handles for like and unlike helpers }
 */
class FollowingHelper {
  /**
     * @description { Get Followers }
     * @param { string } followingName
     * @param { object } res
     * @return { object } JSON
     */
  static async getUserFollowing(followingName, res) {
    try {
      const user = await User.findOne({
        where: { username: followingName }
      });
      if (!user) {
        return null;
      }
      if (user) {
        const followers = await user.getFollowing({ attributes: ['username'] });

        return followers.map(x => x.username);
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * @description { Gets followings }
   * @param { string } followingName
   * @param { object } res
   * @return { object } JSON
   */
  static async getUserFollower(followingName, res) {
    try {
      const user = await User.findOne({
        where: { username: followingName }
      });
      if (!user) {
        return null;
      }
      if (user) {
        const followers = await user.getFollower({ attributes: ['username'] });

        return followers.map(x => x.username);
      }
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * @description { follow/unfollow a user }
   * @param { string } followingName
   * @param { string } followerId
   * @param { object } res
   * @return { object } JSON
   */
  static async postFollowing(followingName, followerId, res) {
    try {
      const following = await User.findOne({
        where: { username: followingName },
        attributes: ['id', 'username']
      });
      if (!following) {
        return 'notAUser';
      }
      const checkFollowing = await following.countFollower({ followerId });
      if (checkFollowing === 1) {
        return null;
      }
      const add = await following.addFollower(followerId);
      if (checkFollowing === 0 && add) {
        return following;
      }
    } catch (error) {
      return res.status(500).json({
        success: true,
        error: error.message
      });
    }
  }

  /**
   * @description { unfollow a user }
   * @param { string } followingName
   * @param { string } followerId
   * @param { object } res
   * @return { object } JSON
   */
  static async deleteFollowing(followingName, followerId, res) {
    try {
      const following = await User.findOne({
        where: { username: followingName },
        attributes: ['id', 'username']
      });
      if (!following) {
        return 'notAUser';
      }
      const checkFollowing = await following.countFollower({ followerId });
      const deleteFollowing = await following.removeFollower(followerId);
      if (checkFollowing === 1) {
        return null;
      }

      if (checkFollowing === 0 && deleteFollowing) {
        return following;
      }
    } catch (error) {
      return res.status(500).json({
        success: true,
        error: error.message
      });
    }
  }
}

export default FollowingHelper;
