import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Vacation {
  holidayDestination: string;
  holidayDescription: string;
  holidayStartDate: string;
  holidayEndDate: string;
  price: number;
  holidayImage: string;
}

function VacationForm(): JSX.Element {
  const [vacation, setVacation] = useState<Vacation>({
    holidayDestination: "",
    holidayDescription: "",
    holidayStartDate: new Date().toISOString().split("T")[0],
    holidayEndDate: new Date().toISOString().split("T")[0],
    price: 0,
    holidayImage: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "price") {
      // Prevent entering negative price or higher than 10,000
      const newValue = Math.max(0, Math.min(10000, parseFloat(value)));
      setVacation((prevVacation) => ({
        ...prevVacation,
        [name]: newValue,
      }));
    } else if (name === "holidayStartDate" || name === "holidayEndDate") {
      // Prevent choosing earlier dates or any dates
      const currentDate = new Date().toISOString().split("T")[0];
      if (value < currentDate) {
        return; // Ignore the change
      }
      setVacation((prevVacation) => ({
        ...prevVacation,
        [name]: value,
      }));
    } else {
      setVacation((prevVacation) => ({
        ...prevVacation,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/holidays/add", vacation)
      .then((response) => {
        console.log(response);
        navigate("/MainLayout");
        // Reset the form fields
        setVacation({
          holidayDestination: "",
          holidayDescription: "",
          holidayStartDate: new Date().toISOString().split("T")[0],
          holidayEndDate: new Date().toISOString().split("T")[0],
          price: 0,
          holidayImage: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  };

  return (
    <div>
      <h1>Vacation Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="holidayDestination">Holiday Destination:</label>
          <input
            type="text"
            id="holidayDestination"
            name="holidayDestination"
            value={vacation.holidayDestination}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="holidayDescription">Holiday Description:</label>
          <textarea
            id="holidayDescription"
            name="holidayDescription"
            value={vacation.holidayDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="holidayStartDate">Start Date:</label>
          <input
            type="date"
            id="holidayStartDate"
            name="holidayStartDate"
            value={vacation.holidayStartDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="holidayEndDate">End Date:</label>
          <input
            type="date"
            id="holidayEndDate"
            name="holidayEndDate"
            value={vacation.holidayEndDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={vacation.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="holidayImage">Holiday Image:</label>
          <input
            type="text"
            id="holidayImage"
            name="holidayImage"
            value={vacation.holidayImage}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default VacationForm;
