import React, { useEffect } from 'react'
import { FaRegCheckCircle } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { BiError } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { FiInfo } from "react-icons/fi";
import clsx from 'clsx';


interface Props {
    variant?: 'success' | 'error' | 'warning' | 'info'
    message: string
}

const Alert = ({ variant = 'success', message }: Props) => {

    const [show, setShow] = React.useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 500);
    })

    return (
        <div className={clsx(
            'flex items-center gap-2 rounded-lg border-2 p-2 transition-all transform duration-300 ease-in-out',
            show ? 'opacity-100' : 'opacity-0',
            variant === 'success' && 'text-green-500 border-green-500 bg-green-500/10',
            variant === 'warning' && 'text-yellow-500 border-yellow-500 bg-yellow-500/10',
            variant === 'error' && 'text-red-500 border-red-500 bg-red-500/10',
            variant === 'info' && 'text-blue-500 border-blue-500 bg-blue-500/10',)}
        >
            {variant === 'success' && <FaRegCheckCircle />}
            {variant === 'warning' && <RiErrorWarningLine />}
            {variant === 'error' && <BiError />}
            {variant === 'info' && <FiInfo />}
            <p>{message}</p>
            <IoMdClose />

        </div>
    )
}

export default Alert