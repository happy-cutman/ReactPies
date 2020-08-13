import React from 'react'
import cn from 'classnames'

const Button = ({className, outline, children}) => {
    return (
        <button className={cn('button', className, { // props.className дополнительный класс пераданный в пропсах, кнопка в хэдере
            'button--outline': outline // класс применяется если есть в пропсах outline
        })}>
            {children}
        </button>
    );
};

export default Button;

