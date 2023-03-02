export const getFileByUrl = (url: string | URL): string => {
  return new URL(url, import.meta.url).href;
};
export const getImageByName = (imagesPath: string | URL): string =>
  getFileByUrl(`/imgs/${imagesPath}`);
