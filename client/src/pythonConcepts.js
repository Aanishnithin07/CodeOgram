export const pythonDefault = 'name = input("What is your name? ")\nprint(f"Hello, {name}!")';

export const pythonConcepts = [
  {
    id: 1,
    title: 'Comments',
    explanation: 'Comments are used to explain Python code. They are not executed. Comments start with a #.',
    codeSnippet: `# This is a comment\nprint("Hello, World!") # This is also a comment`
  },
  {
    id: 2,
    title: 'Variables',
    explanation: 'Variables are containers for storing data values. In Python, a variable is created the moment you first assign a value to it.',
    codeSnippet: `x = 5             # x is an integer\ny = "Hello"       # y is a string\nprint(x)\nprint(y)`
  },
  {
    id: 3,
    title: 'Data Types',
    explanation: 'Variables can store data of different types. Common types include String, Integer, Float, and Boolean.',
    codeSnippet: `a = "Text"      # str\nb = 20          # int\nc = 20.5        # float\nd = True        # bool\nprint(type(a))`
  },
  {
    id: 4,
    title: 'Type Casting',
    explanation: 'You can convert a variable from one data type to another. This is known as casting.',
    codeSnippet: `x = 5           # int\ny = float(x)    # convert int to float\n\nz = "10"        # string\na = int(z)      # convert string to int\nprint(y)\nprint(a*2)`
  },
  {
    id: 5,
    title: 'String Formatting (f-Strings)',
    explanation: 'f-Strings are a modern and easy way to embed expressions inside string literals for formatting.',
    codeSnippet: `age = 36\ntxt = f"My name is John, and I am {age}"\nprint(txt)`
  },
  {
    id: 6,
    title: 'Operators',
    explanation: 'Operators are used to perform operations on variables and values. Includes arithmetic (+, -, *), assignment (=), and comparison (==, !=, >) operators.',
    codeSnippet: `a = 10\nb = 5\nprint(a + b) # Addition\nprint(a > b) # Comparison (True)`
  },
  {
    id: 7,
    title: 'Lists',
    explanation: 'A list is a collection which is ordered, changeable, and allows duplicate members. Written with square brackets.',
    codeSnippet: `fruits = ["apple", "banana"]\nfruits.append("orange")\nprint(fruits[1]) # banana\nprint(len(fruits)) # 3`
  },
  {
    id: 8,
    title: 'Tuples',
    explanation: 'A tuple is a collection which is ordered and unchangeable. Written with round brackets.',
    codeSnippet: `thistuple = ("apple", "banana", "cherry")\nprint(thistuple[0]) # apple`
  },
  {
    id: 9,
    title: 'Sets',
    explanation: 'A set is a collection which is both unordered and unindexed. It does not allow duplicate members. Written with curly brackets.',
    codeSnippet: `thisset = {"apple", "banana", "cherry"}\nthisset.add("orange")\nprint("banana" in thisset) # True`
  },
  {
    id: 10,
    title: 'Dictionaries',
    explanation: 'A dictionary is a collection which is ordered, changeable and does not allow duplicates. It stores data in key:value pairs.',
    codeSnippet: `car = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nprint(car["model"]) # Prints "Mustang"`
  },
  {
    id: 11,
    title: 'If...Else Statements',
    explanation: 'Conditional statements using indentation to define scope.',
    codeSnippet: `a = 200\nb = 33\nif b > a:\n  print("b is greater than a")\nelif a == b:\n  print("a and b are equal")\nelse:\n  print("a is greater than b")`
  },
  {
    id: 12,
    title: 'While Loops',
    explanation: 'The while loop executes a set of statements as long as a condition is true.',
    codeSnippet: `i = 1\nwhile i < 6:\n  print(i)\n  i += 1`
  },
  {
    id: 13,
    title: 'For Loops',
    explanation: 'A for loop is used for iterating over a sequence (like a list, tuple, or string).',
    codeSnippet: `fruits = ["apple", "banana", "cherry"]\nfor x in fruits:\n  if x == "banana":\n    continue\n  print(x)`
  },
  {
    id: 14,
    title: 'Functions',
    explanation: 'A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function.',
    codeSnippet: `def greet(name):\n  return f"Hello, {name}!"\n\nmessage = greet("Aanish")\nprint(message)`
  },
  {
    id: 15,
    title: 'Classes & Objects',
    explanation: 'Python is an object-oriented language. A Class is like an object constructor, or a "blueprint" for creating objects.',
    codeSnippet: `class Person:\n  def __init__(self, name, age):\n    self.name = name\n    self.age = age\n\np1 = Person("John", 36)\nprint(p1.name)`
  },
  {
    id: 16,
    title: 'Exception Handling (Try...Except)',
    explanation: 'The `try` block lets you test a block of code for errors. The `except` block lets you handle the error.',
    codeSnippet: `try:\n  print(x) # x is not defined\nexcept NameError:\n  print("Variable x is not defined")\nexcept:\n  print("Something else went wrong")`
  },
  {
    id: 17,
    title: 'Modules & Imports',
    explanation: 'A module is like a code library. A file containing a set of functions you want to include in your application. Use the `import` statement.',
    codeSnippet: `import math\n\nx = math.sqrt(64)\nprint(x) # prints 8.0`
  }
];