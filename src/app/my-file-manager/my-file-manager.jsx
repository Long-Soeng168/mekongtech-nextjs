"use client";
import React, { useState } from "react";
import Flmngr from "@flmngr/flmngr-react";
import { Button } from "@/components/ui/button";
import { set } from "react-hook-form";

const MyFileManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setIsLoading(true);
          Flmngr.open({
            apiKey: "dOyRQpiDtX5B2PpaWwVlp0jv", // default free key
            urlFileManager: "https://mekongtech.kampu.solutions/api/flmngr", // demo server
            urlFiles: "https://mekongtech.kampu.solutions/files", // demo file storage
            isMultiple: false, // let selecting a single file
            acceptExtensions: ["png", "jpg", "jpeg", "gif", "webp"],
            onCancel: () => {
              setIsLoading(false);
              console.log("User canceled.");
            },
            onFinish: (files) => {
              setIsLoading(false);
              if (files.length > 0 && files[0].url) {
                console.log("User picked:");
                console.log(files[0].url);

                navigator.clipboard
                  .writeText(files[0].url)
                  .then(() => {
                    console.log("copied", files[0].url);
                  })
                  .catch((err) => {
                    console.error("Failed to copy URL: ", err);
                  });
              } else {
                console.log("No file selected or file has no URL.");
              }
            },
          });
        }}
      >
        Open file manager
        {isLoading ? " Loading..." : ""}
      </Button>
    </>
  );
};

export default MyFileManager;
