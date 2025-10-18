import userPhoto from "../../src/assets/OIP.webp";

export default function Comment({ comment }) {
  return (
      <div className="flex mt-4">
               {   <img
                    onError={(e) => (e.target.src = userPhoto)}
                    className=" rounded-full w-10 h-10 mr-3"
                    src={comment[0]?.commentCreator.photo}
                    alt={"asdfasdf"}
                  />}
                  <div>
                    <h3 className="text-md font-semibold ">{comment[0]?.commentCreator.name}</h3>
                    <p className="text-xs text-gray-500">{comment[0]?.createdAt}</p>
                      <div className="mt-2">
                    <p>{comment[0]?.content}</p>
                  </div>
                  </div>
                
                </div>
  )
}
