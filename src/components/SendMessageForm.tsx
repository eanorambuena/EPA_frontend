import React, { useCallback, useEffect, useRef } from 'react'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { ChatSchema, MessageSchema, MessageState } from '../services/schema'
import SubmitButton from './SubmitButton'

interface Props {
  appendMessage: (message: MessageSchema) => void
  chat: ChatSchema
}

export default function SendMessageForm({ appendMessage, chat }: Props) {
  const $form = useRef<HTMLFormElement>(null)
  const $input = useRef<HTMLInputElement>(null)
  const user = useCurrentUser().user

  const sendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!$form.current) {
      return
    }
    const formData = new FormData($form.current)
    const text = formData.get('text') as string
    if (!text) {
      return
    }
    if (!chat.id) {
      return
    }
    if (!user) {
      return
    }

    await appendMessage({
      chatId: chat.id,
      content: text,
      userId: user.id,
      state: MessageState.sent,
      date: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
    })
    $form.current.reset()
  }, [appendMessage, chat, user])

  useEffect(() => {
    if (!$input.current) {
      return
    }
    $input.current.focus()
  }, [chat])

  return (
    <form
      className='flex items-center justify-between w-full h-fit shadow-md gap-4 md:gap-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-b-md'
      onSubmit={sendMessage}
      ref={$form}
    >
      <label
        className='sr-only'
        htmlFor='messageInput'
      >
        Mensaje
      </label>
      <input
        autoFocus
        className='flex-grow max-w-[60%] sm:max-w-full rounded-md px-4 py-2 bg-violet-300 border border-violet-300 placeholder-gray-800 text-gray-800'
        id='messageInput'
        name='text'
        placeholder='Escribe un mensaje...'
        ref={$input}
        required
        type='text'
      />
      <SubmitButton className='flex-grow sm:flex-grow-0'>
        Enviar
      </SubmitButton>
    </form>
  )
}
