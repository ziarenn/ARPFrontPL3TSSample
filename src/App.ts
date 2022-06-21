// PREZENTACJA W JAKI SPOSOB TYPUJEMY

// let age: number = 29;
// console.log(age);

// W JAKI SPOSOB TYPUJEMY FUNKCJE
// const add = (number1: number, number2: number) => {
//   return number1 + number2;
// };

// W JAKI SPOSOB TYPUJEMY ELEMENTY HTML
// const button: HTMLButtonElement = document.querySelector("button");
// const input1: HTMLInputElement = document.querySelector("#input1");
// const input2: HTMLInputElement = document.querySelector("#input2");

// button.addEventListener("click", (e) => {
//   console.log(add(+input1.value, +input2.value));
// });

// UNION TYPES
// let test: string | number | boolean;
// test = "test"
// test = 21
// test = true

// const buttonElement: HTMLButtonElement = document.querySelector("button");

// const calculatePrice = (originalPrice: number, hasDiscount: boolean) => {
//   return hasDiscount ? originalPrice * 0.8 : originalPrice;
// };

// buttonElement.addEventListener("click", () => {
//   const originalPrice: number = 50;
//   const hasDiscount: boolean =
//     new URLSearchParams(window.location.search).get("discount") === "true";
//   console.log(`You have to pay ${calculatePrice(originalPrice, hasDiscount)}`);
// });

import { Task, Category } from "./types/types";

// ZAD 1, WYBIERZ ELEMENT KLASY TASKS, STWORZ ARRAY KATEGORII (TYPE ALIAS),
const taskContainerElement: HTMLElement = document.querySelector(".tasks");
const categories: Category[] = ["general", "work", "gym", "hobby"];

const task: object = {
  name: "Wyrzucić śmieci",
  done: false,
};
const tasks: Task[] = [
  {
    title: "Wyrzucić śmieci",
    done: false,
    category: "hobby",
  },
  {
    title: "Pójść na siłke",
    done: true,
    category: "gym",
  },
  {
    title: "Nakarmić psa",
    done: false,
    category: "work",
  },
];

const render = (tasks: object[]) => {
  tasks.forEach((el: Task, i: number) => {
    // creating the li and populating it
    const li: HTMLElement = document.createElement("li");
    if (el.category) {
      li.classList.add(el.category);
    }
    li.innerText = `${el.title} (${el.category})`;

    // creating the checkbox
    const checkBox: HTMLInputElement = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = el.done;
    li.appendChild(checkBox);
    // creating the remove button
    const removeButton: HTMLButtonElement = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("type", "button");
    li.appendChild(removeButton);

    removeButton.addEventListener("click", function (e: Event) {
      const taskText: string = this.parentElement.textContent.split("(")[0];
      const trimmedTaskText: string = taskText.slice(0, taskText.length - 1);
      const arrElement: Task = tasks.find(
        (el: Task) => trimmedTaskText === el.title
      ) as Task;
      console.log(arrElement);
      const indexOfElementToRemove: number = tasks.indexOf(arrElement);
      tasks.splice(indexOfElementToRemove, 1);
      console.log(tasks);
      this.parentElement.remove();
    });

    taskContainerElement.appendChild(li);
    li.addEventListener("click", () => {
      el.done === false ? (el.done = true) : (el.done = false);
    });
  });
};

const renderCategories = () => {
  const categoryContainer: HTMLUListElement =
    document.querySelector(".categories");
  categories.forEach((category: Category) => {
    const categoryEl: HTMLLIElement = document.createElement("li");
    const inputEl: HTMLInputElement = document.createElement("input");
    inputEl.setAttribute("type", "radio");
    inputEl.setAttribute("name", "category");
    inputEl.setAttribute("value", `${category}`);
    inputEl.setAttribute("id", `category-${category}`);
    categoryEl.appendChild(inputEl);
    const labelEl: HTMLLabelElement = document.createElement("label");
    labelEl.setAttribute("for", `category-${category}`);
    labelEl.textContent = category;
    categoryEl.appendChild(labelEl);
    categoryContainer.appendChild(categoryEl);
  });
};
renderCategories();
const addTask = (task: Task) => {
  tasks.push(task);
  render([task]);
};

const button: HTMLButtonElement = document.querySelector("button");
const input: HTMLInputElement = document.querySelector("#name");
button.addEventListener("click", (e: Event) => {
  e.preventDefault();
  const selectedRadioElement: HTMLInputElement = document.querySelector(
    "input[type='radio']:checked"
  );
  const selectedCategory: Category = selectedRadioElement.value as Category;
  addTask({ title: input.value, done: false, category: selectedCategory });
});

render(tasks);
