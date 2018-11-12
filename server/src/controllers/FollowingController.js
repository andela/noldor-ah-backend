import FollowerHelper from '../helpers/following';

const {
  getUserFollower, getUserFollowing, postFollowing, deleteFollowing
} = FollowerHelper;


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
    if (data === null) {
      return response.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    if (data.length === 0) {
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
    if (data === null) {
      return response.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    if (data.length === 0) {
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
        message: 'Forbidden'
      });
    }
    const follow = await postFollowing(followingName, id, response);
    if (follow === 'notAUser') {
      return response.status(404).json({
        success: false,
        message: 'user not found'
      });
    }
    if (follow === null) {
      return response.status(200).json({
        success: true,
        message: 'you are following this user already'
      });
    }
    return response.status(201).json({
      success: true,
      message: `you are now following ${follow.username}`
    });
  }

  /**
   * @description { Allows user to ufollow another user}
   * @param { object } request
   * @param { object } response
   * @return { object } JSON
   */
  static async unfollowUser(request, response) {
    const followingName = request.params.userName;
    const { username, id } = request.user.payload;

    if (followingName === username) {
      return response.status(403).json({
        success: false,
        message: 'Forbidden'
      });
    }
    const follow = await deleteFollowing(followingName, id, response);
    if (follow === 'notAUser') {
      return response.status(404).json({
        success: false,
        message: 'user not found'
      });
    }
    if (follow === null) {
      return response.status(204).json({
      });
    }
    return response.status(200).json({
      success: true,
      message: 'you are not following this user'
    });
  }
}
export default FollowingController;
