import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import CartButton from './CartButton';

const Header = ({ onOpenCart }) => {

    return (
        <>
            <header className={classes.header}>
                <h1>React Food Order App</h1>
                <CartButton buttonClickHandler={onOpenCart} />
            </header>
            <div className={classes.hero}>
                <div className={classes['main-image']}>
                    <img src={mealsImage} alt='meals' />
                </div>
            </div>

        </>
    )
}

export default Header