const mongoose = require("mongoose");
require("dotenv").config();
const Book = require("./src/models/Book");

const books = [

  // ===== FANTASY =====
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", description: "A boy discovers he is a wizard and begins his journey at Hogwarts." },
  { title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", genre: "Fantasy", description: "A dark force threatens Hogwarts as secrets from the past emerge." },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", description: "Bilbo Baggins embarks on a quest to reclaim a stolen treasure guarded by a dragon." },
  { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", genre: "Fantasy", description: "A group sets out to destroy a powerful ring before it corrupts the world." },
  { title: "A Game of Thrones", author: "George R.R. Martin", genre: "Fantasy", description: "Noble families battle for control of the Iron Throne in a brutal political world." },
  { title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "Fantasy", description: "A gifted young man recounts his journey to becoming a legendary figure." },
  { title: "Mistborn", author: "Brandon Sanderson", genre: "Fantasy", description: "A group plans a rebellion using magical powers in a tyrannical empire." },
  { title: "The Way of Kings", author: "Brandon Sanderson", genre: "Fantasy", description: "Warriors and leaders struggle in a storm-ravaged world." },
  { title: "The Chronicles of Narnia", author: "C.S. Lewis", genre: "Fantasy", description: "Children discover a magical land filled with adventure and danger." },
  { title: "Eragon", author: "Christopher Paolini", genre: "Fantasy", description: "A farm boy bonds with a dragon and becomes part of a rebellion." },

  // ===== SCI-FI =====
  { title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", description: "A young noble navigates politics and survival on a desert planet." },
  { title: "Foundation", author: "Isaac Asimov", genre: "Sci-Fi", description: "A scientist predicts the fall of a galactic empire." },
  { title: "Ender's Game", author: "Orson Scott Card", genre: "Sci-Fi", description: "A child is trained to lead humanity in a war against aliens." },
  { title: "Neuromancer", author: "William Gibson", genre: "Sci-Fi", description: "A hacker is hired for a dangerous cyber mission." },
  { title: "Snow Crash", author: "Neal Stephenson", genre: "Sci-Fi", description: "A hacker fights a digital virus in a futuristic world." },
  { title: "The Martian", author: "Andy Weir", genre: "Sci-Fi", description: "An astronaut struggles to survive alone on Mars." },
  { title: "Ready Player One", author: "Ernest Cline", genre: "Sci-Fi", description: "A virtual reality treasure hunt determines the future." },
  { title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", description: "A lone astronaut must save Earth from extinction." },
  { title: "The Maze Runner", author: "James Dashner", genre: "Sci-Fi", description: "Teens trapped in a maze must find a way out." },
  { title: "Scythe", author: "Neal Shusterman", genre: "Sci-Fi", description: "In a world without death, chosen individuals control population." },

  // ===== THRILLER =====
  { title: "Gone Girl", author: "Gillian Flynn", genre: "Thriller", description: "A man becomes the prime suspect in his wife's disappearance." },
  { title: "The Silent Patient", author: "Alex Michaelides", genre: "Thriller", description: "A woman refuses to speak after committing a shocking crime." },
  { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", genre: "Thriller", description: "A journalist investigates a decades-old disappearance." },
  { title: "Behind Closed Doors", author: "B.A. Paris", genre: "Thriller", description: "A seemingly perfect marriage hides terrifying secrets." },
  { title: "The Woman in the Window", author: "A.J. Finn", genre: "Thriller", description: "A recluse believes she has witnessed a crime." },
  { title: "Verity", author: "Colleen Hoover", genre: "Thriller", description: "A writer uncovers disturbing truths while finishing another author's book." },

  // ===== MYSTERY =====
  { title: "The Da Vinci Code", author: "Dan Brown", genre: "Mystery", description: "A symbologist uncovers secrets hidden in religious history." },
  { title: "Angels & Demons", author: "Dan Brown", genre: "Mystery", description: "A scientist races to stop a deadly conspiracy." },
  { title: "Murder on the Orient Express", author: "Agatha Christie", genre: "Mystery", description: "A detective solves a murder aboard a train." },
  { title: "And Then There Were None", author: "Agatha Christie", genre: "Mystery", description: "Guests are killed one by one on a remote island." },

  // ===== HORROR =====
  { title: "It", author: "Stephen King", genre: "Horror", description: "A terrifying entity haunts a small town." },
  { title: "The Shining", author: "Stephen King", genre: "Horror", description: "A man descends into madness in a haunted hotel." },
  { title: "Dracula", author: "Bram Stoker", genre: "Horror", description: "The story of the infamous vampire Count Dracula." },
  { title: "Frankenstein", author: "Mary Shelley", genre: "Horror", description: "A scientist creates life with tragic consequences." },

  // ===== ROMANCE =====
  { title: "Pride and Prejudice", author: "Jane Austen", genre: "RomCom", description: "Love and misunderstandings unfold in English society." },
  { title: "The Notebook", author: "Nicholas Sparks", genre: "Romance", description: "A lifelong love story between two individuals." },
  { title: "Me Before You", author: "Jojo Moyes", genre: "Romance", description: "A woman forms an unexpected bond with a disabled man." },
  { title: "It Ends With Us", author: "Colleen Hoover", genre: "Romance", description: "A woman navigates love and difficult choices." },

  // ===== YOUNG ADULT =====
  { title: "The Hunger Games", author: "Suzanne Collins", genre: "Young Adult", description: "A girl fights to survive in a deadly televised competition." },
  { title: "Divergent", author: "Veronica Roth", genre: "Young Adult", description: "A girl challenges a rigidly divided society." },
  { title: "Percy Jackson & The Lightning Thief", author: "Rick Riordan", genre: "Young Adult", description: "A boy discovers he is a demigod." },

  // ===== NON-FICTION =====
  { title: "Atomic Habits", author: "James Clear", genre: "Non-Fiction", description: "A guide to building good habits and breaking bad ones." },
  { title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-Fiction", description: "A brief history of humankind." },
  { title: "Educated", author: "Tara Westover", genre: "Non-Fiction", description: "A memoir about growing up and self-education." },

  // ===== CLASSICS =====
  { title: "1984", author: "George Orwell", genre: "Classic", description: "A dystopian world under constant surveillance." },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", description: "A story of wealth, love, and illusion." },
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", description: "A story of justice in the American South." },

  // ===== EXTRA =====
  { title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", description: "A woman explores alternate lives she could have lived." },
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", description: "A shepherd travels in search of treasure and purpose." }
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Book.deleteMany();
  await Book.insertMany(books);
  console.log("Books Inserted ✅");
  process.exit();
};

seed();