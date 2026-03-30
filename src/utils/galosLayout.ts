interface GalosLayout {
  headerWidth?: number;
  main?: {
    width: number;
    minHeight: number;
  };
  pictureSize?: number;
  circle?: {
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    top: number;
    left: number;
  };
  infoBlock?: {
    maxWidth: number;
    top: number;
    left: number;
    gap: number;
  };
}

const getGalosLayout = (width: number | undefined, height: number | undefined): GalosLayout => {
  if (width === undefined || height === undefined || width <= 0 || height <= 0) {
    return width === undefined || width <= 0 ? {} : { headerWidth: width };
  }

  const minDimension = Math.min(width, height);
  const minDimension40Percent = minDimension * 0.4;

  return {
    headerWidth: width,
    main: {
      width,
      minHeight: height,
    },
    pictureSize: minDimension,
    circle: {
      minWidth: minDimension40Percent,
      minHeight: minDimension40Percent,
      maxWidth: minDimension40Percent,
      maxHeight: minDimension40Percent,
      top: height / 2,
      left: width / 2,
    },
    infoBlock: {
      maxWidth: width * 0.35,
      top: height / 2,
      left: width * 0.55,
      gap: minDimension * 0.05,
    },
  };
};

export default getGalosLayout;
