const calculateImageSizeByContainerAndNaturalSizes = (
  containerWidth: number,
  containerHeight: number,
  naturalWidth: number,
  naturalHeight: number
) => {
  const naturalWidthToNaturalHeight = naturalWidth / naturalHeight;
  const naturalHeightToNaturalWidth = 1 / naturalWidthToNaturalHeight;

  const containerWidthToContainerHeight = containerWidth / containerHeight;
  const containerHeightToContainerWidth = 1 / containerWidthToContainerHeight;

  const width =
    containerWidthToContainerHeight < naturalWidthToNaturalHeight
      ? containerWidth
      : Math.min(naturalWidthToNaturalHeight * containerHeight, containerWidth);

  const height =
    containerHeightToContainerWidth < naturalHeightToNaturalWidth
      ? containerHeight
      : Math.min(naturalHeightToNaturalWidth * containerWidth, containerHeight);

  return { width, height };
};

export default calculateImageSizeByContainerAndNaturalSizes;
