export const addFollow=async (id) =>{
    const queryParams = new URLSearchParams({
        following:id,
  });
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  try {
    const response = await fetch("http://localhost:8000/api/users/addfollower?"+queryParams, requestOptions);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
  } catch (error) {
    console.error("Error loading searches:", error);
  }
  
};