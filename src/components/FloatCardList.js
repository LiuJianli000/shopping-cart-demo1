import React from 'react'
import styles from './FloatCardList.css'
import { Button,Icon } from 'antd'
import {connect} from 'dva'

const ButtonGroup = Button.Group;

@connect(({indexPage}) => ({
  count: indexPage.count
}))
class FloatCardList extends React.Component {
  addBtn = () => {
    this.props.dispatch({
      type: 'indexPage/plusOne',
      payload: this.props.count + 1
    })
  }

  minusBtn = () => {
    this.props.dispatch({
      type: 'indexPage/minusOne',
      payload: this.props.count - 1
    })
  }

  render() {
    const {data} = this.props
    return (
      <div className={styles.main}>
        <img className={styles.img} alt="" src={`./imgs/${data.sku}_2.jpg`}></img>
        <div className={styles.info}>
          <p>{data.title}</p>
          <p>{data.availableSizes.map(res => (res + ' '))} | {data.style}</p>
          <p>Quantity: 1</p>
        </div>
        <div className={styles.action}>
          <div style={{ color: 'black', fontSize: '18px', fontWeight: '1000', cursor: 'pointer' }}><Icon className={styles.icon_close} type="close" /></div>
          <div style={{ color: 'darkgoldenrod', fontSize: '18px', marginBottom: '10px' }}>$ 9.00</div>
          <div>
            <ButtonGroup>
              <Button type="primary" size="small" icon="minus" style={{borderRadius: 0}} onClick={this.minusBtn}/>
              <Button type="primary" size="small" icon="plus" style={{borderRadius: 0}} onClick={this.addBtn}/>
            </ButtonGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default FloatCardList