export const MOCK_WORDS = {
  'basic-phrases': [
    { id: '1', english: 'Hello', spanish: 'Hola', difficulty: 1, topicId: 'basic-phrases' },
    { id: '2', english: 'Goodbye', spanish: 'Adiós', difficulty: 1, topicId: 'basic-phrases' },
    { id: '3', english: 'Please', spanish: 'Por favor', difficulty: 1, topicId: 'basic-phrases' },
    { id: '4', english: 'Thank you', spanish: 'Gracias', difficulty: 1, topicId: 'basic-phrases' },
    { id: '5', english: 'You\'re welcome', spanish: 'De nada', difficulty: 1, topicId: 'basic-phrases' },
  ],
  'common-verbs': [
    { id: '6', english: 'To be', spanish: 'Ser', difficulty: 2, topicId: 'common-verbs' },
    { id: '7', english: 'To have', spanish: 'Tener', difficulty: 2, topicId: 'common-verbs' },
    { id: '8', english: 'To go', spanish: 'Ir', difficulty: 2, topicId: 'common-verbs' },
    { id: '9', english: 'To want', spanish: 'Querer', difficulty: 2, topicId: 'common-verbs' },
    { id: '10', english: 'To do/make', spanish: 'Hacer', difficulty: 2, topicId: 'common-verbs' },
  ],
  'food-and-drinks': [
    { id: '11', english: 'Water', spanish: 'Agua', difficulty: 1, topicId: 'food-and-drinks' },
    { id: '12', english: 'Bread', spanish: 'Pan', difficulty: 1, topicId: 'food-and-drinks' },
    { id: '13', english: 'Coffee', spanish: 'Café', difficulty: 1, topicId: 'food-and-drinks' },
    { id: '14', english: 'Milk', spanish: 'Leche', difficulty: 1, topicId: 'food-and-drinks' },
    { id: '15', english: 'Apple', spanish: 'Manzana', difficulty: 1, topicId: 'food-and-drinks' },
  ],
  'numbers': [
    { id: '16', english: 'One', spanish: 'Uno', difficulty: 1, topicId: 'numbers' },
    { id: '17', english: 'Two', spanish: 'Dos', difficulty: 1, topicId: 'numbers' },
    { id: '18', english: 'Three', spanish: 'Tres', difficulty: 1, topicId: 'numbers' },
    { id: '19', english: 'Four', spanish: 'Cuatro', difficulty: 1, topicId: 'numbers' },
    { id: '20', english: 'Five', spanish: 'Cinco', difficulty: 1, topicId: 'numbers' },
  ],
  'colors': [
    { id: '21', english: 'Red', spanish: 'Rojo', difficulty: 1, topicId: 'colors' },
    { id: '22', english: 'Blue', spanish: 'Azul', difficulty: 1, topicId: 'colors' },
    { id: '23', english: 'Green', spanish: 'Verde', difficulty: 1, topicId: 'colors' },
    { id: '24', english: 'Yellow', spanish: 'Amarillo', difficulty: 1, topicId: 'colors' },
    { id: '25', english: 'Black', spanish: 'Negro', difficulty: 1, topicId: 'colors' },
  ],
};

export const MOCK_TOPICS = [
  {
    id: 'basic-phrases',
    name: 'Basic Phrases',
    description: 'Essential Spanish phrases for beginners',
    difficulty: 1,
  },
  {
    id: 'common-verbs',
    name: 'Common Verbs',
    description: 'Most frequently used Spanish verbs',
    difficulty: 2,
  },
  {
    id: 'food-and-drinks',
    name: 'Food & Drinks',
    description: 'Common food and drink vocabulary',
    difficulty: 1,
  },
  {
    id: 'numbers',
    name: 'Numbers',
    description: 'Basic numbers in Spanish',
    difficulty: 1,
  },
  {
    id: 'colors',
    name: 'Colors',
    description: 'Basic colors in Spanish',
    difficulty: 1,
  },
];