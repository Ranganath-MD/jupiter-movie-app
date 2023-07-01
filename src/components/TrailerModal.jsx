import React, { useEffect, useState } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalContent,
} from "mdb-react-ui-kit";

export const TrailerModal = ({ show, setShow, trailer }) => {
  const [videoSrc, setVideoSrc] = useState("");

console.log(show)

  useEffect(() => {
    const key =
      trailer === undefined || trailer === null ? "bz9dOy3Zd6s" : trailer.key;
    const videoSrc = `https://www.youtube.com/embed/${key}`;
    setVideoSrc(videoSrc);
  }, [show, trailer]);


  return (
    <MDBModal
      tabIndex="-1"
      show={show}
      setShow={setShow}
      size="lg"
      backdrop={false}
    >
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader className="modal_head">
            {trailer === null ? (
              <span className="modal_title">There is no trailer found</span>
            ) : (
              <span className="modal_title">Play</span>
            )}
          </MDBModalHeader>
          <MDBModalBody className="modal_body">
            <iframe
              width="100%"
              height="100%"
              title="trailer"
              src={!videoSrc ? "" : videoSrc}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};
