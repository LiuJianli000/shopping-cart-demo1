import React from 'react'
import styles from './FloatCardList.css'
import { Button, Icon } from 'antd'
import { connect } from 'dva'

const ButtonGroup = Button.Group;

@connect(({ shoppingCart }) => ({
  count: shoppingCart.count
}))
class FloatCardList extends React.Component {
  addBtn = () => {
    const { data: { id, quantity, size }, dispatch } = this.props
    
    dispatch({
      type: 'shoppingCart/plusOne',
      payload: {
        id,
        size,
        quantity: quantity + 1
      }
    })
  }

  minusBtn = () => {
    const { data: { id, quantity, size }, dispatch } = this.props

    if (quantity > 1) {
      dispatch({
        type: 'shoppingCart/plusOne',
        payload: {
          id,
          size,
          quantity: quantity - 1
        }
      })
    }
  }

  handleClose = () => {
    const { data: { id, size }, dispatch } = this.props

    dispatch({
      type: 'shoppingCart/handleClose',
      payload: {
        id,
        size,
        quantity: 0
      }
    })
  }

  render() {
    const { data } = this.props
    return (
      <div className={styles.main}>
        <img className={styles.img} alt="" src={`./imgs/${data.sku}_2.jpg`}></img>
        <div className={styles.info}>
          <p>{data.title}</p>
          <p>{data.size} | {data.style}</p>
          <p>Quantity: {data.quantity}</p>
        </div>
        <div className={styles.action}>
          <div style={{ color: 'black', fontSize: '18px', fontWeight: '1000', cursor: 'pointer' }}>
            <Icon
              className={styles.icon_close}
              type="close"
              onClick={this.handleClose}
            />
          </div>
          <div style={{ color: 'darkgoldenrod', fontSize: '18px', marginBottom: '10px' }}>
            $ {data.price.toFixed(2)} x {data.quantity}
          </div>
          <div>
            <ButtonGroup>
              <Button 
                type="primary" 
                size="small" 
                icon="minus"
                className={styles.btn}
                style={{ borderRadius: '3px 0 0 3px' }} 
                onClick={this.minusBtn} 
                disabled={data.quantity === 1} 
              />
              <Button 
                type="primary" 
                size="small" 
                icon="plus" 
                className={styles.btn}
                style={{ borderRadius: '0 3px 3px 0' }} 
                onClick={this.addBtn} 
              />
            </ButtonGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default FloatCardList