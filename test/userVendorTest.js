const Customer = require('../models/customer')
const mongoose = require('mongoose');
const Vendor = require('../models/Vendor');

const url = 'mongodb://localhost:27017/Bhojmandu_test';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true, 
        useCreateIndex: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Customer  Schema test anything', () => {
    it('Add customer testing anything', () => {
        const customer = {
            'fname': 'test',
            'lname': 'testlname',
            'email': 'email1@gmail.com',
            'password': 'password',
            'number':'1312312313'
        };

        return Customer.create(customer)

            .then((cus) => {
                expect(cus.fname).toEqual('test');
            });
    });

    // it('to test the delete delete is working or not',
    //     async () => {
    //         const status = await Customer.deleteMany(); expect(status.ok).toBe(1);
    //     });

    it('to test the update', async () => {
        return Customer.findOneAndUpdate({ _id: Object('607e5d5e4e7f6eed398f157f') }, {
            $set: { fname: 'test' }
        }).then((data) => { expect(data.fname).toEqual('manish') 
    })
    });
})


describe('Vendor  Schema test vendor', () => {
    it('Add vendor testing', () => {
        const vendor = {
            'vendorName': 'testVendor',
            'vendorEmail': 'vendor@gmail.com',
            'vendorAddress': 'purano banehsor',
            'vendorPassword': 'password',
            'photo':'noimg.png'
        };

        return Vendor.create(vendor)

            .then((vendor) => {
                expect(vendor.vendorName).toEqual('testVendor');
            });
    });

    // it('to test the delete delete is working or not',
    //     async () => {
    //         const status = await Vendor.deleteMany(); expect(status.ok).toBe(1);
    //     });

    it('to test the update', async () => {
        return Vendor.findOneAndUpdate({ _id: Object('607e5e46cc94f2f1dda48b97') }, {
            $set: { vendorName: 'manishVendor' }
        }).then((data) => { expect(data.vendorName).toEqual('testVendor') 
    })
    });
})