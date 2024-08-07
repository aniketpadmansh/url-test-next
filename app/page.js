"use client";
import { useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Script from "next/script";

export default function Home() {
  const inputRef = useRef();

  const [urls, setUrls] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const parseUrlString = () => {
    if (!inputRef.current.value) return;

    const u = inputRef.current.value
      ?.split(",")
      ?.map((url) => (url?.includes("https://") ? url : `https://${url}`));

    setUrls(u);
  };

  const checkUrlAvailability = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/get-url`, urls);
      setParsedData(res?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const copyInvalid = () => {
    const text = parsedData
      ?.filter((obj) => !obj?.valid)
      ?.map((obj) => obj?.url)
      ?.join(",");
    navigator.clipboard.writeText(text);
  };

  const copyNonAvailable = () => {
    const text = parsedData
      ?.filter((obj) => !obj?.available)
      ?.map((obj) => obj?.url)
      ?.join(",");
    navigator.clipboard.writeText(text);
  };

  const copyRedirected = () => {
    const text = parsedData
      ?.filter((obj) => obj?.redirect)
      ?.map((obj) => obj?.url)
      ?.join(",");
    navigator.clipboard.writeText(text);
  };

  const clearUrls = () => {
    if (urls?.length > 0) {
      setUrls([]);
      setParsedData([]);
    }
  };

  return (
    <>
      <div className="flex gap-x-2">
        <input
          ref={inputRef}
          onChange={clearUrls}
          className="border rounded-md border-black px-2"
        />
        <button
          onClick={parseUrlString}
          className="rounded-md bg-gray-200 px-4 py-1"
        >
          Parse
        </button>
      </div>

      <div className="flex flex-wrap mt-3 gap-x-2">
        {urls?.map((url, i) => (
          <p key={i} className="rounded-md px-3 py-1 bg-gray-100">
            {url}
          </p>
        ))}
      </div>

      {urls?.length > 0 ? (
        <button
          onClick={checkUrlAvailability}
          className="rounded-md bg-gray-200 px-4 py-1 mt-3 flex"
        >
          Check Availability
        </button>
      ) : null}

      {loading ? (
        <p className="mt-3 flex">Analyzing...</p>
      ) : parsedData?.length > 0 ? (
        <table className="mt-3">
          <thead>
            <tr>
              <th>Url</th>
              <th>
                <div className="flex flex-col gap-x-2 ml-4">
                  Valid{" "}
                  <button
                    onClick={copyInvalid}
                    className="px-2 py-1 shrink-0 bg-gray-100 rounded-md font-medium text-xs"
                  >
                    Copy Non Valid
                  </button>
                </div>
              </th>
              <th>
                <div className="flex flex-col gap-x-2 ml-4">
                  Available{" "}
                  <button
                    onClick={copyNonAvailable}
                    className="px-2 shrink-0 text-xs py-1 bg-gray-100 rounded-md font-medium"
                  >
                    Copy Non Available
                  </button>
                </div>
              </th>
              <th>
                <div className="flex flex-col gap-x-2 ml-4">
                  Redirected{" "}
                  <button
                    onClick={copyRedirected}
                    className="px-2 shrink-0 text-xs py-1 bg-gray-100 rounded-md font-medium"
                  >
                    Copy Redirected
                  </button>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {parsedData?.map((data, i) => (
              <tr key={i}>
                <Link
                  className="w-[150px] text-center text-blue-400"
                  href={data?.url}
                  target="_blank"
                >
                  {data?.url}
                </Link>
                <td className="w-[150px] text-center">
                  {data?.valid ? "Yes" : "No"}
                </td>
                <td className="w-[150px] text-center">
                  {data?.available ? "Yes" : "No"}
                </td>
                <td className="w-[150px] text-center">
                  {data?.redirect ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <Script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></Script>
      <Script id="test" strategy="beforeInteractive" async>
        {
          `var AppBridge = window['app-bridge'];
            var actions = AppBridge.actions;
            var TitleBar = actions.TitleBar;
            var app = AppBridge.createApp({
                apiKey: 'a4dcc3265352dea96cefdaed3ee330dd',
                shopOrigin: 'rx-demo.myshopify.com'
            });
            var titleBar = TitleBar.create(app, {
                title: 'Bubble App Integration',
            });
            titleBar.subscribe(TitleBar.Action.PRIMARY, function() {
                app.dispatch(Redirect.toApp({ path: '/partner' }));
            });`}
      </Script>
    </>
  );
}
