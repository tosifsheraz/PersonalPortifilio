import { useEffect, useState } from 'react'

export function useTypewriter(strings, speed = 80, deleteSpeed = 40, pauseDuration = 1800) {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!strings || strings.length === 0) return

    const fullText = strings[currentIndex % strings.length]

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1))
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1))
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseDuration)
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setCurrentIndex((prev) => prev + 1)
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentIndex, strings, speed, deleteSpeed, pauseDuration])

  return currentText
}
