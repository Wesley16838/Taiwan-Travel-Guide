import { InputProps } from '../../types/components'
import styles from './Inputbox.module.scss'
const Inputboxs = ({type, name, required, onChange, placeholder, classname, ...props}: InputProps) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(onChange) onChange(e.currentTarget.value)
    }
    return(
        <div className={`${classname && styles[classname]}`}>
            <label>
                <input type={type} id={name} name={name} required={required} onChange={(e) => handleOnChange(e)} placeholder={placeholder}/>
            </label> 
        </div>
        
    )
}

export default Inputboxs;