const imageUrls = import.meta.glob('../images/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

export const resolveImageUrl = (imagePath) => {
  if (!imagePath) return '';

  const normalizedPath = imagePath.replace(/^\//, '../');
  const imageKey = Object.keys(imageUrls).find((key) => key.endsWith(normalizedPath));

  return imageKey ? imageUrls[imageKey] : imagePath;
};
