export const listItems = [
  { name: "Home", path: "" },
  { name: "Track today's workout", path: "today_workout" },
  // { name: "Track Today's Meals", path: "today_meals" },
  { name: "Track Today's Important Notes", path: "imp_notes" },
  { name: "Track Today's Steps", path: "today_steps" },
  { name: "Track Today's Sleep", path: "today_sleep" },
  { name: "Today's Summary", path: "today_summary" },
];

export const convertEpochToFormattedDate = (epochValue, type) => {
  const date = new Date(epochValue);

  // Extract the individual components of the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Add 1 since month is zero-based
  const day = date.getDate();

  // Format the date as "dd-mm-yyyy" or "mm-dd-yyyy" based on the 'type' parameter
  let formattedDate;
  if (type === "Indian") {
    formattedDate = `${day}-${month}-${year}`;
  } else {
    formattedDate = `${month}-${day}-${year}`;
  }
  return formattedDate;
};

export const convertStringDateToLocale = (dateString) => {
  // Create a Date object from the date string
  let dateObj = new Date(dateString);

  // Specify the desired date options
  let options = { month: "2-digit", day: "2-digit", year: "numeric" };

  // Convert the date to the desired format
  let formattedDate = dateObj.toLocaleDateString("en-US", options);
  formattedDate = formattedDate.replace("/", "-").replace("/", "-");
  return formattedDate;
};

export const hoursArray = [
  1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
  10.5, 11, 11.5, 12,  13, 14,  15,  16,  17, 18,
];
