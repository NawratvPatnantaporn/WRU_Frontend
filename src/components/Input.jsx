const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-sky-600" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-white text-gray-900 placeholder-gray-500 rounded-lg border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-300 transition duration-200"
      />
    </div>
  );
};

export default Input;