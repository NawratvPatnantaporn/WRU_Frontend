import { Link } from "react-router-dom";

const DepartmentItem = ({ department }) => {
  return (
    <div className="relative overflow-hidden h-96 w-full rounded-lg group shadow-md">
      <Link to={"/department" + department.href}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/80 z-10" />
          <img
            src={department.imageUrl}
            alt={department.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-black/50 backdrop-blur-sm rounded-t-md">
            <h3 className="text-white text-2xl font-bold mb-1 drop-shadow">
              {department.name}
            </h3>
            <p className="text-white text-sm drop-shadow-sm">
              Explore {department.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DepartmentItem;
