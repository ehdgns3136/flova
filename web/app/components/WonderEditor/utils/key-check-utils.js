/**
 * Determine if pressed key is printable
 * @param evt
 * @returns {boolean}
 */
export function isKeyPrintable(evt) {
  if (typeof evt.which == "undefined") {
    // This is IE, which only fires keypress events for printable keys
    return true;
  } else if (typeof evt.which == "number" && evt.which > 0) {
    // In other browsers except old versions of WebKit, evt.which is
    // only greater than zero if the keypress is a printable key.

    // We need to filter out backspace and ctrl/alt/meta key combinations
    return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which !== 8 && evt.which !== 13
      && evt.which !== 91 && evt.which !== 92 && (evt.which > 46 || evt.which === 32);
  }
  return false;
}

/**
 * Determine if KeyboardEvent key is ime(input method editor) key
 * @param evt
 * @returns {boolean}
 */
export function isImeKey(evt) {
  if (evt.key) {
    return /^[가-힣ㄱ-ㅎㅏ-ㅣㆍ]$/.test(evt.key);
  } else {
    return false;
  }
}

export function isKeyCommand(evt) {
  return evt.which === 13 || evt.which === 8 || evt.which === 9 || evt.which === 46;
}

export function isMacCommandKey(evt) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  // const isWindowOrLinux = navigator.platform.toUpperCase().indexOf('WIN') >= 0 || navigator.platform.toUpperCase().indexOf('LINUX') >= 0;
  const isFireFox = navigator.userAgent.toUpperCase().indexOf('FIREFOX') >= 0;

  if (isMac) {
    if (isFireFox) {
      return evt.which === 224;
    } else {
      return evt.which === 91;
    }
  } else {
    return false;
  }
}
