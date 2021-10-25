import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { DropDownProps, DataItemType } from '../../types/components'
import styles from './Dropdown.module.scss'
import dropdownIcon from '../../../public/dropdown_icon.png'
const Dropdowns = ({data, onClick, type}: DropDownProps) => {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState('');
    const dropdownRef = useRef<any>();

    useEffect(() => {
        function handleClickOutside(event: any) {
          if (dropdownRef.current && !dropdownRef?.current?.contains(event.target)) {
            setOpen(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [dropdownRef, setOpen])

    const handleOnToggle = () => {
        setOpen(!open)
    }

    const handleOnClick = (event: React.MouseEvent<HTMLElement>):void => {
        setSelection(event.currentTarget.innerText);
        setOpen(false);
        if (onClick) onClick(type, event.currentTarget.id);
    };

    return(
        <div className={styles.wrapper} aria-labelledby="action menu" ref={dropdownRef}>
            <div className={`${styles.action} ${open && styles.open}`} tabIndex={0} role="button" onClick={() => handleOnToggle()}>
                <p>{selection !== "" ? selection : data.defaultValue.label}</p>
                <div className={styles.arrow}>
                    <Image
                    src={dropdownIcon}
                    alt={'Dropdown'}
                    width={24}
                    height={24}
                />
                </div>
                
            </div>
            {open && <ul className={styles.menu}>
                {
                    data.listing.map((item: DataItemType) => {
                        return (
                            <li key={item.label} onClick={(e) => handleOnClick(e)} aria-labelledby={item.label} id={item.value} className={styles.item}>
                                <p>{item.label}</p> {item.label === selection && <p>✓</p>}
                            </li>
                        );
                    })
                }
            </ul>}
        </div>
    )
}

export default Dropdowns;