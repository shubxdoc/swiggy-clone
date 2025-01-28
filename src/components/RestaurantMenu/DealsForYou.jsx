import { Carousel } from "../Common";

const DealsForYou = ({ data }) => {
  return (
    <div>
      <Carousel
        title={"Deals for you"}
        customHeaderClass={"text-lg"}
        data={data}
        slidesToShow={2.3}
        slidesToScroll={1.5}
        renderItem={(item) => (
          <div className="flex items-center gap-3 p-2 my-3 border border-gray-300 lg:p-4 rounded-xl">
            <div>
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.info.offerLogo}`}
                alt=""
                className="size-10"
              />
            </div>
            <div className="font-bold">
              <p className="text-sm lg:text-lg">{item.info.header}</p>
              <p className="text-xs text-gray-500 lg:text-sm">
                {item.info.couponCode || item.info.description}
              </p>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default DealsForYou;
