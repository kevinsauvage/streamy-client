export const stopScroll = () => {
  const body = document.querySelector("body");
  body.style.overflow = "hidden";
};

export const unstopScroll = () => {
  const body = document.querySelector("body");
  body.style.overflowY = "auto";
};
