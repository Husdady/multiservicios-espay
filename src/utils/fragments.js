// GraphQL Fragments
const fragments = {
	contact: `
		fragment ContactFragment on Contact {
		  location
		  email
		  phone
		  contactPhoto {
		  	url
		  }
		  facebookPage {
		  	url
		  	name
		  }
		}`,
	products: `
		fragment ProductsFragment on Product {
		  name
		  price
		  description
		  defaultImage {
		  	url
		  }
		  createdAt
		}`,
	product: `
		fragment ProductFragment on Product {
		  name
      content
      description
      usageMode
      totalVisits
      benefits {
        _id
        benefit
      }
      images {
      	url
      	width
      	height
      }
		}`,
}

export default fragments
