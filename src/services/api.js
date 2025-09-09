export async function fetchLatAndLng(id) {
  const res = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/dapi/misc/address-recommend?place_id=${id}`
  );
  const result = await res.json();
  const { lat, lng } = result.data[0]?.geometry?.location;
  const formattedAddress = result.data[0]?.formatted_address;

  return {
    lat,
    lng,
    formattedAddress,
  };
}

export async function fetchLocationSearchResults(val) {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/dapi/misc/place-autocomplete?input=${val}`
  );
  const result = await res.json();

  return result;
}

export const fetchRestaurantsData = async (lat, lng) => {
  const baseURL = `${
    import.meta.env.VITE_BASE_URL
  }/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

  try {
    const response = await fetch(baseURL);
    const result = await response.json();

    const findCardById = (cards, id) => {
      return cards.find((resData) => resData?.card?.card?.id === id)?.card
        ?.card;
    };

    const topRestaurantsData =
      findCardById(result?.data?.cards, "top_brands_for_you")?.gridElements
        ?.infoWithStyle?.restaurants || [];

    const onlineRestaurantsData =
      findCardById(result?.data?.cards, "restaurant_grid_listing")?.gridElements
        ?.infoWithStyle?.restaurants || [];

    return {
      onYourMindData:
        findCardById(result?.data?.cards, "whats_on_your_mind")?.imageGridCards
          ?.info || [],
      onYourMindTitle:
        findCardById(result?.data?.cards, "whats_on_your_mind")?.header
          ?.title || "",

      topRestaurantsData,

      topResTitle:
        findCardById(result?.data?.cards, "top_brands_for_you")?.header
          ?.title || "",

      restaurantsWithOnlineDeliveryData:
        topRestaurantsData.length > 0
          ? topRestaurantsData
          : onlineRestaurantsData,

      onlineResTitle:
        findCardById(result?.data?.cards, "popular_restaurants_title")?.title ||
        "",

      serviceAvailability: result?.data?.cards[0]?.card?.card?.title || "",
    };
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    throw error;
  }
};

export const fetchMenuData = async (restaurantId, lat, lng) => {
  const baseURL = `${
    import.meta.env.VITE_BASE_URL
  }/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const response = await fetch(baseURL);
    const result = await response.json();

    let actualMenu = result?.data?.cards
      .find((data) => data?.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (data) =>
          data?.card?.card?.itemCards?.length > 0 ||
          data?.card?.card?.categories?.length > 0 ||
          data?.card?.card?.carousel?.length > 0
      );

    return {
      restaurantInfo: result?.data?.cards[2]?.card?.card?.info || {},
      discountData:
        result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
          ?.offers || [],
      menuData: actualMenu || [],
    };
  } catch (error) {
    console.error("Error fetching menu data:", error);
    throw error;
  }
};

export const searchURLBuilder = (val, query, lat, lng) =>
  `${
    import.meta.env.VITE_BASE_URL
  }/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${encodeURIComponent(
    query || ""
  )}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0${
    val == "dishes" ? "&selectedPLTab=DISH" : "&selectedPLTab=RESTAURANT"
  }`;

export const fetchSimilarResDishes = async ({
  lat,
  lng,
  searchQuery,
  city,
  resLocation,
  resId,
  itemId,
}) => {
  const pathname = `/city/${city}/${resLocation}`;
  const encodedPath = encodeURIComponent(pathname);

  const url = `${
    import.meta.env.VITE_BASE_URL
  }/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${encodeURIComponent(
    searchQuery
  )}&trackingId=null&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${encodeURIComponent(
    searchQuery
  )}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`;

  const response = await fetch(url);
  const result = await response.json();

  return {
    selectedRestaurantDish: result?.data?.cards[1] || null,
    sameDishes: result?.data?.cards[2]?.card?.card?.cards || [],
  };
};

export const fetchDishes = async ({ searchQuery, lat, lng }, retry = false) => {
  const baseURL = searchURLBuilder("dishes", searchQuery, lat, lng);

  const response = await fetch(baseURL);
  const result = await response.json();

  const dishes =
    result?.data?.cards[0]?.groupedCard?.cardGroupMap?.DISH?.cards || [];

  if (!dishes.length && !retry) {
    return fetchDishes({ searchQuery, lat, lng }, true); // Retry once
  }

  return dishes.filter((data) => data?.card?.card?.info);
};

export const fetchRestaurantsSearch = async ({ searchQuery, lat, lng }) => {
  const baseURL = searchURLBuilder("restaurant", searchQuery, lat, lng);

  const response = await fetch(baseURL);
  const result = await response.json();

  const restaurants =
    result?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards || [];

  return restaurants.filter((data) => data?.card?.card?.info);
};
