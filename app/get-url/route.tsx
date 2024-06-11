import axios from "axios";

const INVALID = "Not Valid";
const REDIRECT = "Redirected";
const in200 = new RegExp("2[0-9]{2}");
const in300 = new RegExp("3[0-9]{2}");

const checkUrl = (url: string) => {
  return new Promise((res, rej) => {
    try {
      new URL(url);
    } catch (e) {
      rej(INVALID);
    }

    axios
      .get(url)
      .then((response) => {
        if (in200.test(String(response?.status))) {
          res("Available");
        } else if (in300.test(String(response?.status))) {
          res(REDIRECT);
        } else {
          rej("Not Available");
        }
      })
      .catch((e) => {
        rej("Not Available");
      });
  });
};

export async function POST(req) {
  const urls = await req.json();
  const responseData = new Array(urls?.length)?.fill(null);

  const promArr = [];

  for (let i = 0; i < urls.length; i++) {
    promArr.push(
      checkUrl(urls[i])
        .then((status) => {
          if (status === REDIRECT) {
            responseData[i] = {
              url: urls[i],
              available: true,
              valid: true,
              redirect: true,
            };
          } else {
            responseData[i] = {
              url: urls[i],
              available: true,
              valid: true,
              redirect: false,
            };
          }
        })
        .catch((status) => {
          if (status === INVALID) {
            responseData[i] = {
              url: urls[i],
              available: false,
              valid: false,
              redirect: false,
            };
          } else {
            responseData[i] = {
              url: urls[i],
              available: false,
              valid: true,
              redirect: false,
            };
          }
        })
    );
  }

  await Promise.allSettled(promArr);
  return new Response(JSON.stringify(responseData));
}

// POST request done
// https: append done
// Copy all Invalid -> typo done
// redirect -> done
// status regex 2xx | 3xx -> done

// gcp + docker -> study
