import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Kitchen from "./models/kitchen.model.js";
import Menu from "./models/menu.model.js";
import Order from "./models/order.model.js";
import User from "./models/user.model.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Kitchen.deleteMany({});
    await Menu.deleteMany({});
    await Order.deleteMany({});
    console.log("Cleared existing data.");

    // ========== USERS ==========
    const hashedPassword = await bcrypt.hash("Password@123", 10);

    const users = await User.insertMany([
      {
        username: "admin_vikas",
        email: "admin@cloudkitchen.com",
        password: hashedPassword,
        role: "admin",
        avatar: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/avatars/admin.png",
        },
      },
      {
        username: "chef_rahul",
        email: "rahul@kitchen.com",
        password: hashedPassword,
        role: "admin",
        avatar: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/avatars/chef1.png",
        },
      },
      {
        username: "chef_priya",
        email: "priya@kitchen.com",
        password: hashedPassword,
        role: "admin",
        avatar: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/avatars/chef2.png",
        },
      },
      {
        username: "customer_amit",
        email: "amit@gmail.com",
        password: hashedPassword,
        role: "user",
        avatar: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/avatars/user1.png",
        },
      },
      {
        username: "customer_neha",
        email: "neha@gmail.com",
        password: hashedPassword,
        role: "user",
        avatar: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/avatars/user2.png",
        },
      },
      {
        username: "customer_ravi",
        email: "ravi@gmail.com",
        password: hashedPassword,
        role: "user",
        avatar: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/avatars/user3.png",
        },
      },
    ]);

    console.log(`Seeded ${users.length} users.`);

    const [admin, chefRahul, chefPriya, amit, neha, ravi] = users;

    // ========== KITCHENS ==========
    const kitchens = await Kitchen.insertMany([
      {
        name: "Rahul's Biryani House",
        owner: chefRahul._id,
        description:
          "Authentic Hyderabadi Biryani made with love and tradition.",
        cuisine: ["Biryani", "Mughlai", "North Indian"],
        address: {
          street: "45, MG Road",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "500001",
        },
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/kitchens/biryani-house.jpg",
        },
        rating: 4.5,
        totalReviews: 120,
        isOpen: true,
        deliveryTime: 35,
        deliveryCharge: 30,
      },
      {
        name: "Priya's South Kitchen",
        owner: chefPriya._id,
        description: "Fresh South Indian meals - Dosa, Idli, Vada and more.",
        cuisine: ["South Indian", "Kerala", "Tamil"],
        address: {
          street: "12, Anna Nagar",
          city: "Chennai",
          state: "Tamil Nadu",
          pincode: "600040",
        },
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/kitchens/south-kitchen.jpg",
        },
        rating: 4.3,
        totalReviews: 85,
        isOpen: true,
        deliveryTime: 25,
        deliveryCharge: 20,
      },
      {
        name: "Delhi Darbar",
        owner: chefRahul._id,
        description: "Royal Mughlai cuisine with kebabs, curries and naans.",
        cuisine: ["Mughlai", "North Indian", "Tandoor"],
        address: {
          street: "78, Chandni Chowk",
          city: "Delhi",
          state: "Delhi",
          pincode: "110006",
        },
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/kitchens/delhi-darbar.jpg",
        },
        rating: 4.7,
        totalReviews: 200,
        isOpen: true,
        deliveryTime: 40,
        deliveryCharge: 40,
      },
    ]);

    console.log(`Seeded ${kitchens.length} kitchens.`);

    const [biryaniHouse, southKitchen, delhiDarbar] = kitchens;

    // ========== MENU ITEMS ==========
    const menuItems = await Menu.insertMany([
      // Rahul's Biryani House items
      {
        name: "Chicken Biryani",
        description:
          "Aromatic basmati rice cooked with tender chicken pieces and spices.",
        price: 250,
        category: "non-veg",
        foodType: "main-course",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/chicken-biryani.jpg",
        },
        kitchen: biryaniHouse._id,
        isAvailable: true,
        rating: 4.6,
        totalOrders: 350,
      },
      {
        name: "Mutton Biryani",
        description: "Slow-cooked mutton with fragrant rice and saffron.",
        price: 350,
        category: "non-veg",
        foodType: "main-course",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/mutton-biryani.jpg",
        },
        kitchen: biryaniHouse._id,
        isAvailable: true,
        rating: 4.8,
        totalOrders: 200,
      },
      {
        name: "Veg Biryani",
        description:
          "Mixed vegetables cooked in dum style with aromatic spices.",
        price: 180,
        category: "veg",
        foodType: "main-course",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/veg-biryani.jpg",
        },
        kitchen: biryaniHouse._id,
        isAvailable: true,
        rating: 4.2,
        totalOrders: 150,
      },
      {
        name: "Chicken 65",
        description: "Spicy deep-fried chicken starter with curry leaves.",
        price: 200,
        category: "non-veg",
        foodType: "starter",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/chicken-65.jpg",
        },
        kitchen: biryaniHouse._id,
        isAvailable: true,
        rating: 4.4,
        totalOrders: 180,
      },
      {
        name: "Gulab Jamun",
        description: "Soft milk dumplings soaked in rose-flavored sugar syrup.",
        price: 80,
        category: "veg",
        foodType: "dessert",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/gulab-jamun.jpg",
        },
        kitchen: biryaniHouse._id,
        isAvailable: true,
        rating: 4.5,
        totalOrders: 100,
      },

      // Priya's South Kitchen items
      {
        name: "Masala Dosa",
        description: "Crispy rice crepe stuffed with spiced potato filling.",
        price: 120,
        category: "veg",
        foodType: "main-course",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/masala-dosa.jpg",
        },
        kitchen: southKitchen._id,
        isAvailable: true,
        rating: 4.5,
        totalOrders: 400,
      },
      {
        name: "Idli Sambar",
        description: "Steamed rice cakes served with hot sambar and chutneys.",
        price: 80,
        category: "veg",
        foodType: "snack",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/idli-sambar.jpg",
        },
        kitchen: southKitchen._id,
        isAvailable: true,
        rating: 4.3,
        totalOrders: 500,
      },
      {
        name: "Medu Vada",
        description: "Crispy urad dal fritters served with coconut chutney.",
        price: 70,
        category: "veg",
        foodType: "snack",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/medu-vada.jpg",
        },
        kitchen: southKitchen._id,
        isAvailable: true,
        rating: 4.1,
        totalOrders: 300,
      },
      {
        name: "South Indian Thali",
        description:
          "Complete meal with rice, sambar, rasam, poriyal, curd and papad.",
        price: 200,
        category: "veg",
        foodType: "thali",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/south-thali.jpg",
        },
        kitchen: southKitchen._id,
        isAvailable: true,
        rating: 4.6,
        totalOrders: 250,
      },
      {
        name: "Filter Coffee",
        description: "Traditional South Indian filter coffee with fresh milk.",
        price: 50,
        category: "veg",
        foodType: "beverage",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/filter-coffee.jpg",
        },
        kitchen: southKitchen._id,
        isAvailable: true,
        rating: 4.7,
        totalOrders: 600,
      },

      // Delhi Darbar items
      {
        name: "Butter Chicken",
        description: "Creamy tomato-based curry with tender tandoori chicken.",
        price: 300,
        category: "non-veg",
        foodType: "main-course",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/butter-chicken.jpg",
        },
        kitchen: delhiDarbar._id,
        isAvailable: true,
        rating: 4.8,
        totalOrders: 450,
      },
      {
        name: "Dal Makhani",
        description: "Slow-cooked black lentils in creamy butter gravy.",
        price: 200,
        category: "veg",
        foodType: "main-course",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/dal-makhani.jpg",
        },
        kitchen: delhiDarbar._id,
        isAvailable: true,
        rating: 4.5,
        totalOrders: 320,
      },
      {
        name: "Paneer Tikka",
        description:
          "Marinated cottage cheese grilled in tandoor with bell peppers.",
        price: 220,
        category: "veg",
        foodType: "starter",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/paneer-tikka.jpg",
        },
        kitchen: delhiDarbar._id,
        isAvailable: true,
        rating: 4.4,
        totalOrders: 280,
      },
      {
        name: "Seekh Kebab",
        description: "Minced mutton kebabs grilled on skewers with spices.",
        price: 280,
        category: "non-veg",
        foodType: "starter",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/seekh-kebab.jpg",
        },
        kitchen: delhiDarbar._id,
        isAvailable: true,
        rating: 4.6,
        totalOrders: 190,
      },
      {
        name: "Mughlai Thali",
        description:
          "Complete North Indian thali with naan, curry, dal, rice and dessert.",
        price: 350,
        category: "non-veg",
        foodType: "thali",
        image: {
          public_id: "",
          url: "https://res.cloudinary.com/demo/image/upload/v1/menu/mughlai-thali.jpg",
        },
        kitchen: delhiDarbar._id,
        isAvailable: true,
        rating: 4.7,
        totalOrders: 150,
      },
    ]);

    console.log(`Seeded ${menuItems.length} menu items.`);

    // ========== ORDERS ==========
    const orders = await Order.insertMany([
      {
        user: amit._id,
        kitchen: biryaniHouse._id,
        items: [
          {
            menuItem: menuItems[0]._id,
            name: "Chicken Biryani",
            price: 250,
            quantity: 2,
          },
          {
            menuItem: menuItems[3]._id,
            name: "Chicken 65",
            price: 200,
            quantity: 1,
          },
        ],
        deliveryAddress: {
          street: "22, Jubilee Hills",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "500033",
          phone: "9876543210",
        },
        subtotal: 700,
        deliveryCharge: 30,
        totalAmount: 730,
        paymentMethod: "online",
        paymentStatus: "paid",
        orderStatus: "delivered",
        deliveredAt: new Date("2025-07-05T14:30:00Z"),
      },
      {
        user: neha._id,
        kitchen: southKitchen._id,
        items: [
          {
            menuItem: menuItems[5]._id,
            name: "Masala Dosa",
            price: 120,
            quantity: 2,
          },
          {
            menuItem: menuItems[9]._id,
            name: "Filter Coffee",
            price: 50,
            quantity: 2,
          },
        ],
        deliveryAddress: {
          street: "5, T Nagar",
          city: "Chennai",
          state: "Tamil Nadu",
          pincode: "600017",
          phone: "9123456789",
        },
        subtotal: 340,
        deliveryCharge: 20,
        totalAmount: 360,
        paymentMethod: "upi",
        paymentStatus: "paid",
        orderStatus: "delivered",
        deliveredAt: new Date("2025-07-06T10:00:00Z"),
      },
      {
        user: ravi._id,
        kitchen: delhiDarbar._id,
        items: [
          {
            menuItem: menuItems[10]._id,
            name: "Butter Chicken",
            price: 300,
            quantity: 1,
          },
          {
            menuItem: menuItems[11]._id,
            name: "Dal Makhani",
            price: 200,
            quantity: 1,
          },
          {
            menuItem: menuItems[12]._id,
            name: "Paneer Tikka",
            price: 220,
            quantity: 1,
          },
        ],
        deliveryAddress: {
          street: "34, Connaught Place",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
          phone: "9988776655",
        },
        subtotal: 720,
        deliveryCharge: 40,
        totalAmount: 760,
        paymentMethod: "online",
        paymentStatus: "paid",
        orderStatus: "preparing",
      },
      {
        user: amit._id,
        kitchen: delhiDarbar._id,
        items: [
          {
            menuItem: menuItems[14]._id,
            name: "Mughlai Thali",
            price: 350,
            quantity: 2,
          },
        ],
        deliveryAddress: {
          street: "22, Jubilee Hills",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "500033",
          phone: "9876543210",
        },
        subtotal: 700,
        deliveryCharge: 40,
        totalAmount: 740,
        paymentMethod: "cod",
        paymentStatus: "pending",
        orderStatus: "placed",
      },
      {
        user: neha._id,
        kitchen: biryaniHouse._id,
        items: [
          {
            menuItem: menuItems[1]._id,
            name: "Mutton Biryani",
            price: 350,
            quantity: 1,
          },
          {
            menuItem: menuItems[4]._id,
            name: "Gulab Jamun",
            price: 80,
            quantity: 2,
          },
        ],
        deliveryAddress: {
          street: "5, T Nagar",
          city: "Chennai",
          state: "Tamil Nadu",
          pincode: "600017",
          phone: "9123456789",
        },
        subtotal: 510,
        deliveryCharge: 30,
        totalAmount: 540,
        paymentMethod: "upi",
        paymentStatus: "paid",
        orderStatus: "out_for_delivery",
      },
      {
        user: ravi._id,
        kitchen: southKitchen._id,
        items: [
          {
            menuItem: menuItems[8]._id,
            name: "South Indian Thali",
            price: 200,
            quantity: 1,
          },
        ],
        deliveryAddress: {
          street: "34, Connaught Place",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
          phone: "9988776655",
        },
        subtotal: 200,
        deliveryCharge: 20,
        totalAmount: 220,
        paymentMethod: "online",
        paymentStatus: "failed",
        orderStatus: "cancelled",
        cancelReason: "Payment failed during processing",
      },
    ]);

    console.log(`Seeded ${orders.length} orders.`);

    console.log("\n✅ Seeding completed successfully!");
    console.log("-----------------------------------");
    console.log(`Users: ${users.length}`);
    console.log(`Kitchens: ${kitchens.length}`);
    console.log(`Menu Items: ${menuItems.length}`);
    console.log(`Orders: ${orders.length}`);
    console.log("-----------------------------------");
    console.log("\nLogin credentials for all users:");
    console.log("Password: Password@123");
    console.log("Admin:    admin@cloudkitchen.com");
    console.log("Chef 1:   rahul@kitchen.com");
    console.log("Chef 2:   priya@kitchen.com");
    console.log("Customer: amit@gmail.com");
    console.log("Customer: neha@gmail.com");
    console.log("Customer: ravi@gmail.com");

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
