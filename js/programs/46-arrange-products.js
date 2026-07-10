const brand = {
  products: [
    {
      brand: "Electronics",
      products: [
        {
          brand: "Laptop",
          products: []
        },
        {
          brand: "Accessories",
          products: [
            {
              brand: "Mouse",
              products: []
            },
            {
              brand: "Keyboard",
              products: []
            }
          ]
        },
        {
          brand: "Monitor",
          products: []
        }
      ]
    }
  ]
};

function buildBrandMap(brand, result = {}, parent = "none") {
  if (parent === "none") {
    result.none =
      brand.products.length === 1
        ? brand.products[0].brand
        : brand.products.map(item => item.brand);
  }

  for (const item of brand.products) {
    if (item.products.length > 0) {
      result[item.brand] = item.products.map(child => child.brand);
      buildBrandMap(item, result, item.brand);
    }
  }

  return result;
}


const output = buildBrandMap(brand);

console.log(output);