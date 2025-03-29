const departments = [
  { href: "/HR", name: "HR", imageUrl: "/HR.jpg" },
  { href: "/IT", name: "IT", imageUrl: "/IT.jpg" },
  { href: "/finance", name: "Finance", imageUrl: "/finance.jpg" },
  { href: "/marketing", name: "Marketing", imageUrl: "/marketing.jpg" },
  { href: "/sales", name: "Sales", imageUrl: "/sales.jpg" },
  { href: "/service", name: "Service", imageUrl: "/service.jpg" },
  { href: "/design", name: "Design", imageUrl: "/design.jpg" },
];

const HomePage = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bol mb-4">
          Explore Our Department
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the most popular and pay
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {departments.map((department, index) => (
          <div
            key={index}
            className="relative overflow-hidden h-96 w-full rounded-lg group"
          >
            <a
              href={department.href}
              className="w-full h-full cursor-pointer block"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
              <img
                src={department.imageUrl}
                alt={department.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {department.name}
                </h3>
                <p className="text-gray-200 text-sm">
                  Explore {department.name}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;