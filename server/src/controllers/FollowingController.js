import FolloweWorker from '../workers/FollowingWorker';

const {
  getUserFollower,
  getUserFollowing,
  following
} = FolloweWorker;


/**
 * @class { FollowingController }
 * @description { Implement following and follow for users }
 */
class FollowingController {
  /**
     * @description { follow/unfollow a user  functionality }
     * @param { object } request
     * @param { object } response
     * @return { object } JSON
     */
  static async userFollowing(request, response) {
    const data = await getUserFollowing(request.params.userName, response);
    if (!data) {
      return response.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    if (!data.length) {
      return response.status(200).json({
        success: true,
        following: 'none'
      });
    }
    return response.status(200).json({
      success: true,
      following: data
    });
  }

  /**
   * @description { get followers of a user }
   * @param { object } request
   * @param { object } response
   * @return { object } JSON
   */
  static async userFollower(request, response) {
    const data = await getUserFollower(request.params.userName, response);
    if (!data) {
      return response.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    if (!data.length) {
      return response.status(200).json({
        success: true,
        following: 'none'
      });
    }
    return response.status(200).json({
      success: true,
      following: data
    });
  }

  /**
   * @description { Allows user to follow another user}
   * @param { object } request
   * @param { object } response
   * @return { object } JSON
   */
  static async followUser(request, response) {
    const followingName = request.params.userName;
    const { username, id } = request.user.payload;

    if (followingName === username) {
      return response.status(403).json({
        success: false,
        message: 'you can not follow yourself'
      });
    }
    const follow = await following(followingName, id, response);
    if (follow === 'notAUser') {
      return response.status(404).json({
        success: false,
        message: 'user not found'
      });
    }
    if (follow.action === 'unfollow') {
      return response.status(200).json({
        success: true,
        message: `you have unfollow ${follow.username}`
      });
    }
    if (follow.action === 'follow') {
      return response.status(201).json({
        success: true,
        message: `you are now following ${follow.username}`
      });
    }
  }

  /**
   * @description { Allows user to ufollow another user}
   * @param { object } request
   * @param { object } response
   * @return { object } JSON
   */
}
export default FollowingController;
