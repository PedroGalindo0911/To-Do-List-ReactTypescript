import { useEffect, useRef, useState } from 'react'

interface Props {
  id: string
  title: string
  completed: boolean
  setCompleted: (id: string, completed: boolean) => void
  setTitle: (params: { id: string, title: string }) => void
  isEditing: string
  setIsEditing: (completed: string) => void
  removeTodo: (id: string) => void
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  setCompleted,
  setTitle,
  removeTodo,
  isEditing,
  setIsEditing
}) => {
  const [editedTitles, setEditedTitles] = useState(title)
  const inputEditTitles = useRef<HTMLInputElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitles(editedTitles.trim())

      if (editedTitles !== title) {
        setTitle({ id, title: editedTitles })
      }

      if (editedTitles === '') removeTodo(id)

      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitles(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitles.current?.focus()
  }, [isEditing])

  return (
    <>
      <div className='view'>
        <input
          className='toggle'
          checked={completed}
          type='checkbox'
          onChange={(e) => { setCompleted(id, e.target.checked) }}
        />
        <label>{title}</label>
        <button className='destroy' onClick={() => { removeTodo(id) }}></button>
      </div>

      <input
        className='edit'
        value={editedTitles}
        onChange={(e) => { setEditedTitles(e.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') }}
        ref={inputEditTitles}
      />
    </>
  )
}