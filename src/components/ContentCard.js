import React from 'react'
import { Card, Button } from 'antd';
import styles from './ContentCard.css'
import { connect } from 'dva';

const { Meta } = Card;

@connect(({indexPage}) => ({
  cartData: indexPage.cartData,
  count: indexPage.count
}))
class ContentCard extends React.Component {
  
  addToCart = async() => {
    
    await this.props.dispatch({
      type: 'indexPage/addToCart',
      payload: {
        msg: this.props.data,
        count: this.props.count + 1
      }
    })

    // console.log(this.props.cart)
  }
  render() {
    const {data} = this.props
    return (
      <Card
        hoverable='true'
        style={{ width: 240, padding: '10px', border: 'none', cursor: 'inherit', position: 'relative', marginTop: '30px' }}
        cover={<img alt={data.key} src={`./imgs/${data.sku}_1.jpg`} />}
        bodyStyle={{padding: 0}}
      >
        <div style={{fontSize: '12px', position: 'absolute', right: 10, top: 10, background: 'black', color: 'white', padding: '0 2px', borderRadius: '2px'}}>{data.isFreeShipping ? 'Free Shipping': ''}</div>
        <Meta title={data.title} style={{margin: '10px 0', textAlign: 'center'}}/>
        <p style={{fontWeight: '600', textAlign: 'center', marginBottom: 0, fontSize: '18px'}}>${data.price.toFixed(2)}</p>
        <p style={{fontWeight: '500', textAlign: 'center', marginBottom: '10px'}}>or {data.installments} x ${(data.price / data.installments).toFixed(2)}</p>
        <Button 
          className={styles.addBtn} 
          type="primary" 
          style={{height: '40px', width: '218px', border: 'none', borderRadius: 0, background: 'black', fontSize: '18px'}}
          onClick={this.addToCart}
        >
          Add To Cart
        </Button>
      </Card>
    )
  }
}

export default ContentCard
