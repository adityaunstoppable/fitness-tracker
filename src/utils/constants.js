export const listItems = [
  { name: "Home", path: "" },
  { name: "Track today's workout", path: "today_workout" },
  { name: "Track Today's Meals", path: "today_meals" },
  { name: "Track Today's Important Notes", path: "imp_notes" },
  { name: "Track Today's Steps", path: "today_steps" },
  { name: "Track Today's Sleep", path: "today_sleep" },
  { name: "Today's Summary", path: "today_summary" },
];

export const convertEpochToFormattedDate = (epochValue , type) => {
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

  console.log("Formatted Date:", formattedDate);
  return formattedDate;

};

export const convertStringDateToLocale = (dateString) => {
  // Create a Date object from the date string
  let dateObj = new Date(dateString);

  // Specify the desired date options
  let options = { month: "2-digit", day: "2-digit", year: "numeric" };

  // Convert the date to the desired format
  let formattedDate = dateObj.toLocaleDateString("en-US", options);
  formattedDate = formattedDate.replace("/" ,"-").replace("/" ,"-")
  return formattedDate
};

const dummyOneDayData = {
  "06-19-2023": {
    exercise: {
      1: {
        "Chest Press": {
          set1: { w: 50, r: 10 },
          set2: { w: 40, r: 10 },
          set3: { w: 40, r: 8 },
        },
      },
      2: {
        "Shoulder Overhead Dumbell Press": {
          set1: { w: 20, r: 8 },
          set2: { w: 20, r: 9 },
          set2: { w: 15, r: 10 },
        },
      },
      3: {
        "Tricep Extension": {
          set1: { w: 20, r: 15 },
          set1: { w: 20, r: 15 },
          set1: { w: 20, r: 15 },
        },
      },
      4: {
        "Short Grip Chest Press ": {
          set1: { w: 30, r: 12 },
          set1: { w: 30, r: 12 },
          set1: { w: 30, r: 12 },
        },
      },
    },
    meals: {},
    sleep: { hours: 8 },
    steps: { count: 15000 },
    importantNotes: { text: "My body weight was 75kgs today" },
  },
};
