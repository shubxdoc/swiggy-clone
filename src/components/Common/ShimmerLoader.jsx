function ShimmerLoader() {
  return (
    <div className="w-full">
      <div className="w-full text-white flex justify-center items-center gap-5 flex-col h-[350px] bg-slate-900">
        <div className="relative flex items-start">
          <img
            className="absolute w-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
            alt=""
          />
          <div
            className="inline-block size-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>

        <h1 className="text-2xl">Looking for great food near you....</h1>
      </div>

      <div className="container flex flex-wrap justify-center gap-10 py-6 mx-auto">
        {Array(12)
          .fill("")
          .map((data, i) => (
            <div
              key={i}
              className="w-[295px] animate h-[182px] rounded-md"
            ></div>
          ))}
      </div>
    </div>
  );
}

export default ShimmerLoader;
