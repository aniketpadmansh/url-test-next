import axios from "axios";

const INVALID = "Not Valid";

const checkUrl = (url) => {
  return new Promise((res, rej) => {
    try {
      new URL(url);
    } catch (e) {
      rej("Not Valid");
    }

    axios
      .get(url)
      .then((response) => {
        if (response?.status === 200) {
          res("Available");
        } else {
          rej("Not Available");
        }
      })
      .catch(() => rej("Not Available"));
  });
};

export async function GET(request, { params }) {
  const urls = params?.urlString?.split("T").join("/")?.split(",");
  const responseData = new Array(urls?.length)?.fill(null);

  const promArr = [];

  for (let i = 0; i < urls.length; i++) {
    promArr.push(
      checkUrl(urls[i])
        .then(() => {
          responseData[i] = { url: urls[i], available: true, valid: true };
        })
        .catch((status) => {
          if (status === INVALID) {
            responseData[i] = { url: urls[i], available: false, valid: false };
          } else {
            responseData[i] = { url: urls[i], available: false, valid: true };
          }
        })
    );
  }

  await Promise.allSettled(promArr);
  return new Response(JSON.stringify(responseData));
}
