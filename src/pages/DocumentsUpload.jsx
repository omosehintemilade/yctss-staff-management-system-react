import { useContext, useEffect, useRef, useState } from "react";
import Placeholder from "../assets/placeholder.jpg";
import { Button, Logo } from "../components";
import { Context } from "../context";
import { UPDATE_FILES } from "../context/type";
import "../styles/documentsUpload.css";
import { showToast, status } from "../utils";
import { deleteFile, fetchFiles, uploadFile } from "../utils/services";

export default () => {
  const [docs, setDocs] = useState("");
  const [docsCount, setDocsCount] = useState(0);
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);

  const fileInput = useRef(null);
  const {
    state: { files },
    dispatch
  } = useContext(Context);

  useEffect(() => {
    (async () => {
      const res = await fetchFiles();
      // Dspatch context
      dispatch({
        type: UPDATE_FILES,
        payload: res.data
      });
      setDocsCount(res.data.length);
    })();
  }, []);

  return (
    <section className="_section">
      <Logo />
      <h4 className="_section__text">Upload Documents</h4>

      <div className="profile__wrapper">
        <div className="profile_image-section">
          <h4>Required</h4>
          <p className="docs_count">8</p>

          <h4>Uploads</h4>
          <p className="docs_count uploadCount">{docsCount}</p>
        </div>

        <div className="">
          <h6>File Title</h6>
          <select
            name="docs"
            value={docs}
            onChange={({ target }) => {
              setDocs(target.value);
            }}
          >
            <option value="">Select Document Type</option>
            <option value="O'level Certificate">O'level Certificate</option>
            <option value="Birth Certificate">Birth Certificate</option>
            <option value="National Diploma Certificate">
              National Diploma Certificate
            </option>
            <option value="Bsc. Certificate">Bsc. Certificate</option>
            <option value="Additional Certificate">
              Additional Certificate
            </option>
            <option value="Additional Certificate">
              Additional Certificate
            </option>
            <option value="Additional Certificate">
              Additional Certificate
            </option>
            <option value="Additional Certificate">
              Additional Certificate
            </option>
          </select>

          <div className="cs">
            <div className="prev">
              <div className="preview">
                <img
                  className="preview_img"
                  src={Placeholder}
                  alt="A placeholder image"
                />
              </div>
              <p className="selected_doc">
                {docs || "Select file to preview before uploading"}
              </p>
            </div>

            <div className="action">
              <label htmlFor="myfile">Browse Files</label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                ref={fileInput}
                onChange={({ target }) => {
                  const file = target.files[0];

                  if (file.type != "application/pdf") {
                    const img_url = URL.createObjectURL(target.files[0]);
                    document.querySelector(".preview_img").src = img_url;
                  }

                  setFile(target.files[0]);
                }}
              />
              <Button
                text={loading ? "Uploading..." : "Upload"}
                className={"btn"}
                onClick={async () => {
                  if (!docs) {
                    alert("Document Type must be selected");
                    setDocs("");
                    return;
                  }

                  if (!file.type) {
                    alert("Please select a file to upload");
                    return;
                  }

                  try {
                    setLoading(true);
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("filename", docs);

                    const res = await uploadFile(formData);

                    setLoading(false);
                    setDocsCount(res.data.length);
                    dispatch({
                      type: UPDATE_FILES,
                      payload: res.data
                    });

                    showToast(res);
                    // Reset system
                    setDocs("");
                    fileInput.current.value = "";
                    document.querySelector(".preview_img").src = Placeholder;
                  } catch (error) {
                    setLoading(false);
                    showToast(error);
                  }
                }}
              />
            </div>
          </div>

          <div className="file_header">
            <div className="li sn">S/N</div>
            <div className="li fid">File ID</div>
            <div className="li fn">File Name</div>
            <div className="li st">Status</div>
            <div className="li ac">Action</div>
          </div>

          {files.map((f, index) => (
            <div className="file_table" key={index}>
              <div className="file_item">
                <div className="li sn">{index + 1}</div>
                <div className="li fid">{f.fileId}</div>
                <div className="li fn">{f.name}</div>
                <div className="li">{status(f.status)}</div>
                <button
                  className="li delete_btn"
                  onClick={async () => {
                    const res = await deleteFile(f.fileId);
                    dispatch({
                      type: UPDATE_FILES,
                      payload: res.data
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
