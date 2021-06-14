import { VFC } from "react";

import { Effect, LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface LazyImageProps {
  imgSrc: string;
  imgAlt: string;
  imgWidth?: number;
  imgHeight?: number;
  effect?: Effect;
}

const LazyImage: VFC<LazyImageProps> = ({
  imgAlt,
  imgHeight,
  imgSrc,
  imgWidth,
  effect
}) => {
  return (
    <LazyLoadImage
      alt={imgAlt}
      height={imgHeight}
      src={imgSrc}
      width={imgWidth}
      effect={effect}
    />
  );
};

export default LazyImage;
