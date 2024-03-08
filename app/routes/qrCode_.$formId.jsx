import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { QRCode } from "react-qr-code";

export async function loader({ params }) {
  return params.formId;
}

export default function QRCodeCompoent() {
  const formId = useLoaderData();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      setUrl(window.ENV.BASE_URL + "/feedbackForm/" + formId);
    }
  }, [formId]);
  return (
    <div
      style={{
        height: "auto",
        margin: "0 auto",
        maxWidth: 640,
        width: "100%",
        marginTop: 180,
        display: "grid",
      }}
    >
      {formId && url.length > 0 && (
        <QRCode
          size={256}
          style={{
            height: "auto",
            maxWidth: "100%",
            width: "100%",
          }}
          value={url}
          viewBox={`0 0 256 256`}
        />
      )}
      <Link
        to={"/feedbackForm/" + formId}
        style={{
          color: "black",
          textAlign: "center",
          justifySelf: "center",
          marginTop: 40,
        }}
      >{`To feedback form`}</Link>
    </div>
  );
}
