const fetchPortfolioData = async () => {
  const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/+$/, "");
  try {
      const res = await fetch(`${API_URL}/getPortfolio`);
      
      if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Fetched data:", result);

      if (Array.isArray(result)) {
          return result;  // Return the array if valid
      } else {
          console.warn("Fetched data is not an array, wrapping in array.");
          return [result];  // Wrap in array if it's a single object
      }
  } catch (error) {
      console.error("Error fetching project data:", error);
      throw error;
  }
};

export default fetchPortfolioData;
