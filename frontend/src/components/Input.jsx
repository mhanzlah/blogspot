import clsx from 'clsx'

const Input = ({ type = 'text', className, ...props }) => {
    return (
        <input type={type} className={clsx('', className)} {...props} />
    )
}

export default Input
