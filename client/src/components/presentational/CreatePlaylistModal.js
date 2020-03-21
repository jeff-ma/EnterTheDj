import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {playlistAddTrack, createPlaylist, uploadPlaylistImage} from "../../utils";
import "../../styles/createPlaylistModal.scss";

const CreatePlaylistModal = ({track}) => {
  const history = useHistory();
  const [base64Image, setBase64Image] = useState();
  const [errors, setErrors] = useState({image: "", name: ""});
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const createPlaylistModal = useRef();
  const closeButton = useRef();
  const name = useRef();
  const description = useRef();
  const fileUpload = async (event) => {
    try {
      const imageFile = event.target.files[0];
      if (imageFile && imageFile.type === "image/jpeg") {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const image = new Image();
          image.src = reader.result;
          image.onload = function() {
            if (this.height < 300 || this.width < 300) {
              setErrors({...errors, image: "Image too small. Must be larger than 300x300."});         
            } else {
              if(imageUrl) {
                URL.revokeObjectURL(imageUrl);
              }
              setImageUrl(URL.createObjectURL(imageFile));
              setBase64Image(reader.result.split(",")[1]);
              setErrors({...errors, image: ""});
            }
          }
        }  
          reader.readAsDataURL(imageFile);
    } else {
      setErrors({...errors, image: "Image type must be jpeg."});
    }
  } catch(error) {
      console.log(error);
    }
  };
  const handleCreate = async () => {
    if (name.current.value) {
      setErrors({...errors, name: ""});
      setIsLoading(true);
      const playlist = await createPlaylist(name.current.value, description.current.value);
      await playlistAddTrack(playlist.id, track.uri);
      if(base64Image) {
        await uploadPlaylistImage(playlist.id, base64Image);
      }
      setTimeout(() => {
        // close create playlist modal and track modal
        closeButton.current.click();
        document.getElementById("track-modal-close").click();
        setTimeout(() => {
          history.push(`/playlist/${playlist.id}`);
        }, 700);
      }, 3500);
    } else {
      setErrors({...errors, name: "Please provide a name."});
    }
  };
  useEffect(()=> {
    const observer = new MutationObserver(() => {
      const trackModal = document.getElementById("track-modal");
      if (createPlaylistModal.current.classList.contains("show")) {
        trackModal.classList.add("darken");
      } else {
        trackModal.classList.remove("darken");
      }
    });
    observer.observe(createPlaylistModal.current, {attributes: true});
  }, []);
  return (
    <div id="createPlaylistModal" className="modal fade" ref={createPlaylistModal}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Create new playlist</h3>
            <button type="button" className="close track-modal-close" data-dismiss="modal" ref={closeButton}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="create-playlist-content">
              <div className="image-preview-box" style={{backgroundImage: `url(${imageUrl})`}}>
                <label htmlFor="preview-image-file">
                  {!imageUrl && 
                    <React.Fragment>
                      <i className="fas fa-file-upload"></i>
                      <div>Upload jpeg image</div>
                      <div>(Optional)</div>
                    </React.Fragment>                
                  }
                </label>
                <input id="preview-image-file" className={errors.image ? "form-control is-invalid" : ""} type="file" onChange={(e) => fileUpload(e)}/>
                <div className="invalid-feedback">{errors.image}</div>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="playlist-name">Name</label>
                  <input type="text" className={errors.name ? "form-control is-invalid" : "form-control"} id="playlist-name" ref={name} placeholder="Required"/>
                  <div className="invalid-feedback">
                    {errors.name}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="playlist-description">Description</label>
                  <input type="text" className="form-control" id="playlist-description" ref={description} placeholder="(Optional)"/>
                </div>
                {isLoading && 
                  <p className="loading">Creating playlist <span>.</span> <span>.</span> <span>.</span></p>
                }
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button id="create" type="button" className="button-outline" disabled={isLoading} onClick={() => handleCreate()}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

CreatePlaylistModal.propTypes = {
  track: PropTypes.object,
};

export default CreatePlaylistModal;