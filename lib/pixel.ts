export const pageView = () => {
  const w = window as any;
  if (!w.fbq) {
    return;
  }
  w.fbq("track", "PageView");
};

export const event = (name: string, options = {}) => {
  const w = window as any;
  if (!w.fbq) {
    return;
  }
  w.fbq("track", name, options);
};
