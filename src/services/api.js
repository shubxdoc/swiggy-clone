// src/api.js
export const fetchRestaurantsData = async (lat, lng) => {
  const baseURL = `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

  try {
    const response = await fetch(baseURL);
    const result = await response.json();

    const findCardById = (cards, id) => {
      return cards.find((resData) => resData?.card?.card?.id === id)?.card
        ?.card;
    };

    return {
      onYourMindData:
        findCardById(result?.data?.cards, "whats_on_your_mind")?.imageGridCards
          ?.info || [],
      onYourMindTitle:
        findCardById(result?.data?.cards, "whats_on_your_mind")?.header
          ?.title || "",

      topRestaurantsData:
        findCardById(result?.data?.cards, "top_brands_for_you")?.gridElements
          ?.infoWithStyle?.restaurants || [],
      topResTitle:
        findCardById(result?.data?.cards, "top_brands_for_you")?.header
          ?.title || "",

      restaurantsWithOnlineDeliveryData:
        findCardById(result?.data?.cards, "restaurant_grid_listing")
          ?.gridElements?.infoWithStyle?.restaurants || [],
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
  const baseURL = `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;

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
