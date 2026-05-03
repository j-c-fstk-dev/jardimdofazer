
import Database from 'better-sqlite3';

import path from 'path';

import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dbPath = path.join(__dirname, '../jardim.db');

let db = null;

export const getDatabase = () => {

  if (!db) {

    db = new Database(dbPath);

    db.pragma('journal_mode = WAL');

    console.log('✅ Conectado ao SQLite');

  }

  return db;

};

export const initializeDatabase = async () => {

  const database = getDatabase();

  database.exec(`

    CREATE TABLE IF NOT EXISTS products (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      name TEXT NOT NULL,

      description TEXT,

      price REAL NOT NULL,

      type TEXT NOT NULL CHECK(type IN ('fisico_encomenda', 'fisico_pronta', 'digital')),

      stock INTEGER,

      production_time INTEGER,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    );

    CREATE TABLE IF NOT EXISTS product_images (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      product_id INTEGER NOT NULL,

      image_url TEXT NOT NULL,

      order_index INTEGER DEFAULT 0,

      FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE

    );

    CREATE TABLE IF NOT EXISTS orders (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      customer_name TEXT NOT NULL,

      email TEXT NOT NULL,

      phone TEXT,

      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'paid', 'shipped', 'delivered')),

      total_price REAL NOT NULL,

      payment_method TEXT,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    );

    CREATE TABLE IF NOT EXISTS order_items (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      order_id INTEGER NOT NULL,

      product_id INTEGER NOT NULL,

      quantity INTEGER NOT NULL,

      price REAL NOT NULL,

      FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,

      FOREIGN KEY(product_id) REFERENCES products(id)

    );

    CREATE TABLE IF NOT EXISTS digital_products (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      product_id INTEGER NOT NULL UNIQUE,

      file_url TEXT NOT NULL,

      access_type TEXT DEFAULT 'download' CHECK(access_type IN ('download', 'course')),

      FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE

    );

    CREATE TABLE IF NOT EXISTS user_access (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      email TEXT NOT NULL,

      product_id INTEGER NOT NULL,

      access_link TEXT NOT NULL,

      password TEXT,

      expires_at DATETIME,

      FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE

    );

    CREATE TABLE IF NOT EXISTS posts (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      title TEXT NOT NULL,

      slug TEXT UNIQUE NOT NULL,

      content TEXT NOT NULL,

      cover_image TEXT,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    );

    CREATE TABLE IF NOT EXISTS users (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      email TEXT NOT NULL UNIQUE,

      password TEXT NOT NULL,

      name TEXT,

      role TEXT DEFAULT 'user',

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    );

  `);

  console.log('✅ Banco de dados inicializado');

  return database;

};

export default getDatabase();

