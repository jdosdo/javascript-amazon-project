import {Product , Clothing, Appliance} from '../../data/products.js'

describe('test suite: Product', () => {
  const product = new Product ({
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  });

  it('should create an instance from class Product', () => {
    expect(product instanceof Product).toBe(true);
  })

  it('should create a Product instance with correct properties', () => {
    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
    expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(product.rating).toEqual({stars: 4.5, count: 87});
    expect(product.priceCents).toEqual(1090);
  });

  it('should execute its methods correctly', () => {
    expect(product.getStarsUrl()).toEqual(`images/ratings/rating-45.png`);
    expect(product.getPrice()).toEqual('$10.90');
    expect(product.extraInfoHTML()).toBe('');
  });
});

describe('test suite: Clothing', () => {
  const clothing = new Clothing({
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  });

  it('should be a child class of Product', () => {
    expect(Object.getPrototypeOf(Clothing.prototype)).toEqual(Product.prototype)
  });

  it('should create an instance from Clothing', () => {
    expect(clothing instanceof Clothing).toBe(true);
  });

  it('should create an instance with correct properties', () => {
    expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(clothing.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
    expect(clothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    expect(clothing.rating).toEqual({stars: 4.5, count: 56});
    expect(clothing.priceCents).toEqual(799);
    expect(clothing.type).toEqual('clothing');
    expect(clothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
  });

  it('should execute its methods correctly', () => {
    expect(clothing.getStarsUrl()).toEqual(`images/ratings/rating-45.png`);
    expect(clothing.getPrice()).toEqual('$7.99');
    expect(clothing.extraInfoHTML()).toContain('Size Chart');
  })
});

describe('test suite: Appliance', () => {
  const appliance = new Appliance({
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ], 
    type: "appliance",
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png"
  });

  it('should be a child class from Product', () => {
    expect(Object.getPrototypeOf(Appliance.prototype)).toEqual(Product.prototype);
  });

  it('should make an instance from Appliance', () => {
    expect(appliance instanceof Appliance).toBe(true);
  });

  it('should make an instance with correct properties', () => {
    expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(appliance.image).toEqual('images/products/black-2-slot-toaster.jpg');
    expect(appliance.name).toEqual('2 Slot Toaster - Black');
    expect(appliance.rating).toEqual({stars: 5, count: 2197});
    expect(appliance.priceCents).toEqual(1899);
    expect(appliance.type).toEqual('appliance');
    expect(appliance.instructionsLink).toEqual('images/appliance-instructions.png');
    expect(appliance.warrantyLink).toEqual('images/appliance-warranty.png');
  });

  it('should execute its method correctly', () => {
    expect(appliance.getStarsUrl()).toEqual('images/ratings/rating-50.png');
    expect(appliance.getPrice()).toEqual('$18.99');
    expect(appliance.extraInfoHTML()).toContain('Instruction');
    expect(appliance.extraInfoHTML()).toContain(`
      <a href="images/appliance-instructions.png" target="_blank">`);
    expect(appliance.extraInfoHTML()).toContain('Warranty');
    expect(appliance.extraInfoHTML()).toContain(`
      <a href="images/appliance-warranty.png" target="_blank">`)
  });
})

// console.log(Clothing.prototype);
// console.log(Product.prototype);
// console.log(Object.getPrototypeOf(Clothing.prototype));