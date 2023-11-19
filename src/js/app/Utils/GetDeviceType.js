export const getUserAgentDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  let deviceType = "Unknown";

  // Check for specific keywords in the user agent string to identify device type
  if (/Android/i.test(userAgent)) {
    deviceType = "Android";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    deviceType = "iOS";
  } else if (/Windows Phone/i.test(userAgent)) {
    deviceType = "Windows Phone";
  } else if (/Windows/i.test(userAgent)) {
    deviceType = "Windows";
  } else if (/Macintosh/i.test(userAgent)) {
    deviceType = "Macintosh";
  } else if (/Linux/i.test(userAgent)) {
    deviceType = "Linux";
  }

  return deviceType;
};
