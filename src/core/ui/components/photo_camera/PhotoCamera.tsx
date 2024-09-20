import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import "./photo_camera.css";
import { MoonLoader } from "../moon_loader";

export interface PhotoCameraProps {
  webcamRef: React.RefObject<Webcam>;
  watermark: boolean;
}

export const PhotoCamera = ({
  watermark = false,
  webcamRef,
}: PhotoCameraProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cameraId, setCameraId] = useState<ConstrainDOMString | undefined>(
    undefined
  );
  const [orientation, setOrientation] = useState<
    "portrait" | "landscape" | null
  >(null);

  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
  });

  const getCamID = (devices: any) => {
    for (const device of devices) {
      if (device.kind === "videoinput" && device.label.endsWith("Front")) {
        setCameraId(device.deviceId);
      }
      if (
        device.kind === "videoinput" &&
        device.label.toLowerCase().includes("cam")
      ) {
        setCameraId(device.deviceId);
      }
    }
  };

  const handleUserMedia = (_: MediaStream) => {
    navigator.mediaDevices.enumerateDevices().then(getCamID);
    setLoading(false);
  };

  useEffect(() => {
    if (
      window.screen.orientation.type === "landscape-primary" &&
      (window.screen.orientation.angle === 0 ||
        window.screen.orientation.angle === 180)
    ) {
      setOrientation("landscape");
    }
    if (
      window.screen.orientation.type === "portrait-primary" &&
      (window.screen.orientation.angle === 90 ||
        window.screen.orientation.angle === 270)
    ) {
      setOrientation("portrait");
    }
    if (
      window.screen.orientation.type === "portrait-primary" &&
      (window.screen.orientation.angle === 0 ||
        window.screen.orientation.angle === 180)
    ) {
      setOrientation("landscape");
    }
    if (
      window.screen.orientation.type === "landscape-primary" &&
      (window.screen.orientation.angle === 90 ||
        window.screen.orientation.angle === 270)
    ) {
      setOrientation("portrait");
    }
  }, []);

  useEffect(() => {
    window.screen.orientation.addEventListener("change", function (e: any) {
      if (
        e.currentTarget.type === "landscape-primary" &&
        (e.currentTarget.angle === 0 || e.currentTarget.angle === 180)
      ) {
        setOrientation("landscape");
      }
      if (
        e.currentTarget.type === "portrait-primary" &&
        (e.currentTarget.angle === 90 || e.currentTarget.angle === 270)
      ) {
        setOrientation("portrait");
      }
      if (
        e.currentTarget.type === "portrait-primary" &&
        (e.currentTarget.angle === 0 || e.currentTarget.angle === 180)
      ) {
        setOrientation("landscape");
      }
      if (
        e.currentTarget.type === "landscape-primary" &&
        (e.currentTarget.angle === 90 || e.currentTarget.angle === 270)
      ) {
        setOrientation("portrait");
      }
    });
  }, []);

  useEffect(() => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [dimension.height, dimension.width]);

  const aspectRatio =
    dimension.width > dimension.height && orientation === "landscape"
      ? 3 / 4
      : dimension.width < dimension.height && orientation === "landscape"
      ? 3 / 4
      : 4 / 3;

  const height = dimension.height > 640 ? 640 : dimension.height;

  return (
    <div className={"photo-camera__container"}>
      {orientation !== null && (
        <Webcam
          audio={false}
          id={"id-camera"}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            aspectRatio: aspectRatio,
            deviceId: cameraId,
            facingMode: "user",
          }}
          height={height}
          onUserMedia={handleUserMedia}
          className={"photo-camera__webcam"}
        />
      )}

      {watermark && !loading && (
        <img
          className={"photo-camera__backdrop"}
          src={"/images/circle-crop-profile-picture.image.svg"}
          style={{
            aspectRatio: aspectRatio,
            height: height,
          }}
        />
      )}

      {loading && (
        <div className={`photo-camera__loader-container`}>
          <MoonLoader size={100} color="#017948" />
        </div>
      )}
    </div>
  );
};
