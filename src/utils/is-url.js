export default function isUrl(url) {
    try {
      new URL(url);
    } catch {
      return false;
    }
  
    return true;
  }
  