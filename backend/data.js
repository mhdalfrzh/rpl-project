import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
          name: 'Basir',
          email: 'adminnot@example.com',
          noHandphone: 623,
          nim: 'g666',
          image: '/images/img1.png',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
        },
        {
          name: 'John',
          email: 'usernot@example.com',
          noHandphone: 624,
          nim: 'g777',
          image: '/images/img1.png',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Sepatu Bagus',
            category: 'Sepatu',
            image: '/images/img1.png',
            countInStock: 1,
            price: 120000,
            brand: 'Nike',
            description: 'Good'
        },
        {
            name: 'Sepatu Lama',
            category: 'Sepatu',
            image: '/images/img2.png',
            countInStock: 0,
            price: 10000,
            brand: 'Adidas',
            description: 'Good'
        },{
            name: 'Baru Bagus',
            category: 'Baju',
            image: '/images/img3.png',
            countInStock: 1,
            price: 111000,
            brand: 'Nike',
            description: 'Good'
        },{
            name: 'Bagus',
            category: 'Sepatu',
            image: '/images/img4.png',
            countInStock: 1,
            price: 120000,
            brand: 'Nike',
            description: 'Good'
        },{
            name: 'Sepatu Kaca',
            category: 'Sepatu',
            image: '/images/img5.png',
            countInStock: 1,
            price: 120000,
            brand: 'Nike',
            description: 'Good'
        },{
            name: 'Baju Bagus',
            category: 'Sepatu',
            image: '/images/img6.png',
            countInStock: 1,
            price: 120000,
            brand: 'Nike',
            description: 'Good'
        },
    ],
};

export default data;