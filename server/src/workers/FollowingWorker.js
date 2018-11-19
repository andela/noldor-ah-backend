
import Models from '../db/models';

const { User } = Models;


/**
 * @class { FollowingHelper }
 * @description { Handles for like and unlike helpers }
 */
class FollowingWorker {
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
        const followers = await user.getFollower({ attributes: ['username', 'avatarUrl', 'id'] });
        const userFollowing = [];
        followers.map((x) => {
          const { username, avatarUrl, id } = x;
          return userFollowing.push({ username, avatarUrl, id });
        });
        return userFollowing;
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
  static async following(followingName, followerId, res) {
    try {
      const user = await User.findOne({
        where: { username: followingName },
        attributes: ['id', 'username']
      });
      if (!user) {
        return 'notAUser';
      }
      const checkFollowing = await user.hasFollower(followerId);
      const deleteFollowing = await user.removeFollower(followerId);
      if (checkFollowing && deleteFollowing) {
        user.action = 'unfollow';
        return user;
      }
      const add = await user.addFollower(followerId);
      if (!checkFollowing && add) {
        user.action = 'follow';
        return user;
      }
    } catch (error) {
      return res.status(500).json({
        success: true,
        error: error.message
      });
    }
  }
}

export default FollowingWorker;
