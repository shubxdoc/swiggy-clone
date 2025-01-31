function SkeletonLoader() {
  return (
    <div className="w-full lg:w-[50%] mx-auto mt-10">
      <div className="w-full h-40 sm:h-80 rounded-xl animate"></div>
      <div className="flex justify-between w-full mt-10">
        <div className="w-[45%] h-10 rounded-xl animate"></div>
        <div className="w-[45%] h-10 rounded-xl animate"></div>
      </div>

      <div className="flex flex-col w-full mt-20 gap-9">
        {Array(5)
          .fill("")
          .map((data, i) => (
            <div key={i} className="flex justify-between w-full h-40">
              <div className="w-[60%] flex flex-col gap-5 h-full">
                <div className="w-[100%] h-5 animate"></div>
                <div className="w-[50%] h-5 animate"></div>
                <div className="w-[30%] h-5 animate"></div>
              </div>
              <div className="w-[30%] rounded-xl h-full animate"></div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SkeletonLoader;
