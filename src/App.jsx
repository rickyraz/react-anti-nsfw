import NSFWFilter from "nsfw-filter";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function ImageUploader() {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    // Check to see if the image is appropriate
    const isSafe = await NSFWFilter.isSafe(file);
    if (!isSafe) {
      toast.error("Maaf file ini tidak diperbolehkan");
      return;
    }
    // Process the image if it is safe
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Toaster />
        <h1>ANTI NSFW INPUT</h1>
        <ImageUploader />
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
    </>
  );
}

export default App;
