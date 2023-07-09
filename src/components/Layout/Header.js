import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import CartButton from './CartButton';

const Header = ({ onOpenCart }) => {

    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <CartButton buttonClickHandler={onOpenCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='meals' />
            </div>
        </>
    )
}

export default Header