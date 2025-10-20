import userPhoto from "../../src/assets/OIP.webp";

export default function Comment({ comment   }) {
  return (
    <div className="flex mt-4">
      {
        <img
          onError={(e) => (e.target.src = userPhoto)}
          className=" rounded-full w-10 h-10 mr-3"
          src={comment?.commentCreator.photo}
          alt={"asdfasdf"}
        />
      }
      <div>
        <h3 className="text-md font-semibold ">
          {comment?.commentCreator.name}
        </h3>
        <p className="text-xs text-gray-500">{comment?.createdAt}</p>
        <div className="mt-2">
          <p>{comment?.content}</p>
        </div>
      </div>
    </div>
  );
}
