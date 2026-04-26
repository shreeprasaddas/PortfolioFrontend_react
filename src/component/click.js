
async function getData() {
    const url = process.env.REACT_APP_API_URL || "http://localhost:5000";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }


export default getData;