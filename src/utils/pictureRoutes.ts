import { ROUTES } from '@/constants';

export const buildPicturePath = (pictureId: string) =>
  `${ROUTES.REVIVED_PAINTINGS}${ROUTES.PICTURE}/${encodeURIComponent(pictureId)}`;

export const buildPictureRoute = (pictureId: string, openedFrom?: string) => {
  const picturePath = buildPicturePath(pictureId);

  if (!openedFrom) {
    return picturePath;
  }

  return `${picturePath}?from=${encodeURIComponent(openedFrom)}`;
};

export const getPictureOpenedFrom = (search: string) =>
  new URLSearchParams(search).get('from') ?? undefined;
