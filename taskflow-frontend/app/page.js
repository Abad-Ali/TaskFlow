import Tasks from "@/components/Tasks"; 

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="text-white flex flex-col gap-5">
        <div className="flex justify-center items-center pt-12 mx-7">
          <h1 className="logo font-black font-serif text-3xl text-green-100">Welcome to Your Task Manager - <span className='logo font-black font-serif text-3xl text-red-500 '>TaskFlow</span></h1>
        </div>
        
        <div>
          <Tasks /> {/* Render Tasks component here */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;