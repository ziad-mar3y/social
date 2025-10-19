import userPhoto from "../../assets/OIP.webp";

export default function Header({ avatar, header, subheader }) {
  return (
    <div className="flex">
      <img
        onError={(e) => (e.target.src = userPhoto)}
        className=" rounded-full w-10 h-10 "
        src={avatar}
        alt={"photo"}
      />
      <div>
        <h3 className="text-md font-semibold ms-3 ">{header}</h3>
        <p className="text-xs text-gray-500 ms-3">{subheader}</p>
      </div>
    </div>
  );
}
