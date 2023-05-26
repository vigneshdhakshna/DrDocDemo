import test, { expect } from "./basetest";

test.describe.skip("Express Api Automation", () => {
  test("GET City Temperature", async ({ request, apiUrl, cityName }) => {
    const response = await request.get(apiUrl + cityName);
    const status = response.status();
    expect(status).toBe(200);
    console.log("Response Code :", status);
    if (response) {
      const responseBody = await response.json();
      console.log("GET response:", responseBody);
    } else {
      throw new Error("GET request failed");
    }
  });


  test("Post City Temperature", async ({ request, apiUrl }) => {
    const cityName = "Kumbakonam";

    const postResponse = await request.post(apiUrl+cityName,{data:{
      city : cityName,
      temperature : 32,
    }});

    const postStatus = postResponse.status();
    expect(postStatus).toBe(201);
    if (postStatus) {
      console.log("POST Status Code:",postStatus);
    } else {
      throw new Error("POST request failed");
    }

    const getResponse = await request.get(apiUrl + cityName);
    const getStatus = getResponse.status();
    expect(getStatus).toBe(200);
    console.log("GET Response Code :", getStatus);
    if (getStatus) {
      const responseBody = await getResponse.json();
      console.log("GET response:", responseBody);
    } else {
      throw new Error("GET request failed");
    }
  });
});
