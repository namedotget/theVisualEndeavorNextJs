import { useRef } from "react";
import Select from "react-select";

function FileSelection() {
  const file = useRef();
  const options = [
    { value: "none", label: "empty" },
    { value: "image", label: "IMAGE :  [ .png / .jpg ]" },
    { value: "video", label: "VIDEO :  [ .mp4 ] " },
    // { value: "model", label: "MODEL" },
    // { value: "shader", label: "SHADER" },
  ];
  function handleChange(e) {
    const selection = e.value;

    if (selection === "none") return;
    if (selection === "image") file.current.accept = ".png,.jpg,.jpeg";
    if (selection === "video") file.current.accept = ".mp4";

    file.current.style.display = "block";
  }
  return (
    <div>
      <h3>Select format of file, upload file</h3>
      <Select options={options} instanceId={"files"} onChange={handleChange} />
      <input type="file" ref={file} style={{ display: "none" }} />
    </div>
  );
}

export default FileSelection;
