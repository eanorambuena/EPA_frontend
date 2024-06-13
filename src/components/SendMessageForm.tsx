import React, { useCallback, useEffect, useRef } from 'react'
import { Orm } from '../services/orm'
import { Auth, ChatSchema, MessageSchema } from '../services/schema'
import SubmitButton from './SubmitButton'

interface Props {
  appendMessage: (message: MessageSchema) => void
  chat: ChatSchema
}

export default function SendMessageForm({ appendMessage, chat }: Props) {
  const $form = useRef<HTMLFormElement>(null)
  const $input = useRef<HTMLInputElement>(null)

  const sendMessage = useCallback((e: React.FormEvent) => {
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
    appendMessage({
      id: Orm.Messages.all().length + 1,
      chat: chat,
      message: text,
      user: Auth.getCurrentUser(),
      createdAt: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
    })
    $form.current.reset()
  }, [appendMessage, chat])

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
        htmlFor='text'
      >
        Mensaje
      </label>
      <input
        autoFocus
        className='flex-grow max-w-[60%] sm:max-w-full rounded-md px-4 py-2 bg-violet-300 border border-violet-300 placeholder-gray-800 text-gray-800'
        name='text'
        placeholder='Escibe un mensaje...'
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
