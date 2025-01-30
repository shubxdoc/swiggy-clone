import { Carousel } from "../Common";

const OnYourMind = ({ data, title }) => {
  return (
    <>
      <Carousel
        title={title}
        data={data}
        slidesToShow={8.5}
        slidesToScroll={3}
        renderItem={(item) => (
          <img
            key={item.id}
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
            alt={item.accessibility?.altText || "Image"}
            className="px-2 rounded-lg"
          />
        )}
      ></Carousel>
    </>
  );
};

export default OnYourMind;
