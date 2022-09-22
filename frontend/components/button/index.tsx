import styles from './index.module.css'

export enum ButtonColor {
  RED,
  GREEN,
  BLUE
}

type ButtonProps = {
  content: string,
  color?: ButtonColor,
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  classes?: string
}

const Button = (props: ButtonProps) => {
  const getColor = (): string => {
    switch(props.color) {
      case ButtonColor.GREEN: {
        return styles.green_button
      }
      case ButtonColor.BLUE: {
        return styles.blue_button
      }
      case ButtonColor.RED: {
        return styles.red_button
      }
      default: {
        return styles.green_button
      }
    }
  }

  return (
    <button type="button" className={`${getColor()} ${props.classes}`} onClick={(e) => props.onClick(e)}>
      {props.content}
    </button>
  )
}

export default Button