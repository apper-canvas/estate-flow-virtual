import React from 'react'
import Input from '../atoms/Input'
import Label from '../atoms/Label'
import Textarea from '../atoms/Textarea'
import Select from '../atoms/Select'

const FormField = ({ type = 'text', label, id, options, ...props }) => {
  const commonProps = {
    id,
    label,
    ...props
  }

  switch (type) {
    case 'textarea':
      return <Textarea {...commonProps} />
    case 'select':
      return (
        <Select {...commonProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )
    case 'text':
    case 'email':
    case 'tel':
    case 'number':
    case 'password':
      return <Input type={type} {...commonProps} />
    default:
      return (
        <div>
          {label &amp;&amp; <Label htmlFor={id}>{label}</Label>}
          <p className="text-red-500">Unsupported field type: {type}</p>
        </div>
      )
  }
}

export default FormField