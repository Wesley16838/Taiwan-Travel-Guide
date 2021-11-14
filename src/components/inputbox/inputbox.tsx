import { useEffect, useState } from 'react'
import { InputProps } from '../../types/components'
import styles from './Inputbox.module.scss'
const Inputboxs = ({type, name, required, onChange, placeholder, classname, defaultValue, ...props}: InputProps) => {
    const [value, setValue] = useState(defaultValue)
    useEffect(()=>{
        setValue(defaultValue)
    }, [defaultValue])
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.currentTarget.value)
        if(onChange) onChange(e.currentTarget.value)
    }
    return(
        <div className={`${classname && styles[classname]}`}>
            <label>
                <input 
                    value={value} 
                    type={type} 
                    id={name} 
                    name={name} 
                    required={required} 
                    onChange={(e) => handleOnChange(e)} 
                    placeholder={placeholder}
                />
            </label> 
        </div>
        
    )
}

export default Inputboxs;