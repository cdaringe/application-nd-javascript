import { useOrientation, useWindowSize } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";

const getHeight = (el: HTMLElement) => el.getBoundingClientRect().height;

const ScreenToSmallModal: React.FC<{
  targetRef: React.RefObject<HTMLDivElement | null>;
}> = ({ targetRef }) => {
  const [showModal, setShowModal] = useState(false);
  const { type: orientation } = useOrientation();
  const size = useWindowSize();

  useEffect(() => {
    const checkHeight = () => {
      const height = targetRef.current && getHeight(targetRef.current);
      if (height != null && height < 140) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);

    return () => {
      window.removeEventListener("deviceorientation", checkHeight);
    };
  }, [targetRef, orientation, size.height, size.width]);

  return showModal ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Viewport Too Small</h2>
        <p className="mb-4">
          Please rotate your device or use a larger screen to view this content.
          ({getHeight(targetRef.current!)})
        </p>
      </div>
    </div>
  ) : null;
};

export default ScreenToSmallModal;
