import React, { useState } from "react";
import axios from "axios";
import { IMAGINE_ART_API_KEY } from "../../../Helper";

const JewelryDesignGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("style", "realistic"); // Customize the style if needed
      formData.append("aspect_ratio", "1:1"); // Adjust the aspect ratio if needed
      formData.append("seed", "5"); // Optional: Add seed if required

      const config = {
        method: "post",
        url: "https://api.vyro.ai/v2/image/generations",
        headers: {
          Authorization: `Bearer ${IMAGINE_ART_API_KEY}`, // Your API key
        },
        data: formData,
        responseType: 'arraybuffer', // Set the response type to 'arraybuffer' for binary data
      };

      // Make the API request
      const response = await axios(config);

      // Convert binary data to a Blob and create an object URL
      const imageBlob = new Blob([response.data], { type: 'image/jpeg' });  // Assuming it's a JPEG image
      const imageUrl = URL.createObjectURL(imageBlob);  // Create a URL from the Blob
      setImageUrl(imageUrl);  // Set the image URL in the state
    } catch (error) {
      console.error("Error generating image:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);  // Log detailed error response
      }
      alert("Failed to generate image. Please try again.");
    }
    setLoading(false);
  };

  const clearInputAndImage = () => {
    setPrompt("");
    setImageUrl("");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }} className="contact-form">
      <h1 style={{ color: "#333", fontFamily: "Arial, sans-serif" }}>
        Jewelry Design Generator
      </h1>
      <textarea
        placeholder="Enter a description for the image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: "80%",
          height: "100px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          fontSize: "16px",
        }}
      />
      <br />
      <button
        onClick={generateImage}
        disabled={loading}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          backgroundColor: loading ? "#ddd" : "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>
      <button
        onClick={clearInputAndImage}
        style={{
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Clear
      </button>
      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontFamily: "Arial, sans-serif", color: "#555" }}>
            Generated Image:
          </h3>
          <img
            src={imageUrl}
            alt="Generated Art"
            style={{
              maxWidth: "100%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default JewelryDesignGenerator;
