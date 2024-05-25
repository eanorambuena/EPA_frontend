export default class TTS {
  static tts = window.speechSynthesis

  static speak(content: string) {
    if (!('speechSynthesis' in window)) {
      return console.warn('El navegador no es moderno, por lo que no puede ejecutar texto a voz')
    }
    TTS.tts.cancel()
    const utterThis = new SpeechSynthesisUtterance(content)
    utterThis.lang = 'es-ES'
    TTS.tts.speak(utterThis)
  }
}
