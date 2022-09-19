import styles from './index.module.css'

export enum ButtonColor {
  RED,
  GREEN
}

type ButtonProps = {
  content: string,
  color?: ButtonColor
}

const Button = (props: ButtonProps) => {

  const getColor = (): string => {
    if(!props.color) {
      return styles.green_button
    }
    return props.color === ButtonColor.GREEN ? styles.green_button : styles.red_button
  }

  return (
    <button type="button" className={getColor()}>
      {props.content}
    </button>
  )
}

export default Button