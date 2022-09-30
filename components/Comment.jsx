import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/solid';
import Moment from 'react-moment';

const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <div className="p-3 flex gap-2 border-b hover:bg-gray-100 cursor-pointer transition duration-150">
      {/* user Image */}
      <div>
        <img
          alt="user-img"
          width="40px"
          height="40px"
          className="rounded-full"
          src={comment.userImg}
        />
      </div>

      {/* Right Side */}
      <div className="flex-1">
        {/* Header */}
        <div>
          {/* User Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 whitespace-nowrap">
            <h3 className="font-semibold text-[16px] hover:underline">
              {comment.name}
            </h3>
            <div className="flex gap-1">
              <span className="text-sm">@{comment.username} - </span>
              <span className="text-sm">
                <Moment fromNow>{comment.createdAt?.toDate()}</Moment>
              </span>
            </div>
          </div>
        </div>

        {/* Post Text */}
        <p className="text-gray-800 my-2">{comment.comment}</p>

        {/* Icons - Actions */}
        <div className="flex items-center justify-between mt-3 text-gray-500">
          {/* Comment on tweet */}
          <ChatIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />

          {/* Delete Comment */}

          <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />

          {/* Like Comment */}
          <div className="flex items-center">
            <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          </div>

          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>

      {/* Modales */}
      {/* {showDeleteModal && (
        <DeleteModal
          setShow={setShowDeleteModal}
          deleteHandler={deleteHandler}
        />
      )}
      {showCommentModal && (
        <CommentModal setShow={setShowCommentModal} tweetData={tweet} />
      )} */}
    </div>
  );
};

export default Comment;
