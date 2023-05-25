import { expect, test } from "@playwright/test";


const apiUrl = 'https://jsonplaceholder.typicode.com/posts/';


test('GET request should return valid response', async ({request}) => {
    const response = await request.get(apiUrl+10);
    const status = response.status();
    expect(status).toBe(200);
    console.log('Response Code :', status);
    if (response) {
      const responseBody = await response.json();
      console.log('GET response:', responseBody);
    } else {
      throw new Error('GET request failed');
    }
  });
