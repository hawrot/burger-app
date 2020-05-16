import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
          street: '',
          postCode: ''
        }
    }
    render() {
        return (
            <div>
                <h4>Enter your Contact Data</h4>
                <form action="">
                    <input name="name" placeholder="Your Name" type="text"/>
                    <input name="email" placeholder="email" type="text"/>
                    <input name="street" placeholder="street" type="text"/>
                    <input name="postCode" placeholder="Post Code" type="text"/>
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;
