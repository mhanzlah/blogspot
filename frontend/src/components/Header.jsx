import clsx from 'clsx'

const Header = ({ content, className }) => {
    return (
        <div className={clsx('py-8 md:py-6 px-3 border-b text-3xl md:text-5xl font-light text-center uppercase', className)}>
            <header>
                <h1>{content}</h1>
            </header>
        </div>
    )
}

export default Header
