const cart = require('../models/cart');
const Customer = require('../models/customer')
const mongoose = require('mongoose');
const Vendor = require('../models/Vendor');
const Product = require('../models/product');

// use the new name of the database
const url = 'mongodb://localhost:27017/Bhojmandu_test';
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});


//customer testing
describe('Customer  Schema test anything', () => {
  it('Add customer testing anything', () => {
    const customer = {
      'fname': 'test',
      'lname': 'testlname',
      'email': 'email11111111111111111@gmail.com',
      'password': 'password',
      'number': '1312312313'
    };

    return Customer.create(customer)

      .then((cus) => {
        expect(cus.fname).toEqual('test');
      });
  });



  it('to test the update', async () => {
    return Customer.findOneAndUpdate({ _id: Object('607e67ae6da48f12aa9a6f8f') }, {
      $set: { fname: 'test' }
    }).then((data) => {
      expect(data.fname).toEqual('test')
    })
  });

  //deleting
  it('to test the delete delete is working or not',
    async () => {
      const status = await Customer.deleteOne({ _id: Object('607e6676159f0b08b647aa16') }); expect(status.ok).toBe(1);
    });
})

//vendor testing
describe('Vendor  Schema test vendor', () => {
  it('Add vendor testing', () => {
    const vendor = {
      'vendorName': 'testVendor',
      'vendorEmail': 'vendor111111@gma1il.com',
      'vendorAddress': 'purano banehsor',
      'vendorPassword': 'password',
      'photo': 'noimg.png'
    };

    return Vendor.create(vendor)

      .then((vendor) => {
        expect(vendor.vendorName).toEqual('testVendor');
      });
  });


  it('to test the update', async () => {
    return Vendor.findOneAndUpdate({ _id: Object('607e6574159f0b08b647aa14') }, {
      $set: { vendorName: 'testVendor1' }
    }).then((data) => {
      expect(data.vendorName).toEqual('testVendor1')
    })
  });


  //deleting the test
  it('to test the delete delete is working or not',
    async () => {
      const status = await Vendor.deleteOne({ _id: Object('607e6560c574900c26fdf44a') }); expect(status.ok).toBe(1);
    });


})



//product testing
describe('product Schema test anything', () => {
  // the code below is for insert testing
  it('Add Product testing anything', () => {
    const product = {
      name: 'testproduct',
      desc: 'testproduct Description',
      price: '200',
      vendorId: '607e5e46cc94f2f1dda48b97',
    };
    return Product.create(product).then((product) => {
      expect(product.name).toEqual('testproduct');
    });
  });

  it('to test the update', async () => {
    return Product.findOneAndUpdate(
      { _id: Object('606bbfad6808f32ea4103718') },
      { $set: { name: 'testproduct' } }
    ).then((product) => {
      expect(product.name).toEqual('testproduct');
    });
  });
  // the code below is for delete testing
  it('to test the delete Product is working or not', async () => {
    const status = await Product.deleteMany();
    expect(status.ok).toBe(1);
  });
});


//cart item testing

describe('cart Schema testing', () => {
  // the code below is for insert testing
  it('Cart Item testing ', () => {
    const cart = {
      itemId: '607e5e46cc94f2f1dda48b96',
      userId: '607e5e46cc94f2f1dda48b96',
    };
    return CartItem.create(cart).then((pro_ret) => {
      expect(pro_ret.CartItemid).toEqual('606c4a6b436ec7379cb8321a');
    });
  });
  // the code below is for delete testing
  it('to test the delete Product is working or not', async () => {
    const status = await CartItem.deleteMany();
    expect(status.ok).toBe(1);
  });
  //   it('to test the update', async () => {
  //     return CartItem.findOneAndUpdate(
  //       { _id: Object('606bbfad6808f32ea4103718') },
  //       { $set: { CartItemUser: '606bbfad6808f32ea4103718' } }
  //     ).then((pp) => {
  //       expect(pp.CartItemUser).toEqual('606bbfad6808f32ea4103721');
  //     });
  //   });
});



