import React, { Component } from 'react'
import { Card, Button, Dropdown, Menu } from 'antd';
import styles from './ContentCard.css'
import { connect } from 'dva';

const { Meta } = Card;

@connect(({ shoppingCart }) => ({
  cartData: shoppingCart.cartData,
  count: shoppingCart.count
}))
class ContentCard extends Component {
  
  addToCart = async item => {
    const { dispatch, data } = this.props
    const newData = data || []
    
    newData.size = item

    await dispatch({
      type: 'shoppingCart/addToCart',
      payload: {
        msg: newData,
      }
    })
  }

  render() {
    const { data } = this.props

    return (
      <Card
        hoverable='true'
        className={styles.card}
        // cover={<img alt={data.key} src={`./imgs/${data.sku}_1.jpg`} />}
        bodyStyle={{padding: 0}}
      >
        {data.sku ? 
          <img alt={data.key} src={`./imgs/${data.sku}_1.jpg`} style={{ width: 218, height: 316 }} /> :
          <div style={{ width: 218, height: 316, background: '#eee' }}></div>
        }
        <div className={styles.freeShipping}>{data.isFreeShipping ? 'Free Shipping': ''}</div>
        <Meta title={data.title} style={{margin: '10px 0', textAlign: 'center'}}/>
        <p style={{fontWeight: '600', textAlign: 'center', marginBottom: 0, fontSize: '18px'}}>
          ${data.price.toFixed(2)}
        </p>
        <p style={{fontWeight: '500', textAlign: 'center', marginBottom: '10px'}}>
          or {data.installments} x ${(data.price / data.installments).toFixed(2)}
        </p>
        <Dropdown 
          overlay={
            <Menu>
              {data.availableSizes.map(item => 
                <Menu.Item key={item} onClick={() => this.addToCart(item)}>选择尺寸：{item}</Menu.Item>
              )}
            </Menu>
          } 
          placement="topCenter"
        >
          <Button 
            className={styles.addBtn} 
            type="primary" 
          >
            Add To Cart
          </Button>
        </Dropdown>
      </Card>
    )
  }
}

export default ContentCard
